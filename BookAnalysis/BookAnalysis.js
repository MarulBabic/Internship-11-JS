function analysis() {
    let books = [];

    while (true) {
        let title = prompt("Enter the book title:");
        if (!title) break;

        let price = parseFloat(prompt("Enter the book price:"));
        if (isNaN(price) || price <= 0) {
            alert("Invalid price input! Please enter a valid price.");
            continue;
        }

        let genre = prompt("Enter the book genre:");
        if (!genre) {
            alert("Genre cannot be empty!");
            continue;
        }

        books.push({ title, price, genre });

        let more = confirm("Would you like to enter more books?");
        if (!more) break;
    }

    if (books.length === 0) {
        alert("No books entered.");
        return;
    }

    let total = books.reduce((sum, book) => sum + book.price, 0);
    let avgPrice = total / books.length;

    let maxDeviationBook = books.reduce((max, book) => {
        let deviation = Math.abs(book.price - avgPrice);
        return deviation > max.deviation ? { book, deviation } : max;
    }, { book: null, deviation: 0 }).book;

    let sortedBooks = books
        .map(book => ({ ...book, deviation: Math.abs(book.price - avgPrice) }))
        .sort((a, b) => b.deviation - a.deviation);

    displayResults(avgPrice, maxDeviationBook, sortedBooks);
}

function displayResults(avgPrice, maxDeviationBook, sortedBooks) {
    console.log("Average book price:", avgPrice.toFixed(2) + " €");

    if (maxDeviationBook) {
        console.log("Book with the largest deviation:", maxDeviationBook.title, "-", maxDeviationBook.price + " €");
    }

    console.log("Books sorted by deviation:");
    sortedBooks.forEach(book => {
        console.log(`${book.title} - ${book.price} € (deviation: ${book.deviation.toFixed(2)} €)`);
    });
}