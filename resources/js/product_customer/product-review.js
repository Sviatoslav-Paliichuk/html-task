function editorNameChanged(value) {
    document.querySelector('.editor-name').innerText = value;
}

function reviewTextChanged(value) {
    var feedbackText = document.getElementById("review-data__review--text");
    var reviewText = document.querySelector('.product-card__review-text');
    reviewText.style.color = 'white';
    reviewText.style.opacity = '1';
    reviewText.style.fontStyle = 'inherit';
    reviewText.innerHTML = value;

    if (feedbackText.value != "") handleAddReviewButton('show');
    else handleAddReviewButton('hide');
}

function transformText(type) {
    var feedbackText = document.getElementById("review-data__review--text");
    var selectionStart = feedbackText.selectionStart;
    var selectionEnd = feedbackText.selectionEnd;
    var selectedText = feedbackText.value.substring(selectionStart, selectionEnd);
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

    var editedText = feedbackText.value.replace(selectedText, transformedText);
    feedbackText.value = editedText;
    reviewTextChanged(editedText);
}

function handleAddReviewButton(action) {
    switch (action) {
        case 'hide':
            document.getElementById('review-data__review--submit').classList.add('disabled');
            break;
        case 'show':
            document.getElementById('review-data__review--submit').classList.remove('disabled');
            break;
        default:
            break;
    }
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