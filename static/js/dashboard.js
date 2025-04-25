const viewBtns = document.querySelectorAll('.view-id-btn')
const deleteBtns = document.querySelectorAll('.delete-btn')

const frontId = document.querySelector("#front-id");
const backId = document.querySelector("#back-id");


const searchInput = document.querySelector("#search-input");
const records = document.querySelectorAll(".record")


// SEARCH BUSINESS RECORD FUNCTIONALITY
searchInput.addEventListener("input",  (e) => {
    const keyword = searchInput.value.toLowerCase();

    Array.from(records).forEach(record => {
        const recordData = record.textContent.trim().toLowerCase();
        if(recordData.includes(keyword)){
            record.classList.remove("d-none");
        }else{
            record.classList.add("d-none");
        }
    })  
})


// DELETE BUSINESS RECORD FUNCTIONALITY
Array.from(deleteBtns).forEach(deleteBtn => {
    deleteBtn.addEventListener("click", () => {
        const businessId = deleteBtn.getAttribute('data-id');

        if(confirm('Are you sure you want to remove this business?')){
            location.href = `./delete/${businessId}`;
        }
    })
})


// VIEW OWNER ID FUNCTIONALITY
Array.from(viewBtns).forEach(viewBtn => 
    viewBtn.addEventListener("click", async () => {
        const businessId = viewBtn.getAttribute("data-id");
        const getBusinessDetails = await fetch(`./get-id/${businessId}`)
        const data = await getBusinessDetails.json();

        frontId.src = data.data[0][5];
        backId.src = data.data[0][6];
    })
)