// Slider
$(document).ready(function() {
    $('.slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 750,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [{
            breakpoint: 980,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });
});
// Elements of navigation
const anchors = document.querySelectorAll('nav a[href*="#"]');
let menuButton = document.querySelector("#menu-button");
let backClick = document.querySelector(".click");
let drawer = document.querySelector("#drawer");

let boll = false;

// Elements of work page
let categories = document.querySelectorAll(".work-categories button");
let works = document.querySelectorAll(".work");



backClick.addEventListener("click", function() {
    drawer.className = "";
    backClick.style.display = "none";

});

menuButton.addEventListener("click", function() {
    boll = !boll;

    if (boll) {

        drawer.className = "active";
        backClick.style.display = "block";
    } else {
        drawer.className = "";

    }
});

categories.forEach(category => {
    category.addEventListener("click", function() {
        categories.forEach(e => (e.className = ""));
        this.className = "active";

        works.forEach(work => {
            if (work.className !== "work hidden") {
                work.className = "work hidden";
            }
            if (work.getAttribute("data-category") === category.value) {
                work.className = "work";
            } else if (category.value === "all") {
                work.className = "work";
            }
        });
    });
});


for (let anchor of anchors) {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        drawer.className = "";
        backClick.style.display = "none";


        const blockID = anchor.getAttribute("href");

        if (anchor.getAttribute("href") === "#") {
            document.querySelector("body").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {
            document.querySelector("" + blockID).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        for (let link of anchors) {
            if (link.getAttribute("href") === blockID) {
                link.className = "active";
            } else {
                link.className = "";
            }
        }
    });
}

//videoplayer
function videoPlay() {
    document.getElementById("video").innerHTML = "<div id='player'></div>";
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '420',
        width: '100%',
        videoId: 'ZJA_2CTNjfA',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

//FORM VALIDATION
const validateForm = () => {
    const inName = document.getElementById("name");
    const name = inName.value;
    const nameRegExp = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/;

    const inEmail = document.getElementById("email");
    const email = inEmail.value;
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const inMessage = document.getElementById("message");
    const message = inMessage.value;


    if (nameRegExp.test(name) == false) {
        inName.focus();
        alert("Please, fill the name field correctly.");
        inName.style = "outline: 2px solid red;";
        return;
    } else if (emailRegExp.test(email) == false) {
        inEmail.focus();
        inName.style = "outline: 2px solid green;";
        alert("Please, fill the e-mail field correctly.");
        inEmail.style = "outline: 2px solid red;";
        return;
    } else if (message == "") {
        inMessage.focus();
        inEmail.style = "outline: 2px solid green;";
        inName.style = "outline: 2px solid green;";
        alert("Please, fill the message field correctly.");
        inMessage.style = "outline: 2px solid red;";
        return;
    } else {
        alert("Message sent. Thank you for contacting us.");
        inEmail.style = "outline: 2px solid var(--detail-color);";
        inName.style = "outline: 2px solid  var(--detail-color);";
        inMessage.style = "outline: 2px solid  var(--detail-color);";
        inEmail.value = "";
        inName.value = "";
        inMessage.value = "";
    }
};

const btSubmit = document.getElementById("submit");
btSubmit.addEventListener("click", validateForm);