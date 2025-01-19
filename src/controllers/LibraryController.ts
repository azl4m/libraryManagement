import { PhysicalBook, EBook } from "../models/Book";
import { Request, Response } from "express";
class LibraryController {
  private books: (PhysicalBook | EBook)[] = [];

  addBook(book: PhysicalBook | EBook): void {
    this.books.push(book);
  }

  getAllBooks(): object[] {
    return this.books.map((book) => book.getDetails());
  }

  borrowBook(title: string): { message: string; success: boolean } {
    const book = this.books.find((b) => b.getDetails().title === title);
    if (book) {
      if (!book.getDetails().isBorrowed) {
        book.borrow();
        return { message: `${title} has been successfully borrowed.`, success: true };
      }
      return { message: `${title} is already borrowed. Please try later.`, success: false };
    }
    return { message: `${title} not found in the library.`, success: false };
  }

  returnBook(title: string): {message:string;success:boolean} {
    const book = this.books.find((b) => b.getDetails().title === title);
    if (book && book.returnBook()) {
      return {message:`${title} has been returned`,success:true};
    }
    return {message:`${title} is not borrowed`,success:false};
  }
  public renderHomePage = (req: Request, res: Response): void => {

    const booksarray = this.books;

    const books = booksarray.map((book) => {
      const title = book.getDetails().title;
      const author = book.getDetails().author;
      const type = book.getDetails().type;
      const isBorrowed =book.getDetails().isBorrowed
      return {
        title,
        author,
        type,
        isBorrowed
      };
    }) 
    res.render("home", { books: books });
  };
  public renderAddBookPage = (req: Request, res: Response): void => {
    res.render("add-book");
  };

  public postAddBook = (req: Request, res: Response): void => {
    const { title, author, type, fileSizeMB, pages } = req.body;
    console.log(title,author,type,fileSizeMB,pages);
    
    try {
      if (!title || !author || !type) {
        throw new Error("Title, author, and type are required fields.");
      }
      if (type === "Ebook") {
        if (!fileSizeMB) {
          throw new Error("File size is required for EBooks.");
        }
        const newEBook = new EBook(title, author, parseFloat(fileSizeMB));
        this.addBook(newEBook);
        console.log("new book")
        console.log(newEBook);
        
        
      } else if (type === "Physical") {
        if (!pages) {
          throw new Error("Pages are required for Physical Books.");
        }
        const newPhysicalBook = new PhysicalBook(title, author, parseInt(pages, 10));
        this.addBook(newPhysicalBook);
        console.log("new book")
        console.log(newPhysicalBook);
      } else {
        throw new Error("Invalid book type.");
      }
      console.log("books :"+this.books);
      
      // Redirect or render a success page
      res.status(200).json({redirectUrl:"/"}); // Assuming the home page displays the list of books
    } catch (error) {
      // Render the add book page with an error message
      res.render("add-book", { error: error.message });
    }
  };
  public postBorrowBook=(req:Request,res:Response):void =>{
    try {
        const { title } = req.body;
        const result = this.borrowBook(title)
        res.json(result)
    } catch (error) {
        console.log(error.message);
        
    }
  }
  public postReturnBook = (req:Request,res:Response):void =>{
    try {
        const { title } = req.body;
        const result = libraryController.returnBook(title);
        res.json(result);
    } catch (error) {
        
    }
  }
  
}
const libraryController = new LibraryController()
export default libraryController;
