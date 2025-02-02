const form = document.getElementById("contact-form");

const errorMessages = {
    firstname: "This field is required",
    lastname: "This field is required",
    email: "Please enter a valid email address",
    query: "Please select a query type",
    message: "This field is required",
    consent: "To submit this form, please consent to being contacted",
}

// Central function to validate a single input field
function validateInput(input) {
    if (requiredValueMissing(input) || !dataIsValid(input)) {
        showError(input, errorMessages[input.name]);
        return false;
    } else {
        removeError(input);
        return true;
    }
}

// Checks the entire form
function formIsValid(form) {
    let formIsValid = true;
    let firstErrorField = null;

    for (let input of form.elements) {
        if (!validateInput(input)) {
            formIsValid = false;
            if (!firstErrorField) firstErrorField = input;
        }
    }

    if (firstErrorField) firstErrorField.focus();

    return formIsValid;
}

// Checks if a required value is missing
function requiredValueMissing(input) {
    if (input.type === "radio" || input.type === "checkbox") {
        const group = document.querySelectorAll(`[name="${input.name}"]`);
        return ![...group].some(el => el.checked);
    }
    return input.validity.valueMissing;
}

// Checks if the input data is valid
function dataIsValid(input) {
    return input.validity.valid;
}

// Displays an error for a field
function showError(input, errorMessage) {
    const formControl = input.closest(".form__control");
    formControl.classList.add("form__input--error");

    const errorIsVisible = formControl.querySelector(".form__error");

    if (!errorIsVisible) {
        const error = document.createElement("span");
        error.innerText = errorMessage;
        error.id = `${input.id}-error`;
        error.className = "form__error";
        error.setAttribute("aria-live", "polite");

        input.setAttribute("aria-describedby", error.id);
        formControl.appendChild(error);
    }
}

// Removes the error display
function removeError(input) {
    const formControl = input.closest(".form__control");
    formControl.classList.remove("form__input--error");

    const error = document.getElementById(`${input.id}-error`);

    if (error) {
        error.remove();
    }
}

// Displays a success message
function showSuccess() {
    const toast = document.getElementById("toast");

    toast.classList.add("toast--is-visible");
    toast.removeAttribute("aria-hidden");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("role", "status");
}

// Validate form on submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formIsValid(form)) {
        showSuccess();
    }
});