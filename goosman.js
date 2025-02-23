
document.addEventListener("DOMContentLoaded", function () {
    let babyChangoosLink = document.querySelector(".center-image");
    let babyChangoosImg = babyChangoosLink.querySelector("img");

    if (babyChangoosImg) {
        babyChangoosLink.addEventListener("mouseenter", function () {
            babyChangoosImg.src = "images/babychangoos_hover.png";  
        });

        babyChangoosLink.addEventListener("mouseleave", function () {
            babyChangoosImg.src = "images/babychangoos.png";  
        });
    }
});
