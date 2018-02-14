(function () {

    var TextTypeEnum = Object.freeze({
        BOLD: "Bold",
        EMPHASIZE: "Emphasize",
        QUOTE: "Quote"
    });

    function editorNameChanged(value) {
        editorNameLabel.innerText = value;
    }

    function reviewTextChanged(value) {
        reviewText.classList.add('review-text__changed');
        reviewText.innerHTML = value;

        if (feedbackText.value != "") toggleAddReviewButton(true);
        else toggleAddReviewButton(false);
    }

    function transformText(transformType) {
        var selectionStart = feedbackText.selectionStart;
        var selectionEnd = feedbackText.selectionEnd;
        var selectedText = feedbackText.value.substring(selectionStart, selectionEnd);
        var transformedText = "";

        switch (transformType) {
            case TextTypeEnum.BOLD:
                transformedText = "<b>" + selectedText + "</b>";
                break;
            case TextTypeEnum.EMPHASIZE:
                transformedText = "<i>" + selectedText + "</i>";
                break;
            case TextTypeEnum.QUOTE:
                transformedText = "<q>" + selectedText + "</q>";
                break;
            default:
                break;
        }

        var editedText = feedbackText.value.replace(selectedText, transformedText);
        feedbackText.value = editedText;

        reviewTextChanged(editedText);
    }

    function toggleAddReviewButton(hidden) {
        if (!hidden) reviewDataSubmit.classList.add('disabled');
        else reviewDataSubmit.classList.remove('disabled');
    }

    function selectRating(event) {
        var previousRating = 0;
        var maxRating = 5;
        var currentRating = event.target.value;

        disabledStart.style.display = 'block';

        for (var i = 0; i <= maxRating - currentRating; i++) {
            reviewRating.children[i].classList.add("orange");
            previousRating = maxRating - currentRating + 1;
        }

        for (var i = maxRating - currentRating + 1; i <= maxRating - 1; i++) {
            reviewRating.children[i].classList.remove("orange");
        }
    }

    function uploadAvatar() {
        var file = uploadAvatarButton.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            reviewAvatar.src = reader.result;
            reviewAvatarSample.style.backgroundImage = "url(" + reader.result + ")";
            avatarStatusLabel.innerText = 'Image selected';
        }
        reader.readAsDataURL(file);
    }

    function toggleAddReviewForm(element) {
        if (element.style.display == '') {
            reviewForm.style.display = 'block';
            mainTagElement.style.height = 'auto';
            shareThoughtsContainer.innerText = "Share your thoughts with other customers:";
        }
    }

    function reviewCanceled(componentID) {
        componentID.style.display = 'none';
        mainTagElement.style.height = '';
        shareThoughtsContainer.innerHTML = "<p class=\"product-card__review--purpose\" id=\"share-thoughts__container\">Would you like to <span class=\"product-card__add-review\" id=\"review-form__show\"> share your thoughts with other customers</span> ?</p>";
        shareThoughtsContainer.addEventListener('click', function () {
            toggleAddReviewForm(this);
        });
    }

    uploadAvatarButton.addEventListener('change', function () {
        uploadAvatar();
    }, false);

    reviewDataRatingElement.addEventListener('click', function (event) {
        selectRating(event);
    }, false);

    feedbackText.addEventListener('keyup', function () {
        reviewTextChanged(this.value);
    }, false);

    transformToBoldButton.addEventListener('click', function () {
        transformText(TextTypeEnum.BOLD);
    }, false);

    transformToEmphasizeButton.addEventListener('click', function () {
        transformText(TextTypeEnum.EMPHASIZE);
    }, false);

    transformToQuoteButton.addEventListener('click', function () {
        transformText(TextTypeEnum.QUOTE);
    }, false);

    reviewerNameInput.addEventListener('keyup', function () {
        editorNameChanged(this.value);
    }, false);

    reviewFormToggleButton.addEventListener('click', function () {
        toggleAddReviewForm(this);
    })

    cancelAddReview.addEventListener('click', function () {
        reviewCanceled(reviewForm);
    })

}());