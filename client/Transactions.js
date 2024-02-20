

const addBookBtn = document.getElementById('addBook')
const addbookform = document.getElementById('addbookform')
const summitBookBtn = document.getElementById('Addbookbtn')

const titlebox = document.getElementById('titlebox')
const authorbox = document.getElementById('authorbox')
const publisherbox = document.getElementById('publisherbox')
const imagebox = document.getElementById('imagebox')



summitBookBtn.addEventListener('click', async () => {
   try{
    
    const title = titlebox.value.toLowerCase()
    const author = authorbox.value
    const publisher = publisherbox.value.toLowerCase()
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


  } catch (error) {
        console.error(error.response.data) 
      }

    })

  
