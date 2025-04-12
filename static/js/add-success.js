const copyBtn = document.querySelector("#copy-btn");
const registrationId = document.querySelector("#registration-id");
const businessDetails = document.querySelector("#business-details");
const showDetailsBtn = document.querySelector("#show-business-details-btn");

showDetailsBtn.addEventListener("click", () => {
    businessDetails.classList.toggle("d-none");
    if (businessDetails.classList.contains("d-none")) {
       showDetailsBtn.style.rotate = "0deg";
    } else {
        showDetailsBtn.style.rotate = "180deg";
        window.scrollTo({
            top: registrationId.offsetTop,
            behavior: "smooth"
        });
    }
})
copyBtn.addEventListener("click", () =>  {
    navigator.clipboard.writeText(registrationId.textContent)
    
    copyBtn.innerHTML = '<i class="bi bi-check"></i>';
})