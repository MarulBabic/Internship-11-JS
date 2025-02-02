function plantAnalysis() {
    let plants = [];

    while (true) {
        let name = prompt("Enter plant name:");
        if (!name) break;

        let color = prompt("Enter plant color:");
        if (!color) {
            alert("Color cannot be empty!");
            continue;
        }

        let calories = parseInt(prompt("Enter plant's calories per 100g:"));
        if (isNaN(calories) || calories <= 0) {
            alert("Invalid calorie input! Please enter a valid number.");
            continue;
        }

        plants.push({ name, color, calories });

        let more = confirm("Would you like to enter more plants?");
        if (!more) break;
    }

    if (plants.length === 0) {
        alert("No plant data entered.");
        return;
    }

    groupAndDisplayPlants(plants);
}

function groupAndDisplayPlants(plants) {
    console.clear(); 

    let colorGroups = {};

    plants.forEach(plant => {
        if (!colorGroups[plant.color]) {
            colorGroups[plant.color] = { totalCalories: 0, plants: [] };
        }
        colorGroups[plant.color].totalCalories += plant.calories;
        colorGroups[plant.color].plants.push(plant);
    });

    let colorList = Object.entries(colorGroups)
        .map(([color, data]) => ({
            color,
            totalCalories: data.totalCalories,
            plants: data.plants
        }))
        .sort((a, b) => b.totalCalories - a.totalCalories);

    console.log("Total Caloric Contributions by Color:\n");

    colorList.forEach(colorGroup => {
        console.log(`Color: ${colorGroup.color}`);
        console.log(`Total Calories: ${colorGroup.totalCalories} kcal`);
        
        colorGroup.plants.forEach(plant => {
            console.log(`   - ${plant.name}: ${plant.calories} kcal`);
        });
        
        console.log("-------------------------------");
    });

    console.log("\nTop 3 Colors with Highest Caloric Contribution:\n");
    colorList.slice(0, 3).forEach((colorGroup, index) => {
        console.log(`#${index + 1} Color: ${colorGroup.color} with ${colorGroup.totalCalories} kcal`);
    });
}