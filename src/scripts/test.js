function searchBooksByAuthor() {
    const author = document.getElementById("authorInput").value;
    if (!author) {
        alert("Please enter an author's name!");
        return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(author)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = ""; // Clear previous results

            if (!data.items) {
                resultsDiv.innerHTML = "<p>No books found for this author.</p>";
                return;
            }

            data.items.forEach(book => {
                const title = book.volumeInfo.title || "No Title";
                const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
                const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/100";
                const description = book.volumeInfo.description ? book.volumeInfo.description.substring(0, 100) + "..." : "No description available.";

                const bookDiv = document.createElement("div");
                bookDiv.classList.add("book");
                bookDiv.innerHTML = `
                    <img src="${thumbnail}" alt="Book Cover">
                    <h3>${title}</h3>
                    <p><strong>Author(s):</strong> ${authors}</p>
                    <p>${description}</p>
                `;

                resultsDiv.appendChild(bookDiv);
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}
