
const booksContainer = document.getElementById('dataContainer')
const addBookBtn = document.getElementById('addBook')
const addbookform = document.getElementById('addbookform')
const summitBookBtn = document.getElementById('Addbookbtn')
const searchBookBtn = document.getElementById('#searchBooklink')

const titlebox = document.getElementById('titlebox')
const authorbox = document.getElementById('authorbox')
const publisherbox = document.getElementById('publisherbox')
const imagebox = document.getElementById('imagebox')
const qtybox = document.getElementById('Quantitybox')


addBookBtn.addEventListener('click',async () => {
    addbookform.style.display = "flex"
    deleteBookform.style.display = 'none'
    groupContainer.style.display ='none'
})






summitBookBtn.addEventListener('click', async () => {
   try{
    
    const title = titlebox.value.toLowerCase()
    const author = authorbox.value
    const publisher = publisherbox.value.toLowerCase()
    const quantity = qtybox.value
    const img = imagebox.value.toLowerCase()

console.log(author)
    const authorResponse = await axios.get(`http://localhost:3001/authors/${author}`)
    const authroData = authorResponse.data
 
console.log(authroData)

if (authroData.length >0){
    const authorId = authroData[0]._id
    console.log(authorId)

    const data = JSON.stringify( {
        title,
        author:authorId, 
        publisher,
        quantity,
        img
    })

    const response = await axios.post('http://localhost:3001/books', data,{headers:{"Content-Type" : "application/json"}})
    console.log(response.data)
    clearInputs()
}else {
    const name = author

    const data = JSON.stringify({
   
        name
    })

    const response = await axios.post('http://localhost:3001/authors', data,{headers:{"Content-Type" : "application/json"}})

    console.log(response.data)

    const responsebooks = await axios.post('http://localhost:3001/books', data,{headers:{"Content-Type" : "application/json"}})

    console.log(responsebooks.data)
    clearInputs()

}


  } catch (error) {
        console.error(error.response.data) 
      }

    })

    function clearInputs() {
        titlebox.value = ''
        authorbox.value = ''
        publisherbox.value = ''
        imagebox.value = ''
        qtybox.value = ''
    }

/* search / delete book */

const deleteBookBtn = document.getElementById('deleteBook')
const deleteBookform = document.getElementById('deleteBookform')

deleteBookBtn.addEventListener('click', async () =>{
    addbookform.style.display = "none"
    deleteBookform.style.display = 'flex'

})


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

        const searchbox = document.getElementById('searchBar')

        searchbox.addEventListener('input', e => {
            const searchQuery = e.target.value.trim().toLowerCase()
            filterBooks(searchQuery)
        })

            const groupContainer = document.getElementById('dataContainer')
            books.forEach(book => {
                // Creating HTML elements
                const bookDiv = document.createElement('div')
                const title = document.createElement('ul')
                const author = document.createElement('ul')
                const publisher = document.createElement('ul')
                const image = document.createElement('img')
                const delbtn = document.createElement('button')
                delbtn.innerText ='Delete'

                // Assigning data to the HTML elements
                title.textContent = ` ${book.title}`
                author.textContent = `Author: ${authorsData.find(author => author._id === book.author)?.name || 'Unknown'}`
                publisher.textContent = `Publisher : ${book.publisher}`
                image.src = book.img

                // Append HTML elements to the container
                bookDiv.appendChild(title)
                bookDiv.appendChild(author)
                bookDiv.appendChild(publisher)
                bookDiv.appendChild(image)
                bookDiv.appendChild(delbtn)
                // Append the book container to the group container
                bookDiv.classList.add('book') // Use a class for styling
                groupContainer.appendChild(bookDiv)

                bookDiv.id ='bookdiv'
                 image.id = 'img'
                title.id = 'title'
                delbtn.id = 'delbtn'
                // Store a reference to the book element for easy access during search
                book.element = bookDiv

                delbtn.addEventListener('click', async () => {
                    const confirmation = window.confirm('Are you sure you want to delete this book?');
                    if (confirmation) {
                        const bookId = book._id
                        console.log(bookId)
                
                        try {
                            // Make a DELETE request to delete the book
                            const deleteResponse = await axios.delete(`http://localhost:3001/books/${bookId}`)
                            console.log(deleteResponse.data)
                
                            
                            bookDiv.remove()
                        } catch (error) {
                            console.error(error.response.data)
                        }
                    } else {
                        console.log('Book deletion canceled.')
                    }
                });
                
                
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


    
