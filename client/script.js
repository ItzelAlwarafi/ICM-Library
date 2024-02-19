
console.log('hello')

document.addEventListener('DOMContentLoaded',async () => {
    console.log('loaded')
    try{
    const response = axios.get('http://localhost:3001/books')
    console.log(response)
} catch (error) {
    console.log(error)
    }
    
})
