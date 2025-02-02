function startEmploymentAnalysis() {
    let employees = [];

    while (true) {
        let firstName = prompt("Enter employee's first name:");
        if (!firstName) break;

        let lastName = prompt("Enter employee's last name:");
        if (!lastName) break;

        let industry = prompt("Enter industry:");
        if (!industry) {
            alert("Industry cannot be empty!");
            continue;
        }

        let salary = parseFloat(prompt("Enter employee's salary (€):"));
        if (isNaN(salary) || salary <= 0) {
            alert("Invalid salary input! Please enter a valid salary.");
            continue;
        }

        employees.push({ firstName, lastName, industry, salary });

        let more = confirm("Would you like to enter more employees?");
        if (!more) break;
    }

    if (employees.length === 0) {
        alert("No employee data entered.");
        return;
    }

    let industryStats = {};
    
    employees.forEach(emp => {
        if (!industryStats[emp.industry]) {
            industryStats[emp.industry] = { totalSalary: 0, count: 0, employees: [] };
        }
        industryStats[emp.industry].totalSalary += emp.salary;
        industryStats[emp.industry].count += 1;
        industryStats[emp.industry].employees.push(emp);
    });

    let industryList = Object.entries(industryStats)
        .map(([industry, data]) => ({
            industry,
            avgSalary: data.totalSalary / data.count,
            count: data.count,
            employees: data.employees
        }))
        .filter(industry => industry.count >= 2)  
        .sort((a, b) => a.industry.localeCompare(b.industry)); 

    displayResults(industryList);
}

function displayResults(industryList) {
    console.clear(); 

    if (industryList.length === 0) {
        console.log("No industries with at least two employees.");
        return;
    }

    industryList.forEach(industry => {
        console.log(`\nIndustry: ${industry.industry} (Employees: ${industry.count})`);
        console.log(`Average Salary: ${industry.avgSalary.toFixed(2)} €`);

        industry.employees.forEach(emp => {
            console.log(`- ${emp.firstName} ${emp.lastName}: ${emp.salary} €`);
        });
    });
}