// FRONT ID
const frontIdFileInput = document.querySelector("#front-id-file-input");
const frontIdDataInput = document.querySelector("#front-id-data-input")
const frontIdPreview = document.querySelector("#front-id-preview");

//BACK ID 
const backIdFileInput = document.querySelector("#back-id-file-input");
const backIdDataInput = document.querySelector("#back-id-data-input")
const backIdPreview = document.querySelector("#back-id-preview");


const initFileInput = (fileInput, fileDataInput, preview) => {
    const file = fileInput.files[0];

    if (file) {
        if (!file.type.startsWith("image/")) {
            alert("The selected file must be an image.");
            fileInput.value = ""; // Clear the input
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
            alert("The selected file must be less than 2MB.");
            fileInput.value = ""; // Clear the input
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            fileDataInput.value = e.target.result; // Set the base64 data
            preview.querySelector("img").src = e.target.result;
            preview.classList.remove("d-none");
        };

        reader.readAsDataURL(file);
    }
}

frontIdFileInput.addEventListener("change", () => initFileInput(frontIdFileInput, frontIdDataInput, frontIdPreview))
backIdFileInput.addEventListener("change", () => initFileInput(backIdFileInput, backIdDataInput, backIdPreview))
