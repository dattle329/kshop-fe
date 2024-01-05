const BASE_URL = "http://localhost:8080"
const formId = document.getElementById("id");
const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formName = document.getElementById("name");
const formPrice = document.getElementById("price");
const formStatusDamaged = document.getElementById("status-damaged");3
const formRepairStatus = document.getElementById("repair-status");


const form = document.getElementById("accessory-form")
const tbody = document.getElementById("accessories")

form.addEventListener("submit", async function (e){
    e.preventDefault();
    await createOrUpdate();
    findAll();
    this.reset();
})

findAll();

async function findAll(){
    const response = await fetch(`${BASE_URL}/api/v1/accessories`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const body = await response.json();
    console.log(body);

    showAllAccessories(body.content);
}

async function showAllAccessories(accessories){
    tbody.innerHTML = "";
    for(const accessory of accessories){
        const row = tbody.insertRow();

        const id = document.createTextNode(accessory.id);
        row.insertCell().appendChild(id);

        const licensePlate = document.createTextNode(accessory.licensePlate)
        row.insertCell().appendChild(licensePlate);

        const repairDate = accessory.repairDate;
        row.insertCell().innerText = repairDate;

        const name = accessory.name;
        row.insertCell().innerText = name;

        row.insertCell().innerText = accessory.price;

        row.insertCell().innerText = accessory.statusDamaged;

        row.insertCell().innerText = accessory.repairStatus;

        const btnEdit = document.createElement("button")
        btnEdit.classList.add("fa-solid", "fa-pen-to-square");
        btnEdit.addEventListener("click", function(){
            formId.value = accessory.id;
            formLicensePlate.value = accessory.licensePlate;
            formRepairDate.value = repairDate;
            formName.value = name;
            formPrice.value = accessory.price;
            formStatusDamaged.value = accessory.statusDamaged;
            formRepairStatus.value = accessory.repairStatus;
        })

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("fa-solid", "fa-trash");
        btnDelete.addEventListener("click",async function(){
            const confirmed = confirm("Do u wanna delete this?")
            if(confirmed){
               await deleteById(accessory.id);
               tbody.removeChild(row);
            }
        });
        row.insertCell().append(btnEdit, btnDelete);

    }
}

async function createOrUpdate(){
    const id = formId.value;
    const url = id ? `${BASE_URL}/api/v1/accessories/${id}` : `${BASE_URL}/api/v1/accessories`
    const method = id ? "PUT" : "POST"
    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: formId.value,
            licensePlate: formLicensePlate.value,
            repairDate: formRepairDate.value,
            name: formName.value,
            price: formPrice.value,
            statusDamaged: formStatusDamaged.value,
            repairStatus: formRepairStatus.value
        })
    });
    const body = await response.json();
    console.log(body);
}

async function deleteById(id){
    const response = await fetch(`${BASE_URL}/api/v1/accessory/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

}