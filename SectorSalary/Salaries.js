function startSalaryAnalysis() {
    let employees = [];

    while (true) {
        let firstName = prompt("Enter employee's first name:");
        if (!firstName) break;

        let lastName = prompt("Enter employee's last name:");
        if (!lastName) break;

        let sector = prompt("Enter work sector:");
        if (!sector) {
            alert("Sector cannot be empty!");
            continue;
        }

        let salary = parseFloat(prompt("Enter employee's salary (€):"));
        if (isNaN(salary) || salary <= 0) {
            alert("Invalid salary input! Please enter a valid salary.");
            continue;
        }

        employees.push({ firstName, lastName, sector, salary });

        let more = confirm("Would you like to enter more employees?");
        if (!more) break;
    }

    if (employees.length === 0) {
        alert("No employee data entered.");
        return;
    }

    calculateAndDisplayContributions(employees);
}

function calculateAndDisplayContributions(employees) {
    console.clear(); 

    let totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

    let sectorStats = {};
    employees.forEach(emp => {
        if (!sectorStats[emp.sector]) {
            sectorStats[emp.sector] = { totalSalary: 0, employees: [] };
        }
        sectorStats[emp.sector].totalSalary += emp.salary;
        sectorStats[emp.sector].employees.push(emp);
    });

    let sectorList = Object.entries(sectorStats)
        .map(([sector, data]) => ({
            sector,
            totalSalary: data.totalSalary,
            contributionPercent: (data.totalSalary / totalSalary) * 100,
            employees: data.employees
        }))
        .sort((a, b) => b.contributionPercent - a.contributionPercent); 

    console.log("Total Salary of All Employees:", totalSalary.toFixed(2) + " €\n");

    sectorList.forEach(sector => {
        console.log(`Sector: ${sector.sector}`);
        console.log(`Total Sector Salary: ${sector.totalSalary.toFixed(2)} €`);
        console.log(`Sector Contribution: ${sector.contributionPercent.toFixed(2)}%`);

        sector.employees.forEach(emp => {
            let empContribution = (emp.salary / sector.totalSalary) * 100;
            console.log(`   - ${emp.firstName} ${emp.lastName}: ${emp.salary} € (${empContribution.toFixed(2)}%)`);
        });

        console.log("-------------------------------");
    });
}