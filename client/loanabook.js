
const borrowBookForm = document.getElementById('borrowBookForm')
const addbookform = document.getElementById('addbookform')
const groupContainer = document.getElementById('dataContainer')
const searchbox = document.getElementById('searchBar')

const searchmenubtn = document.getElementById('searchbtn')
const addBookmenubtn = document.getElementById('addBook')
const loanBookmenubtn = document.getElementById('loanBook')
const contentBox =document.getElementById('contentBox')



searchmenubtn.addEventListener('click', async (event) =>{
   event.preventDefault()
   groupContainer.style.display ='flex'
   searchbox .style.display = 'flex'
   addbookform .style.display = 'none'
   
   borrowBookForm.style.display = 'none'
  console.log('hello')
  getData()
   
})

addBookmenubtn.addEventListener('click', async ( event) =>{
    event.preventDefault()
    addbookform .style.display = 'flex'
    groupContainer.style.display ='none'
    searchbox.style.display = 'none'
    borrowBookForm.style.display ='none'
    addbook()
})

loanBookmenubtn.addEventListener('click', async (event) =>{
    event.preventDefault()
    borrowBookForm.style.display = 'flex'
    groupContainer.style.display ='none'
    searchbox.style.display = 'none'
    addbookform .style.display = 'none'
    loanbook ()
    
})

function loanbook () {
    console.log('hello')
    const memberNamebox = document.getElementById('memberNamebox')
    const bookbox = document.getElementById('bookbox')
    const dateLoanbox = document.getElementById('dateLoanbox')
    const dateReturnbox = document.getElementById('dateReturnbox')
    const borrowBtn = document.getElementById('borrowBtn')
    
    borrowBtn.addEventListener('click', async () => {
        try {
            const member = memberNamebox.value
            const title = bookbox.value
            const date_loanOut = dateLoanbox.value
            const date_return = dateReturnbox.value
    
            console.log('Member:', member)
            console.log('Title:', title)
    
            const memberResponse = await axios.get(`http://localhost:3001/clients/${member}`)
            console.log('Member Data:', memberResponse.data)
    
            const titleResponse = await axios.get(`http://localhost:3001/books/${title}`)
            console.log('Title Data:', titleResponse.data)
    
            const memberData = memberResponse.data
            const titleData = titleResponse.data
    
            if (memberData.length > 0 && titleData.length > 0) {
                const memberId = memberData[0]._id
                const titleId = titleData[0]._id
                
              console.log(titleId)
                const data = {
                    member: memberId,
                    books_borrowed: titleId,
                    date_loanOut,
                    date_return
                }
    
                const response = await axios.post('http://localhost:3001/borrowed', data)
                console.log('Post Response:', response.data)
                clearInputs()
            } else {
                console.log(window.alert('Member or Title not found.'))
                clearInputs()
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message)

        }
    })
    
}

function clearInputs() {
    memberNamebox .value = ''
    bookbox.value = ''
    dateLoanbox.value = ''
    dateReturnbox.value = ''
    borrowBtn.value = ''

}

function addbook (){
    const titlebox = document.getElementById('titlebox')
    const authorbox = document.getElementById('authorbox')
    const publisherbox = document.getElementById('publisherbox')
    const imagebox = document.getElementById('imagebox')
    const qtybox = document.getElementById('Quantitybox')
    const summitBookBtn = document.getElementById('Addbookbtn')
 

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
        
     }else {
         const name = author
     
         const data = JSON.stringify({
        
             name
         })
     
         const response = await axios.post('http://localhost:3001/authors', data,{headers:{"Content-Type" : "application/json"}})
     
         console.log(response.data)
     
         const responsebooks = await axios.post('http://localhost:3001/books', data,{headers:{"Content-Type" : "application/json"}})
     
         console.log(responsebooks.data)
        
     
     }

     clearInputs()
     
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
     


}


function getData(){
  
    const fetchBooks = fetch('http://localhost:3001/books')
    .then(response => response.json())
    console.log(fetchBooks)
    const fetchAuthors = fetch('http://localhost:3001/authors')
    .then(response => response.json())
    console.log(fetchAuthors)
    Promise.all([fetchBooks, fetchAuthors])
    .then(([booksData, authorsData]) => {
        // Store books data
        const books = booksData
  
        
     
  
        searchbox.addEventListener('input', e => {  
            const searchQuery = e.target.value.trim().toLowerCase()
            filterBooks(searchQuery)
        })
             
  
         
            books.forEach(book => {
                // Creating HTML elements
                const bookDiv = document.createElement('div')
                const title = document.createElement('ul')
                const author = document.createElement('ul')
                const publisher = document.createElement('ul')
                const image = document.createElement('img')
                const qty = document.createElement('ul')
                const LoanedOut =document.createElement('ul')
                const delbtn = document.createElement('button')
                delbtn.innerText ='Delete'
                  
                // Assigning data to the HTML elements
                title.textContent = ` ${book.title}`
                author.textContent = `Author: ${authorsData.find(author => author._id === book.author)?.name || 'Unknown'}`
                publisher.textContent = `Publisher : ${book.publisher}`
                qty.textContent = `In stock: ${book.quantity}`
                LoanedOut.textContent =`Loan Out: ${book.loanOut}`
                image.src = book.img
               
  
                // Append HTML elements to the container
                bookDiv.appendChild(title)
                bookDiv.appendChild(author)
                bookDiv.appendChild(publisher)
                bookDiv.appendChild(image)
                bookDiv.appendChild(qty)
                bookDiv.appendChild( LoanedOut)
                bookDiv.appendChild(delbtn)
                // Append the book container to the group container
                bookDiv.classList.add('book') // Use a class for styling
                groupContainer.appendChild(bookDiv)
  
                bookDiv.id ='bookdiv'
                 image.id = 'img'
                title.id = 'title'
                delbtn.id = 'delbtn'
                LoanedOut.id='LoanedOut'
                qty.id ='qty'

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
                    book.element.style.display = isVisible ? 'inline' : 'none'
                })
            }
  
            
        })
        .catch(error => {
            console.error('Error fetching data:', error)
        })
  
  
    
  
}



