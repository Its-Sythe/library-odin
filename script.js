// Container for books in the library
const myLibrary = [];

// Constructor for book object

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

// Handling add button
function handleAllClicks() {
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
            let uniqueID = crypto.randomUUID();
            let newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead, uniqueID);
            myLibrary.push(newBook);
        }
        displayBook(myLibrary);
    });
}

// Handling card creation

function createCard(title, author, pages, read) {
    const cardContainer = document.getElementById("cards-container");
    const bookCard = document.createElement("div");
    bookCard.id = "book-card"

    // Card Details items created here
    const cardDetails = document.createElement("div");
    cardDetails.id = "card-details";
    const bookTitle = document.createElement("h2");
    bookTitle.id = "bookCard-title";
    bookTitle.innerText = title;
    const bookAuthor = document.createElement("p");
    bookAuthor.id = "bookCard-author";
    bookAuthor.innerText = author;
    const bookPages = document.createElement("p");
    bookPages.id = "bookCard-pages";
    bookPages.innerText = pages;
    cardDetails.append(bookTitle, bookAuthor, bookPages);

    // Card option items created here
    const cardOptions = document.createElement("div");
    cardOptions.id = "bookCard-options";
    const readButton = document.createElement("button");
    readButton.id = "bookCard-read"
    readButton.innerText = read;
    const removeButton = document.createElement("button");
    removeButton.id = "bookCard-remove";
    removeButton.innerText = "Remove Book"
    cardOptions.append(readButton, removeButton);

    // Appending all elements to book card container
    bookCard.append(cardDetails, cardOptions)
    cardContainer.append(bookCard);

}

// Handling book display functionability

function displayBook(library) {
    library.forEach(book => {
        createCard(book.title, book.author, book.pages, book.read);
    });
}

handleAllClicks();