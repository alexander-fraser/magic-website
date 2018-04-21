/* This is the server program. */

// Initializes ExpressJS, which is the library that handles the routing and rendering the webpages.
var express = require("express"),
    app = express(),
    request = require("request")

// Set the port for the server to listen on.
const PORT = process.env.PORT || 5000

// Set the directories that will be used. "views" holds webpage templates and "public" holds images, styles, and client-side scripts.
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

// Set up the instagramFeed list as a global variable.
var instagramFeed = [];



// The root route. This specifies what happens when the webpage is visited.
app.get("/", function (req, res) {
    res.render("index.ejs", { instagramFeed: instagramFeed });
});



// Starts the server to start listening at the port specified.
app.listen(PORT, function () {
    console.log("The Aaron Roeck Magic server has started!");
    console.log("The server is listening on " + PORT);
});



// Pulls all the Instagram pages for Aaron Roeck Magic and collects them in a list.
request("https://www.instagram.com/explore/tags/aaronroeckmagic/?__a=1", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        
        // The "body" returned by the "request" library is a string. It must be converted to a JS object by parsing the JSON.
        var parsedBody = JSON.parse(body);
        var feedNumber = parsedBody.graphql.hashtag.edge_hashtag_to_media.edges.length;

        // Loop through all Instagram pages and collect the shortcodes and image URLs and put them in a list.
        for (var i = 0; i < feedNumber; i++) {
            // Check if the ARM account owns the post. This eliminates re-posts, which are included in the JS object returned by Instagram.
            if (parsedBody.graphql.hashtag.edge_hashtag_to_media.edges[i].node.owner.id === "4709603377") {

                var instagramElement = {
                    shortCode: parsedBody.graphql.hashtag.edge_hashtag_to_media.edges[i].node.shortcode,
                    imageURL: parsedBody.graphql.hashtag.edge_hashtag_to_media.edges[i].node.thumbnail_src
                }
                instagramFeed.push(instagramElement);

            }
        } 
    }
});
