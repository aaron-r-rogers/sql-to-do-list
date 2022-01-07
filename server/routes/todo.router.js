const express = require('express');
const toDoRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const pool = new pg.Pool({
    database: 'weekend-sql-to-do-list',
    host: 'localhost',
    port: 5432,
});

//TODO

// GET tasks endpoint
// queryText SELECTs from db
// results.rows is all data (array of objects)

// POST tasks endpoint
// data from client becomes req.body
// INSERT req.body (object) to db
// use queryText

// DELETE tasks endpoint
// use /:id to tag row to DELETE from db

module.exports = toDoRouter;