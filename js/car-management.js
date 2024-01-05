const BASE_URL = "http://localhost:8080"
const formLicensePlate = document.getElementById("license-plate");
const formRepairDate = document.getElementById("repair-date");
const formCustomerName = document.getElementById("customer-name");
const formCatalog = document.getElementById("catalog");
const formCarMaker = document.getElementById("car-maker");

const form = document.getElementById("car-update-form")
const tbody = document.getElementById("cars")

form.addEventListener("submit", async function (e){
    e.preventDefault();
    await update();
    findAll();
    this.reset();
})

findAll();

async function findAll(){
    const response = await fetch(`${BASE_URL}/api/v1/cars`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const body = await response.json();
    console.log(body);

    showAllCars(body.content);
}

async function showAllCars(cars){
    tbody.innerHTML = "";
    for(const car of cars){
        const row = tbody.insertRow();

        const licensePlate = document.createTextNode(car.licensePlate)
        row.insertCell().appendChild(licensePlate);

        const repairDate = car.repairDate;
        row.insertCell().innerText = repairDate;

        const customerName = car.customerName;
        row.insertCell().innerText = customerName;

        const catalog = car.catalogs;
        row.insertCell().innerText = catalog;

        const carMaker = car.carMaker;
        row.insertCell().innerText = carMaker;

        const btnEdit = document.createElement("button")
        btnEdit.classList.add("fa-solid", "fa-pen-to-square");
        btnEdit.addEventListener("click", function(){
            formLicensePlate.value = car.licensePlate;
            formRepairDate.value = repairDate;
            formCustomerName.value = customerName;
            formCatalog.value = catalog;
            formCarMaker.value = carMaker;
        })

        const btnDelete = document.createElement("button")
        btnDelete.classList.add("fa-solid", "fa-trash");
        btnDelete.addEventListener("click",async function(){
            const confirmed = confirm("Do u wanna delete?")
            if(confirmed){
               await deleteById(car.licensePlate, car.repairDate);
               tbody.removeChild(row);
            }
        });
        row.insertCell().append(btnEdit, btnDelete);

    }
}

async function update(){
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            licensePlate: formLicensePlate.value,
            repairDate: formRepairDate.value,
            customerName: formCustomerName.value,
            catalogs: formCatalog.value,
            carMaker: formCarMaker.value
        })
    });
    const body = await response.json();
    console.log(body);
}

async function deleteById(licensePlate, repairDate){
    const response = await fetch(`${BASE_URL}/api/v1/cars`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            licensePlate: formLicensePlate,
            repairDate: formRepairDate
        })
    });

}