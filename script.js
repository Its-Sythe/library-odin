// Container for books in the library
const myLibrary = [];

// Constructor for book object

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Handling add button
function handleAddBook() {
    const addBook = document.getElementById("add-btn");
    const modal = document.getElementById("form-modal");
    const submitBook = document.getElementById("submit-book");
    const bookTitle = document.forms["book"]["title"];
    const bookAuthor = document.forms["book"]["author"];
    const bookPages = document.forms["book"]["pages"];
    const confirmRead = document.forms["book"]["confirm-read"].value;

    let bookRead = "Book not Read";

    if (confirmRead == "on") {
        bookRead = "Book Read";
    };

    addBook.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    submitBook.addEventListener("click", (event) => {
        event.preventDefault();
        if (bookTitle.value == "") {
            bookTitle.style.borderColor = "red";
        }
        if (bookAuthor.value == "") {
            bookAuthor.style.borderColor = "red";
        }
        if (bookPages.value == 0) {
            bookPages.style.borderColor = "red";
        }

        if (bookTitle.value == "" || bookAuthor.value == "" || bookPages.value == 0) {
            modal.style.display = "flex";
        } else {
            modal.style.display = "none";
            let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead);
            myLibrary.push(newBook);
        }
    });
}
handleAddBook();