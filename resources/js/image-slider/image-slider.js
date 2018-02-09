var currentImageIndex = 0;
var currentImageLabel, canvas, context, imageObj = null;

var collections = [
    {
        id: 1,
        path: "../resources/images/product-items/1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    },
    {
        id: 2,
        path: "../resources/images/product-items/2.jpg",
        description: "Alias aperiam culpa error facilis maiores nisi. Lorem ipsum dolor sit amet."
    },
    {
        id: 3,
        path: "../resources/images/product-items/3.jpg",
        description: "Optio reiciendis repellend us soluta voluptate. Alias aperiam culpa error."
    }
];

function initImageSlider() {
    currentImageLabel = document.getElementById("product-card__image-label");
    canvas = document.getElementById("slider-canvas");
    context = canvas.getContext("2d");
    imageObj = new Image();

    canvas.width = 500;
    canvas.height = 500;
}

function changeImage(action) {
    switch (action) {
        case 'next':
            currentImageIndex++;
            if (currentImageIndex === collections.length) currentImageIndex = 0;
            break;
        case 'previous':
            if (currentImageIndex <= 0) currentImageIndex = collections.length;
            currentImageIndex--;
            break;
        default:
            break;
    }

    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0);
        context.font = "18px Calibri";
        context.fillStyle = "white";
        context.fillText("DEMO SHOP", 360, 40);
    };

    imageObj.src = collections[currentImageIndex]["path"];
    currentImageLabel.innerText = collections[currentImageIndex]["description"];

    reset_animation();
}

function reset_animation() {
    var resetLabel = document.getElementById('product-card__image-label');
    resetLabel.style.animation = 'none';
    resetLabel.offsetHeight;
    resetLabel.style.animation = null;
}

window.onload = function () {
    initImageSlider();
    changeImage('default');
}