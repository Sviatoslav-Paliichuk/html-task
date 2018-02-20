class CustomSlider {
    constructor(containerId, imageCollection, customWaterMarkConfig, width = 550, height = 350) {
        this.imageCollection = null;
        this.currentImageIndex = 0;
        this.imageCollection = imageCollection;
        this.customWaterMarkConfig = customWaterMarkConfig;
        this.width = width;
        this.height = height;
        this.renderTemplate(containerId);
    }

    renderTemplate(containerId) {
        const _this = this;

        this.loadTemplate(function (response) {
            const sliderContainer = document.getElementById(containerId);
            sliderContainer.innerHTML = response;
            _this.renderImage(_this.width, _this.height, _this.customWaterMarkConfig);
            _this.createHandlers(_this);
        }, _this);
    }

    createHandlers(_this) {
        const nextImageButton = document.getElementById(NEXT_IMAGE_BUTTON);
        const previousImageButton = document.getElementById(PREVIOUS_IMAGE_BUTTON);

        nextImageButton.addEventListener('click', function () {
            _this.nextImage();
        }, false);

        previousImageButton.addEventListener('click', function () {
            _this.previousImage();
        }, false);
    }

    loadTemplate(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../resources/js/image-slider/image-slider-template.html");
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200)
                callback(xhr.responseText);
        }
        xhr.send(null);
    }

    nextImage() {
        this.currentImageIndex++;
        this.currentImageIndex === this.imageCollection.length ? this.currentImageIndex = 0 : this.currentImageIndex;
        this.renderImage(this.width, this.height, this.customWaterMarkConfig);
    }

    previousImage() {
        this.currentImageIndex <= 0 ? this.currentImageIndex = this.imageCollection.length : this.currentImageIndex;
        this.currentImageIndex--;
        this.renderImage(this.width, this.height, this.customWaterMarkConfig);
    }

    renderImage(width = 550, height = 350, customWaterMarkConfig) {
        let imageObj = new Image();
        imageObj.onload = function () {
            let canvas = document.getElementById(SLIDER_ID);
            canvas.context = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            canvas.context.drawImage(imageObj, 0, 0);
            if (customWaterMarkConfig != undefined) {
                canvas.context.font = customWaterMarkConfig.font;
                canvas.context.fillStyle = customWaterMarkConfig.fillStyle;
                canvas.context.fillText(customWaterMarkConfig.Text, customWaterMarkConfig.labelPositionX, customWaterMarkConfig.labelPositionY);
            }
        };
        imageObj.src = this.imageCollection[this.currentImageIndex]["path"];
        this.renderImageLabel(this.imageCollection[this.currentImageIndex]["description"])
    }

    renderImageLabel(labelText) {
        const currentLabel = document.getElementById(CURRENT_IMAGE_LABEL);
        currentLabel.innerText = labelText;
    }
}

let mySlider = new CustomSlider('slider-container', [
    {
        path: "../resources/images/product-items/1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    },
    {
        path: "../resources/images/product-items/2.jpg",
        description: "Alias aperiam culpa error facilis maiores nisi. Lorem ipsum dolor sit amet."
    },
    {
        path: "../resources/images/product-items/3.jpg",
        description: "Optio reiciendis repellend us soluta voluptate. Alias aperiam culpa error."
    }
], {
    "font": "18px PT Sans",
    "fillStyle": "white",
    "Text": "MY DEMO SHOP",
    "labelPositionX": 20,
    "labelPositionY": 30
});