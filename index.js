const {initializeDatabase} = require("./db/db.connect")
const Books = require("./models/books.models")
require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
initializeDatabase()

app.get("/", (req, res) => {
  res.send("Hello, Express Server")
})

async function createBook(newBook){
  try{

    const book = new Books(newBook)
    const saveBook = await book.save()
    console.log(saveBook)
    return(saveBook)
  }catch(error){
    throw error
  }
}

app.post("/books", async (req, res) => {
  try{
    const savedBook = await createBook(req.body)
    res.status(200).json({messgae: "Book added successfully."})
  }catch(error){
    res.status(500).json({error: "Failed to add book."})
  }
})

async function readAllBooks(){
  try{
    const allBooks = await Books.find()
    console.log(allBooks)
    return(allBooks)
  }catch(error){
    throw error
  }
}

app.get("/books", async (req, res) => {
  try{
    const books = await readAllBooks()
    if(books.length != 0){
      res.json(books)
    }else{
      res.status(404).json({error: "Books not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch books."})
  }
})

async function readBookByTitle(bookTitle){
  try{
    const booksByTitle = await Books.find({title: bookTitle})
    return(booksByTitle)
  }catch(error){
    throw error
  }
}

app.get("/books/:title", async (req, res) => {
  try{
    const book = await readBookByTitle(req.params.title)
    if(book){
      res.json(book)
    }else{
      res.status(404).json({error: "Book not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch books."})
  }
} )

async function readBooksByAuthor(bookAuthor){
  try{
    const booksByAuthor = await Books.find({author : bookAuthor})
    return(booksByAuthor)
  }catch(error){
    throw error
  }
}

app.get("/books/author/:bookAuthor" , async (req, res) => {
  try{
    const books = await readBooksByAuthor(req.params.bookAuthor)
    if(books.length != 0){
      res.json(books)
    }else{
      res.status(404).json({error: "Books not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch movies."})
  }
})

async function readBooksByGenre(bookGenre){
  try{
    const booksByGenre = await Books.find({genre: bookGenre})
    return(booksByGenre)
  }catch(error){
    throw error
  }
}

app.get("/books/genre/:bookGenre" , async (req, res) => {
  try{
    const books = await readBooksByGenre(req.params.bookGenre)
    if(books.length != 0){
      res.json(books)
    }else{
      res.status(404).json({error: "Books not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch books."})
  }
})

async function readBooksByYear(bookYear){
  try{
    const booksByYear = await Books.find({publishedYear: bookYear})
    return(booksByYear)
  }catch(error){
    throw error
  }
}

app.get("/books/year/:bookYear", async (req, res) => {
  try{
    const books = await readBooksByYear(req.params.bookYear)
    if(books.length !=0){
      res.json(books)
    }else{
      res.status(404).json({error: "Books not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to fetch books."})
  }
})

async function updateBookById(bookId, dataToUpdate){
  try{
    const updateBook = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
    return(updateBook)
  }catch(error){
    throw error
  }
}

app.post("/books/:bookId", async (req, res) => {
  try{
    const updatedBook = await updateBookById(req.params.bookId , req.body)
    if(updatedBook){
      res.status(200).json({message : "Book updated successfully." , book : updatedBook})
    }else{
      res.status(404).json({error: "Book not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to update book."})
  }
})

async function updateBookByTitle(bookTitle, dataToUpdate){
  try{
    const updateBook = await Books.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new : true})
    console.log(updateBook)
    return(updateBook)
  }catch(error){
   throw error
  }
}


app.post("/books/title/:bookTitle" , async (req, res) => {
  try{
    const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body)
    if(updatedBook){
      res.status(200).json({message: "Book updated successfully.", book: updatedBook})
    }else{
      res.status(404).json({error: "Book not found."})
    }
  }catch(error){
    res.status(500).json({error: "Failed to update book."})
  }
})

async function deleteBookById(bookId){
  try{
    const deleteBook = await Books.findByIdAndDelete(bookId)
    return(deleteBook)
  }catch(error){
    throw error
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try{
      const deletedBook = await deleteBookById(req.params.bookId)
      if(deletedBook){
        res.status(200).json({message: "Book deleted successfully.", book: deletedBook})
      }else{
      res.status(404).json({error: "Book not found."})
    }
  }catch{
    res.status(500).json({error: "Failed to delete book."})
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
