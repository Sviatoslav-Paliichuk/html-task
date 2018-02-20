class ReviewForm {
    constructor(containerId) {
        this.renderFormTemplate(containerId);
    }

    renderFormTemplate(containerId) {
        const _this = this;
        this.loadTemplate(function (response) {
            const reviewFormContainer = document.getElementById(containerId);
            reviewFormContainer.innerHTML = response;
            _this.createHandlers(_this);
        }, _this);
    }

    loadTemplate(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../resources/js/product_customer/review-form-template.html");
        xhr.onload = function () {
            if (xhr.readyState == 4 && xhr.status == 200)
                callback(xhr.responseText);
        }
        xhr.send(null);
    }

    createHandlers(_this) {
        const reviewNameInput = document.getElementById(REVIEWER_NAME_INPUT);
        const uploadAvatar = document.getElementById(UPLOAD_AVATAR_BUTTON);
        const reviewRating = document.getElementById(REVIEW_RATING_COMPONENT);
        const feedBackTextArea = document.getElementById(FEEDBACK_TEXTAREA);
        const transformToBoldButton = document.getElementById(TRANSFORM_BOLD_BUTTON);
        const transformToEmphasizeButton = document.getElementById(TRANSFORM_EMPHASIZE_BUTTON);
        const transformToQuoteButton = document.getElementById(TRANSFORM_QUOTE_BUTTON);
        const reviewFormToggleButton = document.getElementById(REVIEW_FORM_TOGGLE_BUTTON);
        const cancelAddReview = document.getElementById(ADD_REVIEW_CANCEL);

        reviewNameInput.addEventListener('keyup', function () {
            _this.reviewerNameChanged(this.value);
        }, false);

        uploadAvatar.addEventListener('change', function () {
            _this.uploadAvatar();
        }, false);

        reviewRating.addEventListener('click', function (event) {
            _this.ratingChanged(event);
        }, false);

        feedBackTextArea.addEventListener('keyup', function () {
            _this.reviewTextChanged(this.value);
        }, false)

        transformToBoldButton.addEventListener('click', function () {
            _this.transformText('BOLD');
        }, false);

        transformToEmphasizeButton.addEventListener('click', function () {
            _this.transformText('EMPHASIZE');
        }, false);

        transformToQuoteButton.addEventListener('click', function () {
            _this.transformText('QUOTE');
        }, false);

        reviewFormToggleButton.addEventListener('click', function () {
            _this.toggleAddReviewForm(this);
        }, false);

        cancelAddReview.addEventListener('click', function () {
            _this.reviewCanceled(REVIEW_FORM);
        }, false);
    }

    reviewerNameChanged(value) {
        const editorLabel = document.querySelector(EDITOR_NAME_LABEL);
        editorLabel.innerText = value;
    }

    uploadAvatar() {
        const uploadAvatar = document.getElementById(UPLOAD_AVATAR_BUTTON);
        const file = uploadAvatar.files[0];
        let reader = new FileReader();
        reader.onloadend = function () {
            let reviewAvatarImage = document.getElementById(REVIEW_AVATAR)
            let reviewAvatarSampleImage = document.getElementById(REVIEW_AVATAR_SAMPLE);
            let avatarStatusLabel = document.getElementById(REVIEW_AVATAR_STATUS_LABEL);
            reviewAvatarImage.src = reader.result;
            reviewAvatarSampleImage.style.backgroundImage = "url(" + reader.result + ")";
            avatarStatusLabel.innerText = 'Image selected';
        };
        reader.readAsDataURL(file);
    }

    ratingChanged(event) {
        const maxRating = 5;
        let previousRating = 0;
        let currentRating = event.target.value;
        const disabledStars = document.getElementById(DISABLED_STARS);
        const reviewRating = document.querySelector(REVIEW_RATING);

        disabledStars.style.display = 'block';

        for (let i = 0; i <= maxRating - currentRating; i++) {
            reviewRating.children[i].classList.add("orange");
            previousRating = maxRating - currentRating + 1;
        }

        for (let i = maxRating - currentRating + 1; i <= maxRating - 1; i++) {
            reviewRating.children[i].classList.remove("orange");
        }
    }

    reviewTextChanged(value) {
        const reviewText = document.querySelector(REVIEW_TEXT);
        const feedbackText = document.getElementById(FEEDBACK_TEXTAREA);
        reviewText.classList.add('review-text__changed');
        reviewText.innerHTML = value;

        if (feedbackText.value != "") this.toggleAddReviewButton(true);
        else this.toggleAddReviewButton(false);
    }

    toggleAddReviewButton(hidden) {
        let reviewDataSubmit = document.getElementById(REVIEW_DATA_SUBMIT);
        if (!hidden) reviewDataSubmit.classList.add('disabled');
        else reviewDataSubmit.classList.remove('disabled');
    }

    transformText(transformType) {
        const feedBackTextArea = document.getElementById(FEEDBACK_TEXTAREA);
        let selectedText = this.getSelectedText();
        let transformedText = "";

        switch (transformType) {
            case 'BOLD':
                transformedText = this.transformToBold(selectedText);
                break;
            case 'EMPHASIZE':
                transformedText = this.transformToEmphasize(selectedText);
                break;
            case 'QUOTE':
                transformedText = this.transformToQuote(selectedText);
                break;
            default:
                throw new Error('Selected type not found');
        }

        let editedText = feedBackTextArea.value.replace(selectedText, transformedText);
        feedBackTextArea.value = editedText;
        this.reviewTextChanged(editedText);
    }

    getSelectedText() {
        const feedBackTextArea = document.getElementById(FEEDBACK_TEXTAREA);
        const selectionStart = feedBackTextArea.selectionStart;
        const selectionEnd = feedBackTextArea.selectionEnd;
        let selectedText = feedBackTextArea.value.substring(selectionStart, selectionEnd);
        return selectedText;
    }

    transformToBold(selectedText) {
        return "<b>" + selectedText + "</b>";
    }

    transformToEmphasize(selectedText) {
        return "<i>" + selectedText + "</i>";
    }

    transformToQuote(selectedText) {
        return "<q>" + selectedText + "</q>";
    }

    toggleAddReviewForm(element) {
        const mainTagElement = document.querySelector(MAIN);
        const reviewForm = document.getElementById(REVIEW_FORM);
        const shareThoughtsContainer = document.getElementById(SHARE_THOUGHTS_CONTAINER);
        if (element.style.display == '') {
            reviewForm.style.display = 'block';
            mainTagElement.style.height = 'auto';
            shareThoughtsContainer.innerText = "Share your thoughts with other customers:";
        }
    }

    reviewCanceled(componentId) {
        const shareThoughtsContainer = document.getElementById(SHARE_THOUGHTS_CONTAINER);
        const mainTagElement = document.querySelector(MAIN);
        document.getElementById(componentId).style.display = 'none';
        mainTagElement.style.height = '';
        shareThoughtsContainer.innerHTML = "<p class=\"product-card__review--purpose\" id=\"share-thoughts__container\">Would you like to <span class=\"product-card__add-review\" id=\"review-form__show\"> share your thoughts with other customers</span> ?</p>";
        shareThoughtsContainer.addEventListener('click', function () {
            this.toggleAddReviewForm(this);
        });
    }
}

let customReviewForm = new ReviewForm('review-form__template-container');
