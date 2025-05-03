const fileSelector = document.querySelector("#file-selector")
const paymentPreview = document.querySelector("#payment-preview");
const paymentReceiptInput = document.querySelector("#payment-receipt")
const businessIdInput = document.querySelector("#business-id-input")
const saveBtn = document.querySelector("#save-btn")
const removePaymentBtn = document.querySelector("#remove-btn")
const paymentMethods = document.querySelectorAll("#payment-methods input")




const paymentBtns = document.querySelectorAll(".pay-btn");



removePaymentBtn.addEventListener("click",  (e) => {
    const paymentId = e.target.getAttribute("data-payment-id");

    if(confirm("Are you sure you want to remove this payment record?")){
        location.href = `/remove-payment/${paymentId}`;
    }
})


Array.from(paymentBtns).forEach(payBtn => {
    payBtn.addEventListener("click", async () => {
        const bId = payBtn.getAttribute("data-id");
        const paymentId = payBtn.getAttribute("data-payment-id");

        removePaymentBtn.setAttribute("data-payment-id", paymentId);
        businessIdInput.value = bId;


        // RESET WHEN THE MODAL WA OPENED
        Array.from(paymentMethods).forEach(pm => {
                pm.disabled = false;
                pm.removeAttribute("checked")
        })  

        paymentPreview.src = "/static/img/image-placeholder.png"
        removePaymentBtn.classList.add("d-none");
        saveBtn.classList.remove("d-none")
        fileSelector.classList.remove("d-none")

        if(paymentId !== "None"){
            const getPaymentData = await fetch(`/get-payment-data/${paymentId}`)
            const res= await getPaymentData.json();
            
            Array.from(paymentMethods).forEach(pm => {
                
                if(pm.value === res.data[0][4]) {
                    pm.setAttribute("checked", true);
                }else{
                    pm.disabled = true;
                }
            })  

            paymentPreview.src = res.data[0][3];
            fileSelector.classList.add("d-none")
            saveBtn.classList.add("d-none");
            removePaymentBtn.classList.remove("d-none")
        }
        
    })
})


fileSelector.addEventListener("change", (e) => {
    const targetFile = e.target.files[0];

    if(!targetFile.type.includes("image")) return alert("PLease select an image file!");

    const fr = new FileReader();

    fr.readAsDataURL(targetFile);
    fr.onload = () => {
        const data = fr.result;

        paymentPreview.src = data;
        paymentReceiptInput.value = data;
    }
})