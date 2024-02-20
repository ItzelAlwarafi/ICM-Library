

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
            });

            // Display books initially
            const groupContainer = document.getElementById('booksContainer')
            books.forEach(book => {
                // Creating HTML elements
                const bookDiv = document.createElement('div')
                const image = document.createElement('img')
                const title = document.createElement('ul')
                
                
                // Assigning data to the HTML elements
                title.textContent = ` ${book.title}`
                image.src = book.img;
               

                // Append HTML elements to the container
                bookDiv.appendChild(title)
                bookDiv.appendChild(image)
                
                

                // Append the book container to the group container
                bookDiv.classList.add('book') // Add a class for styling
                groupContainer.appendChild(bookDiv)
             

                
                book.element = bookDiv
                title.id = 'title'
              
                
            });

            // Function to filter books based on search query
            function filterBooks(searchQuery) {
                books.forEach(book => {
                    const isVisible = book.title.toLowerCase().includes(searchQuery)
                    book.element.style.display = isVisible ? 'block' : 'none'
                })
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});



const nameBox  = document.getElementById('nameBox')
const phoneBox =document.getElementById('phoneNumBox')
const emailBox =document.getElementById("emailBox")
const submitButton =document.getElementById('createMemberbtn')

submitButton.addEventListener('click', async()=>{
    const  name=nameBox.value.toLowerCase()
    const  phone_number=phoneBox.value.toLowerCase()
    const  email=emailBox.value.toLowerCase()
   

    let data={
        name,
        phone_number,
        email,
       
    }

    let response= await axios.post('http://localhost:3001/client', data )
    console.log(response)


})


