class ReviewForm {
    constructor(containerId) {
        this.renderFormTemplate(containerId);
    }

    renderFormTemplate(containerId) {
        const _this = this;
        this.loadTemplate(function (response) {
            const reviewFormContainer = document.getElementById(containerId);
            reviewFormContainer.innerHTML = response;
            _this.initializeFormNodes();
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

    initializeFormNodes() {
        this.reviewNameInput = document.getElementById(REVIEWER_NAME_INPUT);
        this.uploadAvatarButton = document.getElementById(UPLOAD_AVATAR_BUTTON);
        this.reviewRating = document.getElementById(REVIEW_RATING_COMPONENT);
        this.reviewRatingDisabled = document.querySelector(REVIEW_RATING);
        this.feedBackTextArea = document.getElementById(FEEDBACK_TEXTAREA);
        this.transformToBoldButton = document.getElementById(TRANSFORM_BOLD_BUTTON);
        this.transformToEmphasizeButton = document.getElementById(TRANSFORM_EMPHASIZE_BUTTON);
        this.transformToQuoteButton = document.getElementById(TRANSFORM_QUOTE_BUTTON);
        this.cancelAddReview = document.getElementById(ADD_REVIEW_CANCEL);
        this.reviewFormToggleButton = document.getElementById(REVIEW_FORM_TOGGLE_BUTTON);
        this.mainTagElement = document.querySelector(MAIN);
        this.shareThoughtsContainer = document.getElementById(SHARE_THOUGHTS_CONTAINER);
        this.reviewForm = document.getElementById(REVIEW_FORM);
        this.editorLabel = document.querySelector(EDITOR_NAME_LABEL);
        this.disabledStars = document.getElementById(DISABLED_STARS);
        this.reviewText = document.querySelector(REVIEW_TEXT);
        this.feedbackText = document.getElementById(FEEDBACK_TEXTAREA);
        this.reviewDataSubmit = document.getElementById(REVIEW_DATA_SUBMIT);
        this.reviewAvatarImage = document.getElementById(REVIEW_AVATAR)
        this.reviewAvatarSampleImage = document.getElementById(REVIEW_AVATAR_SAMPLE);
        this.avatarStatusLabel = document.getElementById(REVIEW_AVATAR_STATUS_LABEL);
    }

    createHandlers(_this) {
        _this.reviewNameInput.addEventListener('keyup', function () {
            _this.reviewerNameChanged(this.value);
        }, false);

        _this.uploadAvatarButton.addEventListener('change', function () {
            _this.uploadAvatar();
        }, false);

        _this.reviewRating.addEventListener('click', function (event) {
            _this.ratingChanged(event);
        }, false);

        _this.feedBackTextArea.addEventListener('keyup', function () {
            _this.reviewTextChanged(this.value);
        }, false)

        _this.transformToBoldButton.addEventListener('click', function () {
            _this.transformText('BOLD');
        }, false);

        _this.transformToEmphasizeButton.addEventListener('click', function () {
            _this.transformText('EMPHASIZE');
        }, false);

        _this.transformToQuoteButton.addEventListener('click', function () {
            _this.transformText('QUOTE');
        }, false);

        _this.reviewFormToggleButton.addEventListener('click', function () {
            _this.toggleAddReviewForm(this);
        }, false);

        _this.cancelAddReview.addEventListener('click', function () {
            _this.reviewCanceled(REVIEW_FORM);
        }, false);
    }

    reviewerNameChanged(value) {
        this.editorLabel.innerText = value;
    }

    uploadAvatar() {
        const file = this.uploadAvatarButton.files[0];
        const _this = this;
        let reader = new FileReader();
        reader.onloadend = function () {
            _this.reviewAvatarImage.src = reader.result;
            _this.reviewAvatarSampleImage.style.backgroundImage = "url(" + reader.result + ")";
            _this.avatarStatusLabel.innerText = 'Image selected';
        };
        reader.readAsDataURL(file);
    }

    ratingChanged(event) {
        const maxRating = 5;
        let previousRating = 0;
        let currentRating = event.target.value;
        this.disabledStars.style.display = 'block';

        for (let i = 0; i <= maxRating - currentRating; i++) {
            this.reviewRatingDisabled.children[i].classList.add("orange");
            previousRating = maxRating - currentRating + 1;
        }

        for (let i = maxRating - currentRating + 1; i <= maxRating - 1; i++) {
            this.reviewRatingDisabled.children[i].classList.remove("orange");
        }
    }

    reviewTextChanged(value) {
        this.reviewText.classList.add('review-text__changed');
        this.reviewText.innerHTML = value;

        if (this.feedbackText.value != "") this.toggleAddReviewButton(true);
        else this.toggleAddReviewButton(false);
    }

    toggleAddReviewButton(hidden) {
        if (!hidden) this.reviewDataSubmit.classList.add('disabled');
        else this.reviewDataSubmit.classList.remove('disabled');
    }

    transformText(transformType) {
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

        let editedText = this.feedBackTextArea.value.replace(selectedText, transformedText);
        this.feedBackTextArea.value = editedText;
        this.reviewTextChanged(editedText);
    }

    getSelectedText() {
        const selectionStart = this.feedBackTextArea.selectionStart;
        const selectionEnd = this.feedBackTextArea.selectionEnd;
        let selectedText = this.feedBackTextArea.value.substring(selectionStart, selectionEnd);
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
        if (element.style.display == '') {
            this.reviewForm.style.display = 'block';
            this.mainTagElement.style.height = 'auto';
            this.shareThoughtsContainer.innerText = "Share your thoughts with other customers:";
        }
    }

    reviewCanceled(componentId) {
        document.getElementById(componentId).style.display = 'none';
        this.mainTagElement.style.height = '';
        this.shareThoughtsContainer.innerHTML = "<p class=\"product-card__review--purpose\" id=\"share-thoughts__container\">Would you like to <span class=\"product-card__add-review\" id=\"review-form__show\"> share your thoughts with other customers</span> ?</p>";
        this.shareThoughtsContainer.addEventListener('click', function () {
            this.toggleAddReviewForm(this);
            // TODO Fix hiding event
        });
    }
}

let customReviewForm = new ReviewForm('review-form__template-container');
