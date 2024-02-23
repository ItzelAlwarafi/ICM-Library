
fetch('http://localhost:3001/books')
  .then(response => {

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(books => {
    console.log('Books fetched:', books) // Log the fetched books

    // Ensure all quantities are valid numbers used Chat GPT this 
    const validBooks = books.filter(book => typeof book.quantity === 'number')

    // Sum up the 'quantity' property of each book
    const totalBooksInStock = validBooks.reduce((total, book) => total + book.quantity, 0)
     // Display the total number of books in stock on the HTML element
    document.getElementById('bookInStock').innerText = totalBooksInStock
   
    console.log('Total number of books in stock:', totalBooksInStock)

  })
  .catch(error => {
    console.error('Error fetching or processing books:', error)
  })



    fetch('http://localhost:3001/borrowed')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(borrowedBooks => {
      console.log('Borrowed books fetched:', borrowedBooks); // Log the fetched borrowed books
      
      // Initialize a variable to store the total number of borrowed books
      let totalBorrowedBooks = 0;
    
      // Iterate over each borrowed book
      borrowedBooks.forEach(loan => {
        // Add the number of books borrowed in this loan to the total count
        totalBorrowedBooks += loan.books_borrowed.length;
      });
    
      // Display the total number of borrowed books
      console.log('Total number of borrowed books:', totalBorrowedBooks);

      document.getElementById('bookborrowed').innerText = totalBorrowedBooks
    })
    .catch(error => {
      console.error('Error fetching or processing borrowed books:', error);
    });
    
    
    
    