document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the first route
    const fetchBooks = fetch('http://localhost:3001/books')
        .then(response => response.json())

    // Fetch data from the second route
    const fetchAuthors = fetch('http://localhost:3001/authors')
        .then(response => response.json())

    // Wait for both requests to resolve
    Promise.all([fetchBooks, fetchAuthors])
        .then(([booksData, authorsData]) => {
            // Store books data
            const books = booksData

            // Add event listener for search input
            const searchInput = document.querySelector('#searchBar')
            searchInput.addEventListener('input', e => {
                const searchQuery = e.target.value.trim().toLowerCase()
                filterBooks(searchQuery)
            })

            // Display books initially
            const groupContainer = document.getElementById('dataContainer')
            books.forEach(book => {
                // Creating HTML elements
                const bookDiv = document.createElement('div')
                const title = document.createElement('ul')
                const author = document.createElement('ul')
                const publisher = document.createElement('ul')
                const image = document.createElement('img')

                // Assigning data to the HTML elements
                title.textContent = `Title: ${book.title}`
                author.textContent = `Author: ${authorsData.find(author => author._id === book.author)?.name || 'Unknown'}`
                publisher.textContent = `Publisher: ${book.publisher}`
                image.src = book.img

                // Append HTML elements to the container
                bookDiv.appendChild(title)
                bookDiv.appendChild(author)
                bookDiv.appendChild(publisher)
                bookDiv.appendChild(image)

                // Append the book container to the group container
                bookDiv.classList.add('book') // Use a class for styling
                groupContainer.appendChild(bookDiv)
                bookDiv.id ='bookdiv'
             image.id = 'img'
                title.id = 'title'
                // Store a reference to the book element for easy access during search
                book.element = bookDiv
            });

            // Function to filter books based on search query
            function filterBooks(searchQuery) {
                books.forEach(book => {
                    const isVisible = book.title.toLowerCase().includes(searchQuery) ||
                        authorsData.find(author => author._id === book.author)?.name.toLowerCase().includes(searchQuery)
                    book.element.style.display = isVisible ? 'inline-block' : 'none'
                })
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })
})
