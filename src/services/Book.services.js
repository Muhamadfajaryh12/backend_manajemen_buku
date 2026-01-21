const { pool } = require("../config/db");
const NotFoundError = require("../exceptions/NotFoundError");

class Book {
  async InsertBook(body) {
    const { book_name, description, author, published_date } = body;
    const query = `INSERT INTO books (book_name,description,author,published_date) VALUES ('${book_name}',
      '${description}',
      '${author}',
      '${published_date}')`;
    try {
      const result = await pool.request().query(query);
      return {
        id: result.recordset[0].id,
        book_name,
        description,
        author,
        published_date,
      };
    } catch (error) {
      if (error.number == 2627 || error.number == 2601) {
        throw new Error("Nama buku dan Penulis sudah tersedia!");
      }
    }
  }

  async GetBook({ keyword = "", page = 1, limit = 4 }) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 4;
    const offset = (page - 1) * limit;
    const queryGet = `SELECT * FROM books 
    WHERE book_name LIKE '%${keyword}%' OR description LIKE '%${keyword}%' 
    ORDER BY id
    OFFSET ${offset} ROWS
    FETCH NEXT ${limit} ROWS ONLY 
    `;
    const queryTotal = `SELECT COUNT(*) as total FROM books WHERE book_name LIKE '%${keyword}%' OR description LIKE '%${keyword}%'`;
    const [getBook, getTotal] = await Promise.all([
      pool.request().query(queryGet),
      pool.request().query(queryTotal),
    ]);

    return {
      data: getBook.recordset,
      total_page: Math.ceil(getTotal.recordset[0].total / limit),
    };
  }

  async getDetailBook(id) {
    const queryGet = `SELECT * FROM books WHERE id = ${id}`;
    const getBook = await pool.request().query(queryGet);
    if (getBook.rowsAffected == 0) {
      throw new NotFoundError("Buku tidak ditemukan");
    }
    return getBook.recordset[0];
  }

  async updateBook(id, body) {
    const queryGet = `SELECT * FROM books WHERE id = ${id}`;
    const getBook = await pool.request().query(queryGet);
    if (getBook.rowsAffected == 0) {
      throw new NotFoundError("Buku tidak ditemukan");
    }

    const queryUpdate = `UPDATE books SET description = '${body.description}' WHERE
    id = ${id}`;

    await pool.request().query(queryUpdate);
    return {
      ...getBook.recordset[0],
      description: body.description,
    };
  }

  async DeleteBook(id) {
    const queryGet = `SELECT * FROM books WHERE id = ${id}`;
    const getBook = await pool.request().query(queryGet);
    if (getBook.rowsAffected == 0) {
      throw new NotFoundError("Buku tidak ditemukan");
    }
    const queryDelete = `DELETE from books WHERE id = ${id} `;
    await pool.request().query(queryDelete);

    return getBook.recordset[0];
  }
}

module.exports = new Book();
