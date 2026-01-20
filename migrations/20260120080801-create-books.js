"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db, callback) {
  await db.createTable(
    "books",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      book_name: { type: "string", length: 150, notNull: true },
      description: { type: "string", length: "max", notNull: true },
      author: { type: "string", length: 150, notNull: true },
      published_date: { type: "date", notNull: true },
    },
    callback,
  );

  await db.addIndex("books", "UQ_book_name_author", ["book_name", "author"], {
    unique: true,
  });
};

exports.down = async function (db) {
  await db.removeIndex("books", "UQ_book_name_author");
  await db.dropTable("books");
};

exports._meta = {
  version: 1,
};
