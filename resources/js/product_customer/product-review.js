function editorNameChanged(value) {
    document.querySelector('.editor-name').innerText = value;
}

function reviewTextChanged(value) {
    var reviewText = document.querySelector('.product-card__review-text');
    reviewText.style.color = 'white';
    reviewText.style.opacity = '1';
    reviewText.style.fontStyle = 'inherit';
    reviewText.innerHTML = value;
}

function transformText(type) {
    var reviewText = document.getElementById("review-data__review--text");
    var selectionStart = reviewText.selectionStart;
    var selectionEnd = reviewText.selectionEnd;
    var selectedText = reviewText.value.substring(selectionStart, selectionEnd);
    var transformedText = "";

    switch (type) {
        case 'Bold':
            transformedText = "<b>" + selectedText + "</b>";
            break;
        case 'Emphasize':
            transformedText = "<i>" + selectedText + "</i>";
            break;
        case 'Quote':
            transformedText = "<q>" + selectedText + "</q>";
            break;
    }

    var editedText = reviewText.value.replace(selectedText, transformedText);
    reviewText.value = editedText;
    reviewTextChanged(editedText);
}

function selectRating(event) {
    for (var i = 0; i <= 5 - event.target.value; i++) {
        document.querySelector(".review-rating-disabled").children[i].classList.add("orange");
    }
}

function uploadAvatar() {
    var file = document.getElementById("upload-avatar__file").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('image-avatar').src = reader.result;
        document.getElementById('upload-logo__sample').style.backgroundImage = "url(" + reader.result + ")";
    }

    reader.readAsDataURL(file);
}