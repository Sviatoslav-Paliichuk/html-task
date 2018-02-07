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
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");

    c.height = 550;
    c.width = 850;


    ctx.drawImage(img, 0, 0);
    ctx.font = "18px Calibri";
    ctx.fillStyle = "white";
    ctx.fillText("DEMO SHOP", 40, 40);

    var dataURL = c.toDataURL();
    document.getElementById("product-card__image-slider").src = dataURL;
}


function nextImage() {
    currentImageIndex++;

    var currentImage = document.getElementById("product-card__image-slider");
    var currentImageLabel = document.getElementById("product-card__image-label");

    if (currentImageIndex === collections.length) {
        currentImageIndex = 0;
    }

    currentImage.setAttribute("src", collections[currentImageIndex]["path"]);
    currentImageLabel.innerText = collections[currentImageIndex]["description"];
    reset_animation();

}

function prevImage() {
    var currentImage = document.getElementById("product-card__image-slider");
    var currentImageLabel = document.getElementById("product-card__image-label");

    if (currentImageIndex <= 0) {
        currentImageIndex = collections.length;
    }
    currentImageIndex--;
    currentImage.setAttribute("src", collections[currentImageIndex]["path"]);
    currentImageLabel.innerText = collections[currentImageIndex]["description"];
    reset_animation();
}

function reset_animation() {
    var el = document.getElementById('product-card__image-label');
    var el2 = document.getElementById('product-card__image-slider');

    el.style.animation = 'none';
    el.offsetHeight;
    /* trigger reflow */
    el.style.animation = null;

    el2.style.animation = 'none';
    el2.offsetHeight;
    /* trigger reflow */
    el2.style.animation = null;

}