const viewBtns = document.querySelectorAll('.view-id-btn')
const deleteBtns = document.querySelectorAll('.delete-btn')

const frontId = document.querySelector("#front-id");
const backId = document.querySelector("#back-id");

Array.from(deleteBtns).forEach(deleteBtn => {
    deleteBtn.addEventListener("click", () => {
        const businessId = deleteBtn.getAttribute('data-id');

        if(confirm('Are you sure you want to remove this business?')){
            location.href = `./delete/${businessId}`;
        }
    })
})

Array.from(viewBtns).forEach(viewBtn => 
    viewBtn.addEventListener("click", async () => {
        const businessId = viewBtn.getAttribute("data-id");
        const getBusinessDetails = await fetch(`./get-id/${businessId}`)
        const data = await getBusinessDetails.json();

        frontId.src = data.data[0][5];
        backId.src = data.data[0][6];
        console.log(data);
    })
)