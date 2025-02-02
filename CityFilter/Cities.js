function createInputField() {
    let inputContainer = document.getElementById("input-container");

    let label = document.createElement("label");
    label.setAttribute("for", "cities");
    label.textContent = "Enter city names (comma separated):";
    inputContainer.appendChild(label);

    let button = document.createElement("button");
    button.textContent = "Process Cities";
    button.onclick = processCities;
    inputContainer.appendChild(button);
}

function processCities() {
    let citiesInput = prompt("Enter the city names (comma separated):");

    if (!citiesInput) {
        alert("Please enter city names!");
        return;
    }

    let cities = citiesInput.split(',').map(city => city.trim());
    cities.sort();

    let filteredCities = cities.filter(city => city.length > 5);

    let csvContent = filteredCities.join(', ');
    
    console.log("Filtered and sorted cities (CSV format):");
    console.log(csvContent);
    
    document.getElementById("result").textContent = csvContent;

    document.getElementById("download-btn").style.display = 'inline-block';
    document.getElementById("download-btn").setAttribute("data-csv", csvContent);

    let proceedWithDownload = confirm("Would you like to download the results?");
    if (proceedWithDownload) {
        downloadCSV();
    }
}

function downloadCSV() {
    let csvContent = document.getElementById("download-btn").getAttribute("data-csv");
    let blob = new Blob([csvContent], { type: 'text/plain' });
    let link = document.createElement("a");
    link.download = "filtered_cities.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
}
createInputField();