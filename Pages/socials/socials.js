document.addEventListener("DOMContentLoaded", function () {
    const bgContainer1 = document.createElement("div");
    const bgContainer2 = document.createElement("div");

    bgContainer1.id = "bg-container-1";
    bgContainer2.id = "bg-container-2";

    document.body.prepend(bgContainer2);
    document.body.prepend(bgContainer1);

    const socialIcons = document.querySelectorAll(".social-icons img");


    const backgrounds = {
        gram: "images/grambg.jpg",
        tiktok: "images/tiktokbg.jpg",
        discord: "images/discordbg.jpg",
        twitter: "images/xbg.jpg",
        mail: "images/mailbg.jpg",
    };
    

    let activeContainer = bgContainer1;

    socialIcons.forEach(icon => {
        icon.addEventListener("mouseenter", function () {
            const key = this.getAttribute("data-social");
            if (backgrounds[key]) {
                const newContainer = activeContainer === bgContainer1 ? bgContainer2 : bgContainer1;
                newContainer.style.backgroundImage = `url('${backgrounds[key]}')`;
                newContainer.style.opacity = "1";
                activeContainer.style.opacity = "0";
                activeContainer = newContainer;
            }
        });

        icon.addEventListener("mouseleave", function () {
            bgContainer1.style.opacity = "0";
            bgContainer2.style.opacity = "0";
        });
    });
});

