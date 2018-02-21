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
        this.loadTemplate(function (response) {
            const sliderContainer = document.getElementById(containerId);
            sliderContainer.innerHTML = response;
            this.renderSlider(this.width, this.height, this.customWaterMarkConfig);
            this.initializeConstantNodes();
            this.createHandlers(this);
        }.bind(this));
    }

    initializeConstantNodes() {
        this.nextImageButton = document.getElementById(NEXT_IMAGE_BUTTON);
        this.previousImageButton = document.getElementById(PREVIOUS_IMAGE_BUTTON);
        this.currentImage = document.getElementById(CURRENT_IMAGE);
        this.imageLabel = document.getElementById(CURRENT_IMAGE_LABEL);
        this.currentLabel = document.getElementById(CURRENT_IMAGE_LABEL);
    }

    createHandlers(slider) {
        this.nextImageButton.addEventListener('click', function () {
            slider.nextImage();
            slider.resetAnimation();
            slider.renderCanvasLabel(this.imageCollection[this.currentImageIndex]["description"]);
        }.bind(this), false);

        this.previousImageButton.addEventListener('click', function () {
            slider.previousImage();
            slider.resetAnimation();
            slider.renderCanvasLabel(this.imageCollection[this.currentImageIndex]["description"]);
        }.bind(this), false);
    }

    loadTemplate(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "../resources/js/image-slider/image-slider-template.html");
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200)
                callback(xhr.responseText);
        }
        xhr.send(null);
    }

    nextImage() {
        this.currentImageIndex++;
        this.currentImageIndex === this.imageCollection.length ? this.currentImageIndex = 0 : this.currentImageIndex;
        this.renderSlider(this.width, this.height, this.customWaterMarkConfig);
    }

    previousImage() {
        this.currentImageIndex <= 0 ? this.currentImageIndex = this.imageCollection.length : this.currentImageIndex;
        this.currentImageIndex--;
        this.renderSlider(this.width, this.height, this.customWaterMarkConfig);
    }

    renderSlider(width = 550, height = 350, customWaterMarkConfig) {
        let imageObj = new Image();
        imageObj.onload = function () {
            this.renderCanvas(imageObj);
        }.bind(this);
        imageObj.src = this.imageCollection[this.currentImageIndex]["path"];
    }

    renderCanvas(imageObj) {
        let canvas = document.getElementById(SLIDER_ID);
        canvas.context = canvas.getContext("2d");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.context.drawImage(imageObj, 0, 0);
        if (this.customWaterMarkConfig !== undefined) {
            canvas.context.font = this.customWaterMarkConfig.font;
            canvas.context.fillStyle = this.customWaterMarkConfig.fillStyle;
            canvas.context.fillText(this.customWaterMarkConfig.Text, this.customWaterMarkConfig.labelPositionX, this.customWaterMarkConfig.labelPositionY);
        }
    }

    renderCanvasLabel(labelText) {
        this.currentLabel.innerText = labelText;
    }

    resetAnimation() {
        this.imageLabel.style.animation = 'none';
        this.imageLabel.offsetHeight; // force repaint reflow for render animation
        this.imageLabel.style.animation = null;
        this.currentImage.style.animation = 'none';
        this.currentImage.offsetHeight;
        this.currentImage.style.animation = null;
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
}, 555, 350);