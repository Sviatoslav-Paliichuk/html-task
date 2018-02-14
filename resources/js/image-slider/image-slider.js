(function () {
    const resetLabel = document.getElementById('product-card__image-label');
    const resetImage = document.getElementById('product-card__image-container');

    var currentImageIndex = 0;
    var imageCollection = null;
    var defaultWaterMarkConfig, dataURL = null;
    var DirectionTypeEnum = Object.freeze({
        NEXT: "next",
        PREVIOUS: "previous"
    });

    this.CustomSlider = function (canvasTemplateID, imageObj, canvasWidth, canvasHeight, customWaterMarkConfig) {
        this.canvas = document.getElementById(canvasTemplateID);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.defaultWaterMarkConfig = customWaterMarkConfig;
    }

    CustomSlider.prototype.changeImage = function (direction, context, currentImageLabel, imgCollection) {
        setImageCollection(imgCollection);
        setSliderDirection(direction);
        addWaterMark(context, imageCollection, this.defaultWaterMarkConfig);
        getCanvasImgURL();
        renderImageLabel(currentImageLabel);
        resetAnimation();
    }

    CustomSlider.prototype.loadJSON = function (callback, path) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == 200)
                callback(xobj.responseText);
        };
        xobj.send(null);
    }

    this.addWaterMark = function (context, imageCollection, customWaterMarkConfig) {
        var imageObj = new Image();
        imageObj.onload = function () {
            context.drawImage(imageObj, 0, 0);
            if (customWaterMarkConfig != undefined) {
                context.font = customWaterMarkConfig.font;
                context.fillStyle = customWaterMarkConfig.fillStyle;
                context.fillText(customWaterMarkConfig.Text, customWaterMarkConfig.labelPositionX, customWaterMarkConfig.labelPositionY);
            }
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
                currentImageIndex === imageCollection.length ? currentImageIndex = 0 : currentImageIndex;
                break;
            case DirectionTypeEnum.PREVIOUS:
                currentImageIndex <= 0 ? currentImageIndex = imageCollection.length : currentImageIndex;
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
        resetLabel.offsetHeight;
        resetLabel.style.animation = null;
        resetImage.style.animation = 'none';
        resetImage.offsetHeight;
        resetImage.style.animation = null;
    }
}());

window.onload = function () {
    var defaultWaterMarkConfig = {
        "font": "18px PT Sans",
        "fillStyle": "white",
        "Text": "DEMO SHOP",
        "labelPositionX": 50,
        "labelPositionY": 40
    }
    var imageCollectionJSON = null;

    const slider = new CustomSlider("slider-canvas", new Image(), 555, 350, defaultWaterMarkConfig);

    slider.loadJSON(function (response) {
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