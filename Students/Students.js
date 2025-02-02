function startStudentGrouping() {
    let students = [];

    while (true) {
        let firstName = prompt("Enter student's first name:");
        if (!firstName) break;

        let lastName = prompt("Enter student's last name:");
        if (!lastName) {
            alert("Last name cannot be empty!");
            continue;
        }

        let score = parseInt(prompt("Enter student's score (0-100):"));
        if (isNaN(score) || score < 0 || score > 100) {
            alert("Invalid score! Please enter a score between 0 and 100.");
            continue;
        }

        students.push({ firstName, lastName, score });

        let more = confirm("Would you like to enter more students?");
        if (!more) break;
    }

    if (students.length === 0) {
        alert("No student data entered.");
        return;
    }

    categorizeAndDisplayStudents(students);
}

function categorizeAndDisplayStudents(students) {
    console.clear(); 

    let categories = {
        "0-25%": [],
        "25-50%": [],
        "50-75%": [],
        "75-100%": []
    };

    students.forEach(student => {
        if (student.score <= 25) {
            categories["0-25%"].push(student);
        } else if (student.score <= 50) {
            categories["25-50%"].push(student);
        } else if (student.score <= 75) {
            categories["50-75%"].push(student);
        } else {
            categories["75-100%"].push(student);
        }
    });

    Object.keys(categories).forEach(category => {
        let categoryStudents = categories[category];
        let totalScore = categoryStudents.reduce((sum, student) => sum + student.score, 0);
        let averageScore = categoryStudents.length ? totalScore / categoryStudents.length : 0;

        console.log(`\nCategory: ${category}`);
        console.log(`Average Score: ${averageScore.toFixed(2)}`);

        categoryStudents
            .sort((a, b) => a.lastName.localeCompare(b.lastName)) 
            .forEach(student => {
                console.log(`${student.lastName} ${student.firstName} - ${student.score}`);
            });

        console.log("-------------------------------");
    });
}