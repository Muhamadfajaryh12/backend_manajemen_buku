const Response = require("../utils/Response");
const Book = require("../services/Book.services");
const BookServices = require("../services/Book.services");

class BookHandler {
  async InsertBookHandler(req, res, next) {
    try {
      const result = await Book.InsertBook(req.body);
      return Response({
        res: res,
        success: true,
        message: "Berhasil Menambahkan Buku",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async GetBookHandler(req, res, next) {
    try {
      let result;
      const keyword = req.query.search;
      const limit = req.query.limit;
      const page = req.query.page;
      result = await BookServices.GetBook({
        keyword: keyword,
        page: page,
        limit: limit,
      });

      return Response({
        res: res,
        success: true,
        message: "Berhasil fetch Buku",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async GetDetailBookHandler(req, res, next) {
    try {
      const { id } = req.params;
      const result = await BookServices.getDetailBook(id);
      return Response({
        res: res,
        success: true,
        message: "Berhasil fetch Buku",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  async UpdateBookHandler(req, res, next) {
    try {
      const { id } = req.params;
      const result = await BookServices.updateBook(id, req.body);
      return Response({
        res: res,
        message: "Berhasil Mengedit Buku",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async DeleteBookHandler(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Book.DeleteBook(id);
      return Response({
        res: res,
        success: true,
        message: "Berhasil Menghapus Buku",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new BookHandler();
