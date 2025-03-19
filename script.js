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
        }

        appendBook();
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
}

handleAddBook();