var slideIndex = 0;
var slides = ["gayle.jpg", "chalk_art.jpg"];

function carousel() {
    $("#banner").attr("src", "media/images/" + slides[slideIndex]);
    slideIndex++;
    if (slideIndex >= slides.length) {slideIndex = 0}
    setTimeout(carousel, 3000);
}

// Form functions
function clearForm() {
    $("#name").val('');
    $("#email").val('');
    $("#phone").val('');
    $("#message").val('');
}

function validateEmail(field) {
    var input = $(field).val();
    if (input === "" || !input.includes("@")) {
        $("#error").text("Not a valid email address!");
        $("#error").removeClass("hide");
        $(field).focus();
        return false;
    }
    return true;
}

function validateForm() {
    $("#error").addClass("hide");
    return validateEmail("#email");
}

// Ready
$(document).ready(function(){
    // carousel();
});
