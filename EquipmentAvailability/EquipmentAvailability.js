let equipmentList = [];

document.getElementById("equipment-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let name = document.getElementById("name").value;
    let price = parseFloat(document.getElementById("price").value);
    let status = document.getElementById("status").value;
    if (!name || isNaN(price) || price <= 0) {
        alert("Invalid input! Check the equipment name, price, and status.");
        return;
    }
    equipmentList.push({ name, price, status });
    equipmentList.sort((a, b) => {
        if (a.status === b.status) {
            return a.name.localeCompare(b.name);
        }
        return a.status === "available" ? -1 : 1;
    });

    displayEquipment();
});

function displayEquipment() {
    let equipmentContainer = document.getElementById("equipment-list");
    equipmentContainer.innerHTML = "";

    let availableCount = equipmentList.filter(equip => equip.status === "available").length;
    let unavailableCount = equipmentList.length - availableCount;

    let ratio = (availableCount / equipmentList.length) * 100;
    let ratioText = `Ratio of available to unavailable equipment: ${availableCount} available, ${unavailableCount} unavailable.`;
    let ratioElement = document.createElement("p");
    ratioElement.textContent = ratioText;
    equipmentContainer.appendChild(ratioElement);

    equipmentList.forEach(equip => {
        let equipElement = document.createElement("p");
        equipElement.textContent = `${equip.name} - ${equip.price.toFixed(2)} €`;

        if (equip.status === "available") {
            equipElement.style.color = "green";
        } else {
            equipElement.style.color = "red";
        }

        equipmentContainer.appendChild(equipElement);
    });
}