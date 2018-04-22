$(document).ready(function() {


    // Navbar's logic to collapse mobile menu once clicked.
    $('.nav-link').on('click', function () {
        $('#nav-collapse-btn').click();
    });


    // Instagram Feed's "Show More/Less" button logic.
    $("#instagram-show-btn").on("click", function() {
        if ($("#instagram-collapse").hasClass("show")) {
            $(this).text("Show More");
        } else {
            $(this).text("Show Less");
        }
    });


});    