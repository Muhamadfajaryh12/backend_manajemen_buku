const {
  InsertBookHandler,
  DeleteBookHandler,
  GetBookHandler,
  UpdateBookHandler,
  GetDetailBookHandler,
} = require("../handlers/Book.handlers");
const Validation = require("../middleware/Validation.middleware");
const {
  BookValidation,
  BookValidationPut,
} = require("../validation/Book.validation");

const router = require("express").Router();
router.get("/api/book", GetBookHandler);
router.get("/api/book/:id", GetDetailBookHandler);
router.put("/api/book/:id", Validation(BookValidationPut), UpdateBookHandler);
router.post("/api/book/", Validation(BookValidation), InsertBookHandler);
router.delete("/api/book/:id", DeleteBookHandler);
module.exports = router;
