function equipmentManagement() {
    let equipment = [];

    while (true) {
        let name = prompt("Enter the name of the equipment:");
        if (!name) break;

        let price = parseFloat(prompt("Enter the price of the equipment:"));
        if (isNaN(price) || price <= 0) {
            alert("Invalid price! Please enter a valid positive number.");
            continue;
        }

        let status = prompt("Enter the status of the equipment (available or unavailable):").toLowerCase();
        if (status !== "available" && status !== "unavailable") {
            alert("Invalid status! Please enter 'available' or 'unavailable'.");
            continue;
        }

        equipment.push({ name, price, status });

        let more = confirm("Do you want to enter more equipment?");
        if (!more) break;
    }

    if (equipment.length === 0) {
        alert("No equipment data entered.");
        return;
    }

    manageEquipmentData(equipment);
}

function manageEquipmentData(equipment) {
    console.clear(); 

    let unavailableIndices = equipment
        .map((item, index) => item.status === "unavailable" ? index : -1)
        .filter(index => index !== -1);

    console.log("Indices of unavailable equipment:", unavailableIndices);

    let availableEquipment = equipment
        .filter(item => item.status === "available")
        .sort((a, b) => {
            if (a.price === b.price) {
                return a.name.localeCompare(b.name); 
            }
            return a.price - b.price; 
        });

    console.log("Sorted available equipment:");
    availableEquipment.forEach(item => {
        console.log(`${item.name} - ${item.price} €`);
    });

    let totalValue = equipment.reduce((sum, item) => sum + item.price, 0);
    let unavailableValue = unavailableIndices.reduce((sum, index) => sum + equipment[index].price, 0);
    let unavailablePercentage = (unavailableValue / totalValue) * 100;

    console.log(`Percentage of total value from unavailable equipment: ${unavailablePercentage.toFixed(2)}%`);

    let priceRanges = {
        "Cheap": [],
        "Medium": [],
        "Expensive": []
    };

    availableEquipment.forEach(item => {
        if (item.price < 100) {
            priceRanges.Cheap.push(item);
        } else if (item.price >= 100 && item.price < 500) {
            priceRanges.Medium.push(item);
        } else {
            priceRanges.Expensive.push(item);
        }
    });

    console.log("\nGrouped available equipment by price range:");

    Object.keys(priceRanges).forEach(range => {
        console.log(`\n${range} equipment:`);
        priceRanges[range].forEach(item => {
            console.log(`${item.name} - ${item.price} €`);
        });
    });
}