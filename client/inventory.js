document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the first route
    const fetchBooks = fetch('http://localhost:3001/books')
        .then(response => response.json());

    // Fetch data from the second route
    const fetchAuthors = fetch('http://localhost:3001/authors')
        .then(response => response.json());

    // Wait for both requests to resolve
    Promise.all([fetchBooks, fetchAuthors])
        .then(([booksData, authorsData]) => {
            // Process booksData and authorsData as needed
            const groupedData = [];
            while (booksData.length) {
                groupedData.push(booksData.splice(0, 4));
            }

            // Iterate over grouped data
            groupedData.forEach(group => {
                // Create container for each set of 5 books
                const groupContainer = document.createElement('div');
                groupContainer.classList.add('bookGroup'); // Add class for styling
               
                // Iterate over books in the group
                group.forEach(book => {
                    // Create HTML elements
                    const bookDiv = document.createElement('div');
                    const title = document.createElement('ul');
                    const author = document.createElement('ul');
                    const publisher = document.createElement('ul');
                    const imageDiv = document.createElement('div');
                    const image = document.createElement('img');
                    
                    // Assign data to the HTML elements
                    title.textContent = `Title: ${book.title}`;
                    // Assuming you have an array of authors for each book
                    author.textContent =`Author :${authorsData.find(author => author._id === book.author)?.name || 'Unknown'}`;
                    publisher.textContent = `Publisher : ${book.publisher}`;
                    image.src = book.img;

                    // Assign ID to the title paragraph
                    title.id = 'title';

                    // Append HTML elements to the container
                    bookDiv.appendChild(title);
                    bookDiv.appendChild(author);
                    bookDiv.appendChild(publisher);
                    imageDiv.appendChild(image);

                    // Append the book container to the group container
                    groupContainer.appendChild(bookDiv);
                    groupContainer.appendChild(imageDiv);
                });

                // Append the group container to the data container
                document.getElementById('dataContainer').appendChild(groupContainer);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


