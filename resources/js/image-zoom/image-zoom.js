class ImageZoom {
    constructor(objectToZoomSelector, resultOfZoomSelector) {
        this.objectToZoomSelector = objectToZoomSelector;
        this.resultOfZoomSelector = resultOfZoomSelector;
        this.dataURL = null;
        this.lensWindow = null;
        this.coordinateX = null;
        this.coordinateY = null;
        this.createdZoomLens = false;
        this.zoomLensSelector = 'img-zoom-lens';
        this.imageZoomContainer = '.img-zoom__container';
    }

    initializeZoomContainer() {
        this.objectToZoom = document.querySelector(this.objectToZoomSelector);
        this.resultOfZoom = document.querySelector(this.resultOfZoomSelector);
    }

    create() {
        const _this = this;
        if (!this.createdZoomLens) {
            this.initializeZoomContainer();
            this.createLensWindow();
            this.createOutputWindow();
            createLensHandlers();
        }

        _this.showZoomLens();
        _this.showOutputWindow();
        _this.createImageSliderHandlers();

        function getCursorPos(e) {
            let clientRect, x = 0, y = 0;
            e = e || window.event;

            clientRect = _this.objectToZoom.getBoundingClientRect();
            x = e.pageX - clientRect.left;
            y = e.pageY - clientRect.top;

            x = x - window.pageXOffset;
            y = y - window.pageYOffset;

            return {x: x, y: y};
        }

        function moveLens(e) {
            let cursorPosition, x, y;
            e.preventDefault();

            cursorPosition = getCursorPos(e);
            x = cursorPosition.x - (_this.lensWindow.offsetWidth / 2);
            y = cursorPosition.y - (_this.lensWindow.offsetHeight / 2);

            if (x > _this.objectToZoom.width - _this.lensWindow.offsetWidth) {
                x = _this.objectToZoom.width - _this.lensWindow.offsetWidth;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > _this.objectToZoom.height - _this.lensWindow.offsetHeight) {
                y = _this.objectToZoom.height - _this.lensWindow.offsetHeight;
            }
            if (y < 0) {
                y = 0;
            }

            _this.lensWindow.style.left = x + "px";
            _this.lensWindow.style.top = y + "px";
            _this.resultOfZoom.style.backgroundPosition = "-" + (x * _this.coordinateX) + "px -" + (y * _this.coordinateY) + "px";
        }

        function createLensHandlers() {
            _this.lensWindow.addEventListener("mousemove", moveLens);
            _this.objectToZoom.addEventListener("mousemove", moveLens);
            _this.lensWindow.addEventListener("touchmove", moveLens);
            _this.objectToZoom.addEventListener("touchmove", moveLens);
        }
    }

    createLensWindow() {
        this.lensWindow = document.createElement("div");
        this.lensWindow.setAttribute("class", this.zoomLensSelector);
        this.objectToZoom.parentElement.insertBefore(this.lensWindow, this.objectToZoom);
        this.createdZoomLens = true;
    }

    createOutputWindow() {
        this.coordinateX = this.resultOfZoom.offsetWidth / this.lensWindow.offsetWidth;
        this.coordinateY = this.resultOfZoom.offsetHeight / this.lensWindow.offsetHeight;
        this.resultOfZoom.style.backgroundImage = "url('" + this.dataURL + "')";
        this.resultOfZoom.style.backgroundSize = (this.objectToZoom.width * this.coordinateX) + "px " + (this.objectToZoom.height * this.coordinateY) + "px";
    }

    showOutputWindow() {
        const canvas = this.objectToZoom;
        this.dataURL = canvas.toDataURL('image/png');
        this.resultOfZoom.style.backgroundImage = "url('" + this.dataURL + "')";
        this.resultOfZoom.style.display = DISPLAY_BLOCK;
    }

    showZoomLens() {
        this.zoomLens = document.querySelector(`.${this.zoomLensSelector}`);
        this.zoomLens.style.display = DISPLAY_BLOCK;
    }

    createImageSliderHandlers() {
        const imageZoomContainer = document.querySelector(this.imageZoomContainer);
        const nextImageButton = document.querySelector(NEXT_IMAGE_BUTTON);
        const previousImageButton = document.querySelector(PREVIOUS_IMAGE_BUTTON);
        imageZoomContainer.addEventListener('mouseleave', function () {
            this.hideZoomElements();
        }.bind(this), false);
        nextImageButton.addEventListener('mouseover', function () {
            this.hideZoomElements();
        }.bind(this), false);
        previousImageButton.addEventListener('mouseover', function () {
            this.hideZoomElements();
        }.bind(this), false);
    }

    hideZoomElements() {
        if (this.resultOfZoom.style.display === DISPLAY_BLOCK) {
            this.zoomLens.style.display = DISPLAY_NONE;
            this.resultOfZoom.style.display = DISPLAY_NONE;
        }
    }
}


