// Books array
const myBooks = [];

// Book constructor

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

// Handling form popup

function handleAddBook() {
    const addBookBtn = document.getElementById("addBook-btn");
    const modal = document.getElementById("book-form");
    const closeModalBtn = document.getElementById("close-btn");
    const submitForm = document.getElementById("submit-form");
    const formTitle = document.forms["book-form"]["bookForm-title"];
    const formAuthor = document.forms["book-form"]["bookForm-author"];
    const formPages = document.forms["book-form"]["bookForm-pages"];
    

    addBookBtn.addEventListener("click", () => {
        modal.style.display = "flex";

        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });

    submitForm.addEventListener("click", (event) => {
        event.preventDefault();

        if(formTitle.value == "") {
            formTitle.style.borderColor = "red";
        }
        if (formAuthor.value == "") {
            formAuthor.style.borderColor = "red";
        }
        if (formPages.value == "") {
            formPages.style.borderColor = "red";
        }

        if (formTitle.value == "" || formAuthor.value == "" || formPages.value == "") {
            modal.style.display = "flex";
        } else {
            modal.style.display = "none";
            if (myBooks.length == 0) {
                appendBook();
            } else if (myBooks.length != 0) {
                for (let i = 0; i <= myBooks.length; i++) {
                    if (myBooks[i].title != formTitle.value) {
                        appendBook();
                        break;
                    } else if (myBooks[i].title == formTitle.value) {
                        alert("Book already exists");
                    }
                }
            }
        }
    })
}

// Handle book creation

function appendBook() {
    const formTitle = document.forms["book-form"]["bookForm-title"];
    const formAuthor = document.forms["book-form"]["bookForm-author"];
    const formPages = document.forms["book-form"]["bookForm-pages"];
    const formChecked = document.forms["book-form"]["bookForm-read"].checked;
    const uniqueID = crypto.randomUUID();
    let bookRead;

    if (formChecked == true) {
        bookRead = "Read";
    } else if (formChecked == false) {
        bookRead = "Not Read";
    }

    let newBook = new Book(formTitle.value, formAuthor.value, formPages.value, bookRead, uniqueID);
    myBooks.push(newBook);
    createCard(newBook);
}

// Handle dynamic card creation

function createCard(book) {
    const cardsContainer = document.querySelector(".content-container");
    // Overall Card Creation
    const cardContainer = document.createElement("div");
    cardContainer.id = "book-card";
    cardContainer.dataset.indexNumber = book.id;
    const cardDetails = document.createElement("div");
    cardDetails.id = "card-details";
    const cardOptions = document.createElement("div");
    cardOptions.id = "card-options";
    
    cardContainer.append(cardDetails, cardOptions);

    // Card Details portion content
    const cardBookTitle = document.createElement("p");
    cardBookTitle.id = "bookCard-title";
    cardBookTitle.innerText = book.title;
    const cardBookAuthor = document.createElement("p");
    cardBookAuthor.id = "bookCard-author";
    cardBookAuthor.innerText = book.author;
    const cardBookPages = document.createElement("p");
    cardBookPages.id = "bookCard-pages";
    cardBookPages.innerText = book.pages;

    cardDetails.append(cardBookTitle, cardBookAuthor, cardBookPages);

    // Card options content
    const cardReadBtn = document.createElement("button");
    cardReadBtn.id = "read-bookBtn";
    cardReadBtn.innerText = book.read;
    cardReadBtn.innerText = book.read;
    cardReadBtn.addEventListener("click", () => {
        if (book.read == "Read") {
            book.read = "Not Read";
            cardReadBtn.style.background = "linear-gradient(90deg, rgba(250, 10, 100, 0.9), rgba(200, 10, 100, 0.7)";
        } else if (book.read == "Not Read") {
            book.read = "Read";
            cardReadBtn.style.background = "linear-gradient(90deg, rgba(100, 255, 100, 0.9), rgba(150, 250, 150, 0.7), rgba(200, 250, 200, 0.5)";
        }
    })
    if(book.read == "Read") {
        cardReadBtn.style.background = "linear-gradient(90deg, rgba(100, 255, 100, 0.9), rgba(150, 250, 150, 0.7), rgba(200, 250, 200, 0.5)";
    } else if (book.read == "Not Read") {
        cardReadBtn.style.background = "linear-gradient(90deg, rgba(250, 10, 100, 0.9), rgba(200, 10, 100, 0.7)";
    }

    const cardBookRemove = document.createElement("button");
    cardBookRemove.id = "remove-bookCard";
    cardBookRemove.innerText = "Remove Book";
    cardBookRemove.style.background = "linear-gradient(90deg, rgba(250, 10, 10, 0.8), rgba(250, 10, 50, 0.6), rgba(250, 10, 50, 0.4)";

    cardBookRemove.addEventListener("click", () => {
        for (let i = 0; i <= myBooks.length; i++) {
            if (myBooks[i].id == cardContainer.dataset.indexNumber) {
                cardContainer.remove();
                myBooks.splice(i, 1);
                break;
            }
        }
    });
    
    cardOptions.append(cardReadBtn, cardBookRemove);

    cardsContainer.appendChild(cardContainer);
}

handleAddBook();
