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
    // e.target is the clicked element!
    // If it was a list item

    console.log(event.target);
    if(event.target.nodeName == "span") {
        // List item found!  Output the ID!
        console.log("List item ", event.target.id.replace("post-", ""), " was clicked!");
        event.target.style.color = 'red';
        event.target.style.backgroundColor = 'red';
    }
}