
const NewMemberCont = document.getElementById('CreateNewMemberContainer')
const createMembBtn =document.querySelector('#createMembbtn')
const searMembBtn =document.querySelector('#searchMember')
const bookElements = document.querySelector('#booksContainer')



createMembBtn.addEventListener('click', async (event) => {
event.preventDefault()
console.log('hello')
NewMemberCont.style.display ='flex'
bookElements.style.display ='none'
CreateNewMember()

})
searMembBtn.addEventListener('click', async (event) =>{
    event.preventDefault()
    console.log('hello')
    NewMemberCont.style.display ='none'
    bookElements.style.display ='flex'
    getBorrowedBooks ()
})



function CreateNewMember(){
  

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
}


function getBorrowedBooks (){
    fetch('http://localhost:3001/borrowed')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(borrowedBooks => {
      console.log('Borrowed books fetched:', borrowedBooks)
  
      borrowedBooks.forEach(borrowedBook => {
        const memberId = borrowedBook.member
  
        fetch(`http://localhost:3001/clients`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then(fetchMembers => {
            const member = fetchMembers.find(member => member._id === memberId)
            console.log('Member:', member)
  
            const bookIds = borrowedBook.books_borrowed
  
            fetch(`http://localhost:3001/books`)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok')
                }
                return response.json()
              })
              .then(fetchBooks => {
                const books = fetchBooks.filter(book => bookIds.includes(book._id))
                console.log('Books:', books)
  
                const searchInput = document.querySelector('#searchBar')
                searchInput.addEventListener('input', e => {
                  const searchQuery = e.target.value.trim().toLowerCase()
                  filterBooks(books, member, searchQuery)
                })
  
                books.forEach(book => {
                  const bookElement = document.createElement('div')
                  bookElement.classList.add('book')
                  bookElement.id = book._id
  
                  const title = document.createElement('h2')
                  title.textContent = book.title
                  title.id = "title"
  
                  const imagediv = document.createElement('div')
                  imagediv.id = 'bookpic'
  
                  const img = document.createElement('img')
                  img.src = book.img
                  img.id = 'img'
  
                  const infodiv = document.createElement('div')
                  infodiv.id = 'bookinfo'
  
                  const memberName = document.createElement('p')
                  memberName.textContent = `Member Name: ${member.name}`
  
                  const phoneNumber = document.createElement('p')
                  phoneNumber.textContent = `Phone Number: ${member.phone}`
  
                  const email = document.createElement('p')
                  email.textContent = `Email: ${member.email}`
  
                  const checkOutDate = document.createElement('p')
                  checkOutDate.textContent = `Check-Out Date: ${borrowedBook.date_loanOut}`
  
                  const returnDate = document.createElement('p')
                  returnDate.textContent = `Return Date: ${borrowedBook.date_return}`
  
            
                  infodiv.appendChild(title)
                  infodiv.appendChild(memberName)
                  infodiv.appendChild(phoneNumber)
                  infodiv.appendChild(email)
                  infodiv.appendChild(checkOutDate)
                  infodiv.appendChild(returnDate)
                  imagediv.appendChild(img)
                  bookElement.appendChild(infodiv)
                  bookElement.appendChild(imagediv)
                  bookElements.appendChild(bookElement)
                });
              })
              .catch(error => {
                console.error('Error fetching or processing books:', error)
              });
          })
          .catch(error => {
            console.error('Error fetching or processing members:', error)
          });
      });
    })
    .catch(error => {
      console.error('Error fetching or processing borrowed books:', error)
    });
  
  function filterBooks(books, member, searchQuery) {
    books.forEach(book => {
      const isVisible = member.name.toLowerCase().includes(searchQuery)
      const bookElement = document.getElementById(book._id)
      bookElement.style.display = isVisible ? 'block' : 'none'
    })
  }
  

}
