const resetLabel = document.getElementById('product-card__image-label');
const resetImage = document.getElementById('product-card__image-container');

var currentImageIndex = 0;
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

window.onload = function () {
    const context = document.getElementById("slider-canvas").getContext("2d");
    const slider = new CustomSlider("slider-canvas", new Image(), 555, 350);
    const nextImageButton = document.getElementById('nextImageButton');
    const previousImageButton = document.getElementById('previousImageButton');
    const currentImageLabel = document.getElementById('product-card__image-label');

    CustomSlider.changeImage('default', context, currentImageLabel);

    nextImageButton.addEventListener('click', function () {
        CustomSlider.changeImage('next', context, currentImageLabel);
        CustomSlider.resetAnimation();
    }, false);

    previousImageButton.addEventListener('click', function () {
        CustomSlider.changeImage('previous', context, currentImageLabel);
        CustomSlider.resetAnimation();
    }, false);
}

function CustomSlider(canvasTemplateID, imageObj, canvasWidth, canvasHeight) {
    this.canvas = document.getElementById(canvasTemplateID);
    this.context = this.canvas.getContext("2d");
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    CustomSlider.changeImage = function (action, context, currentImageLabel) {
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
        imageObj = new Image();
        imageObj.onload = function () {
            context.drawImage(imageObj, 0, 0);
            context.font = "18px PT Sans";
            context.fillStyle = "white";
            context.fillText("DEMO SHOP", 50, 40);
        };

        imageObj.src = collections[currentImageIndex]["path"];

        var canvas = document.getElementById('slider-canvas');
        dataURL = canvas.toDataURL();

        currentImageLabel.innerText = collections[currentImageIndex]["description"];
    }

    CustomSlider.resetAnimation = function () {
        resetLabel.style.animation = 'none';
        resetLabel.offsetHeight;//work code
        resetLabel.style.animation = null;

        resetImage.style.animation = 'none';
        resetImage.offsetHeight;//work code
        resetImage.style.animation = null;
    }
};