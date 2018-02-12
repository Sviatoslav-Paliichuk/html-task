var createdZoomLens = false;
var objectToZoom, lensWindow, resultOfZoom, coordinateX, coordinateY;
var dataURL = "";

const zoomResultWindow = document.querySelector("#zoom-result__window");

function imageZoom(objectToZoomID, resultOfZoomID) {

    const canvas = document.getElementById(objectToZoomID);
    dataURL = canvas.toDataURL();

    if (!createdZoomLens) {
        objectToZoom = document.getElementById(objectToZoomID);
        resultOfZoom = document.getElementById(resultOfZoomID);

        /*create lensWindow:*/
        lensWindow = document.createElement("DIV");
        lensWindow.setAttribute("class", "img-zoom-lens");

        /*insert lensWindow:*/
        objectToZoom.parentElement.insertBefore(lensWindow, objectToZoom);

        coordinateX = resultOfZoom.offsetWidth / lensWindow.offsetWidth;
        coordinateY = resultOfZoom.offsetHeight / lensWindow.offsetHeight;

        /*set background properties for the result DIV:*/
        resultOfZoom.style.backgroundImage = "url('" + dataURL + "')";
        resultOfZoom.style.backgroundSize = (objectToZoom.width * coordinateX) + "px " + (objectToZoom.height * coordinateY) + "px";

        /*execute a function when someone moves the cursor over the image, or the lensWindow:*/
        lensWindow.addEventListener("mousemove", moveLens);
        objectToZoom.addEventListener("mousemove", moveLens);

        /*and also for touch screens:*/
        lensWindow.addEventListener("touchmove", moveLens);
        objectToZoom.addEventListener("touchmove", moveLens);

        createdZoomLens = true;
    }

    resultOfZoom.style.backgroundImage = "url('" + dataURL + "')";
    zoomResultWindow.style.display = 'block';


    var zoomLens = document.querySelector(".img-zoom-lens");
    zoomLens.style.display = 'block';

    function moveLens(e) {
        var cursorPosition, x, y;
        e.preventDefault();

        /*get the cursor's x and y cursorPosition:*/
        cursorPosition = getCursorPos(e);

        /*calculate the position of the lensWindow:*/
        x = cursorPosition.x - (lensWindow.offsetWidth / 2);
        y = cursorPosition.y - (lensWindow.offsetHeight / 2);

        /*prevent the lensWindow from being positioned outside the image:*/
        if (x > objectToZoom.width - lensWindow.offsetWidth) {
            x = objectToZoom.width - lensWindow.offsetWidth;
        }
        if (x < 0) {
            x = 0;
        }
        if (y > objectToZoom.height - lensWindow.offsetHeight) {
            y = objectToZoom.height - lensWindow.offsetHeight;
        }
        if (y < 0) {
            y = 0;
        }

        /*set the position of the lensWindow:*/
        lensWindow.style.left = x + "px";
        lensWindow.style.top = y + "px";

        /*display what the lensWindow "sees":*/
        resultOfZoom.style.backgroundPosition = "-" + (x * coordinateX) + "px -" + (y * coordinateY) + "px";
    }

    function getCursorPos(e) {
        var clientRect, x = 0, y = 0;
        e = e || window.event;

        /*get the x and y positions of the image:*/
        clientRect = objectToZoom.getBoundingClientRect();

        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - clientRect.left;
        y = e.pageY - clientRect.top;

        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x: x, y: y};
    }
}

function hideZoomElements() {
    var zoomLens = document.querySelector(".img-zoom-lens");

    if (zoomResultWindow.style.display == 'block') {
        zoomLens.style.display = 'none';
        zoomResultWindow.style.display = 'none';
    }
}

const canvasSlider = document.getElementById('slider-canvas');
const nextImageButton = document.getElementById('nextImageButton');
const previousImageButton = document.getElementById('previousImageButton');
const zoomContainer = document.getElementById('img-zoom__container');

canvasSlider.addEventListener('mouseenter', function () {
    imageZoom('slider-canvas', 'zoom-result__window')
}, false);

nextImageButton.addEventListener('mouseover', function () {
    hideZoomElements();
}, false);

previousImageButton.addEventListener('mouseover', function () {
    hideZoomElements();
}, false);

zoomContainer.addEventListener('mouseleave', function () {
    hideZoomElements();
}, false);