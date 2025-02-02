function startCalculation() {
    let N = parseInt(prompt("Enter the value of N (first N natural numbers):"));
    
    if (isNaN(N) || N <= 0) {
        alert("Invalid input! Please enter a positive integer.");
        return;
    }

    let squares = Array.from({ length: N }, (_, i) => (i + 1) ** 2);
    
    let totalSum = squares.reduce((sum, value) => sum + value, 0);
    let average = totalSum / squares.length;
    let median = calculateMedian(squares);
    
    displayResults(totalSum, average, median);
}

function calculateMedian(numbers) {
    numbers.sort((a, b) => a - b); 

    let middleIndex = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 1) {
        return numbers[middleIndex]; 
    } else {
        return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2; 
    }
}

function displayResults(sum, avg, median) {
    console.clear(); 

    console.log("Total Sum of Squares:", sum);
    console.log("Average of Squares:", avg.toFixed(2));
    console.log("Median of Squares:", median);
}