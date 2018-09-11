var books = JSON.parse(localStorage.getItem('bookly-books')) || [
  'The Lord of the Rings Trilogy',
  'A Game of Thrones',
  'To Kill a Mockingbird',
];

var ulElement = document.querySelector('#book-list ul');
var addBookElement = document.getElementById('book-value');
var addButton = document.querySelector('#add-book button');
var searchInput = document.querySelector("#search-books input");
var hideAllElm = document.querySelector("#hide");

function displayBook(books = [],elm) {
  elm.innerHTML = books.map((book, i) => {
    return (
      `<li>
          <span class="name" data-id=${i}>${book}</span>
          <span class="delete" data-id=${i}>Delete</span>
        </li>`
    )
  }).join('');
}
// Function to add new book
function addBook(e) {
  e.preventDefault();
  let book = addBookElement.value;
  books.push(book);
  displayBook(books,ulElement);
  addBookElement.value = "";
  localStorage.setItem('bookly-books', JSON.stringify(books));
}

// Function to delete book
function deleteBook(e) {
  if(!e.target.className === 'delete') return;
  let id = e.target.dataset.id;
  books.splice(id, 1);
  displayBook(books, ulElement);
  localStorage.setItem('bookly-books', JSON.stringify(books))
}

function searchBooks(e) {
  let searchTerm = e.target.value.toLowerCase();
  var filteredBooks = books.filter(value => value.toLowerCase().includes(searchTerm));
  displayBook(filteredBooks, ulElement)
}

function hideAllBooks() {
  hideAllElm.checked ?
    displayBook([], ulElement)
    :
    displayBook(books, ulElement);
}


hideAllElm.addEventListener('click', hideAllBooks)
searchInput.addEventListener('keydown', searchBooks);
ulElement.addEventListener('click', deleteBook);
addButton.addEventListener('click', addBook);
displayBook(books, ulElement);