class CustomSlider {
    constructor(sliderConfig) {
        this.imageCollection = null;
        this.currentImageIndex = 0;
        this.imageCollection = sliderConfig.images;
        this.watermarkConfig = sliderConfig.watermarkConfig;
        this.width = sliderConfig.width;
        this.height = sliderConfig.height;
        this.isWatermarkVisible = sliderConfig.isWatermarkVisible;
        this.imageObj = new Image();
        this.renderTemplate(sliderConfig.containerSelector);
    }

    renderTemplate(containerSelector) {
        this.loadTemplate(function (response) {
            this.renderMarkup(containerSelector, response);
            this.renderImage();
            this.initializeConstantNodes();
            this.createHandlers();
        }.bind(this));
    }

    renderMarkup(containerId, response) {
        const sliderContainer = document.getElementById(containerId);
        sliderContainer.innerHTML = response;
    }

    initializeConstantNodes() {
        this.nextImageButton = document.querySelector(NEXT_IMAGE_BUTTON);
        this.previousImageButton = document.querySelector(PREVIOUS_IMAGE_BUTTON);
        this.currentImage = document.querySelector(CURRENT_IMAGE);
        this.imageLabel = document.querySelector(CURRENT_IMAGE_LABEL);
        this.currentLabel = document.querySelector(CURRENT_IMAGE_LABEL);
    }

    createHandlers() {
        this.nextImageButton.addEventListener('click', function () {
            this.nextImage();
            this.resetAnimation();
            this.renderCanvasLabel();
        }.bind(this), false);

        this.previousImageButton.addEventListener('click', function () {
            this.previousImage();
            this.resetAnimation();
            this.renderCanvasLabel();
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
        this.currentImageIndex = this.currentImageIndex !== this.imageCollection.length
            ? this.currentImageIndex
            : this.currentImageIndex = 0;
        this.renderImage();
    }

    previousImage() {
        this.currentImageIndex = this.currentImageIndex > 0
            ? this.currentImageIndex
            : this.currentImageIndex = this.imageCollection.length;
        this.currentImageIndex--;
        this.renderImage();
    }

    renderImage() {
        let currentImageObj = this.imageCollection[this.currentImageIndex];
        this.imageObj.onload = function () {
            this.renderCanvas();
        }.bind(this);
        this.imageObj.src = currentImageObj.path;
    }

    renderCanvas() {
        let canvas = document.querySelector(SLIDER_SELECTOR);
        canvas.context = canvas.getContext("2d");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.context.drawImage(this.imageObj, 0, 0);
        if (this.watermarkConfig && this.isWatermarkVisible) {
            canvas.context.font = this.watermarkConfig.font;
            canvas.context.fillStyle = this.watermarkConfig.fillStyle;
            canvas.context.fillText(this.watermarkConfig.Text, this.watermarkConfig.labelPositionX, this.watermarkConfig.labelPositionY);
        }
    }

    renderCanvasLabel() {
        let currentImageObj = this.imageCollection[this.currentImageIndex];
        this.currentLabel.innerText = currentImageObj.description;
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