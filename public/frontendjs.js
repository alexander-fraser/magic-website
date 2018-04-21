$(document).ready(function() {

    // Instagram "Show More/Less" button logic.
    $("#instagramMoreBtn").on("click", function() {

        if ($("#instagramMore").hasClass("show")) {
            $(this).text("Show More");
        } else {
            $(this).text("Show Less");
        }
        
    });

});    