import {Router} from 'express';
import libraryController from '../controllers/LibraryController';
import { PhysicalBook,EBook } from '../models/Book';

// Create an instance of the LibraryController


const router = Router()

router.get("/",libraryController.renderHomePage)
router.get("/addBook",libraryController.renderAddBookPage)
router.post("/addBook",libraryController.postAddBook)
router.post("/borrow",libraryController.postBorrowBook)
router.post("/return",libraryController.postReturnBook)

export default router