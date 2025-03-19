// Books array
const myBooks = [];

// Book constructor

function Book(title, author, pages, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
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
                appendBook()
            } else if (myBooks.length != 0) {
                for (let i = 0; i <= myBooks.length; i++) {
                    if (formTitle.value != myBooks[i].title) {
                        appendBook()
                    } else if(formTitle.value == myBooks[i].title) {
                        alert("Book Already Exists!");
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
    const uniqueID = crypto.randomUUID()

    let newBook = new Book(formTitle.value, formAuthor.value, formPages.value, uniqueID);
    myBooks.push(newBook);
    createCard(newBook);
}

// Handle dynamic card creation

function createCard(book) {
    const cardsContainer = document.querySelector(".content-container");
    // Overall Card Creation
    const cardContainer = document.createElement("div");
    cardContainer.id = "book-card";
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
    cardReadBtn.innerText = "Hello"
    const cardBookRemove = document.createElement("button");
    cardBookRemove.id = "remove-bookCard";
    cardBookRemove.innerText = "Remove Book"

    cardOptions.append(cardReadBtn, cardBookRemove);

    cardsContainer.appendChild(cardContainer);
}

handleAddBook();