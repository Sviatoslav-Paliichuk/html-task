const resetLabel = document.getElementById('product-card__image-label');
const resetImage = document.getElementById('product-card__image-container');

function loadJSON(callback, path) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200)
            callback(xobj.responseText);
    };
    xobj.send(null);
}

(function () {
    var currentImageIndex = 0;
    var imageCollection = null;
    var defaultWaterMarkConfig = {
        "font": "18px PT Sans",
        "fillStyle": "white",
        "Text": "DEMO SHOP",
        "labelPositionX": 50,
        "labelPositionY": 40
    }

    var DirectionTypeEnum = Object.freeze({
        NEXT: "next",
        PREVIOUS: "previous"
    });

    this.CustomSlider = function (canvasTemplateID, imageObj, canvasWidth, canvasHeight) {
        this.canvas = document.getElementById(canvasTemplateID);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
    }

    CustomSlider.prototype.changeImage = function (direction, context, currentImageLabel, imgCollection) {
        setImageCollection(imgCollection);
        setSliderDirection(direction);
        this.addWaterMark(context, imageCollection, defaultWaterMarkConfig);
        getCanvasImgURL();
        renderImageLabel(currentImageLabel);
        resetAnimation();
    }

    CustomSlider.prototype.addWaterMark = function (context, imageCollection, defaultWaterMarkConfig) {
        var imageObj = new Image();
        imageObj.onload = function () {
            context.drawImage(imageObj, 0, 0);
            context.font = defaultWaterMarkConfig.font;
            context.fillStyle = defaultWaterMarkConfig.fillStyle;
            context.fillText(defaultWaterMarkConfig.Text, defaultWaterMarkConfig.labelPositionX, defaultWaterMarkConfig.labelPositionY);
        };
        imageObj.src = imageCollection[currentImageIndex]["path"];
    }

    this.setImageCollection = function (imgCollection) {
        if (imgCollection == undefined || null)
            throw new Error('Collection not passed');
        else imageCollection = imgCollection;
    }

    this.setSliderDirection = function (direction) {
        switch (direction) {
            case DirectionTypeEnum.NEXT:
                currentImageIndex++;
                if (currentImageIndex === imageCollection.length) currentImageIndex = 0;
                break;
            case DirectionTypeEnum.PREVIOUS:
                if (currentImageIndex <= 0) currentImageIndex = imageCollection.length;
                currentImageIndex--;
                break;
            default:
                break;
        }
    }

    this.getCanvasImgURL = function () {
        var canvas = document.getElementById('slider-canvas');
        dataURL = canvas.toDataURL();
    }

    this.renderImageLabel = function (currentImageLabel) {
        currentImageLabel.innerText = imageCollection[currentImageIndex]["description"];
    }

    this.resetAnimation = function () {
        resetLabel.style.animation = 'none';
        resetLabel.offsetHeight;//work code
        resetLabel.style.animation = null;
        resetImage.style.animation = 'none';
        resetImage.offsetHeight;//work code
        resetImage.style.animation = null;
    }
}());

window.onload = function () {
    const context = document.getElementById("slider-canvas").getContext("2d");
    const nextImageButton = document.getElementById('nextImageButton');
    const previousImageButton = document.getElementById('previousImageButton');
    const currentImageLabel = document.getElementById('product-card__image-label');

    const slider = new CustomSlider("slider-canvas", new Image(), 555, 350);
    var imageCollectionJSON = null;

    loadJSON(function (response) {
        imageCollectionJSON = JSON.parse(response);
        slider.changeImage('default', context, currentImageLabel, imageCollectionJSON);
    }, '../resources/js/image-slider/imageCollection.json');

    nextImageButton.addEventListener('click', function () {
        slider.changeImage('next', context, currentImageLabel, imageCollectionJSON);
    }, false);

    previousImageButton.addEventListener('click', function () {
        slider.changeImage('previous', context, currentImageLabel, imageCollectionJSON);
    }, false);
}