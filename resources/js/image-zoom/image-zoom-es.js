class ImageZoom {
    constructor(objectToZoomId, resultOfZoomId) {
        this.objectToZoomID = objectToZoomId;
        this.resultOfZoomID = resultOfZoomId;
        this.dataURL = null;
        this.lensWindow = null;
        this.coordinateX = null;
        this.coordinateY = null;
        this.createdZoomLens = false;
        this.zoomLensSelector = 'img-zoom-lens';
        this.imageZoomContainerId = 'img-zoom__container';
    }

    initializeZoomContainer() {
        this.objectToZoom = document.getElementById(this.objectToZoomID);
        this.resultOfZoom = document.getElementById(this.resultOfZoomID);
    }

    create() {
        const _this = this;
        if (!this.createdZoomLens) {
            this.initializeZoomContainer();
            createLensWindow();
            createOutputWindow();
            createLensHandlers();
        }

        showZoomLens();
        showOutputWindow();
        createImageSliderHandlers();

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

        function createLensWindow() {
            _this.lensWindow = document.createElement("div");
            _this.lensWindow.setAttribute("class", _this.zoomLensSelector);
            _this.objectToZoom.parentElement.insertBefore(_this.lensWindow, _this.objectToZoom);
            _this.createdZoomLens = true;
        }

        function createOutputWindow() {
            _this.coordinateX = _this.resultOfZoom.offsetWidth / _this.lensWindow.offsetWidth;
            _this.coordinateY = _this.resultOfZoom.offsetHeight / _this.lensWindow.offsetHeight;
            _this.resultOfZoom.style.backgroundImage = "url('" + _this.dataURL + "')";
            _this.resultOfZoom.style.backgroundSize = (_this.objectToZoom.width * _this.coordinateX) + "px " + (_this.objectToZoom.height * _this.coordinateY) + "px";
        }

        function showOutputWindow() {
            const canvas = _this.objectToZoom;
            _this.dataURL = canvas.toDataURL('image/png');
            _this.resultOfZoom.style.backgroundImage = "url('" + _this.dataURL + "')";
            _this.resultOfZoom.style.display = DISPLAY_BLOCK;
        }

        function showZoomLens() {
            _this.zoomLens = document.querySelector(`.${_this.zoomLensSelector}`);
            _this.zoomLens.style.display = DISPLAY_BLOCK;
        }

        function hideZoomElements() {
            if (_this.resultOfZoom.style.display === DISPLAY_BLOCK) {
                _this.zoomLens.style.display = DISPLAY_NONE;
                _this.resultOfZoom.style.display = DISPLAY_NONE;
            }
        }

        function createImageSliderHandlers() {
            const imageZoomContainer = document.getElementById(_this.imageZoomContainerId);
            const nextImageButton = document.getElementById(NEXT_IMAGE_BUTTON);
            const previousImageButton = document.getElementById(PREVIOUS_IMAGE_BUTTON);
            imageZoomContainer.addEventListener('mouseleave', function () {
                hideZoomElements();
            }, false);
            nextImageButton.addEventListener('mouseover', function () {
                hideZoomElements();
            }, false);
            previousImageButton.addEventListener('mouseover', function () {
                hideZoomElements();
            }, false);
        }
    }
}

let myZoom = new ImageZoom('slider-canvas', 'zoom-result__window');

setTimeout(function () {
    document.getElementById('slider-canvas').addEventListener('mouseenter', function () {
        myZoom.create();
    }, false);
}, 50)


