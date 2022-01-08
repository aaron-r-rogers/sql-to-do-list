const express = require('express');
const toDoRouter = express.Router();
const pg = require('pg');

// DB CONNECTION
const pool = new pg.Pool({
	database: 'weekend-to-do-app',
	host: 'localhost',
	port: 5432
});

//TODO

// GET tasks endpoint
// queryText SELECTs from db
// results.rows is all data (array of objects)
// GET all tasks
toDoRouter.get('/', (req, res) => {
	let queryText = 'SELECT * FROM "tasks" ORDER BY "deadline" ASC;';
	pool
		.query(queryText)
		.then((result) => {
			// Sends back query results
			res.send(result.rows);
			console.log(result.rows);
		})
		.catch((error) => {
			console.log('error getting tasks', error);
			res.sendStatus(500);
		});
});
//End GET /tasks endpoint

// POST tasks endpoint
// data from client becomes req.body
// INSERT req.body (object) to db
// use queryText
toDoRouter.post('/', (req, res) => {
	let newTask = req.body;
	console.log(`Adding task`, newTask);

	let queryText = `INSERT INTO "tasks" ("title", "description", "deadline")
                    VALUES ($1, $2, $3);`;
	pool
		.query(queryText, [newTask.title, newTask.description, newTask.deadline])
		.then((result) => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(`Error adding new task`, error);
			res.sendStatus(500);
		});
});

// DELETE tasks endpoint
// use /:id to tag row to DELETE from db
// DELETE
toDoRouter.delete('/:id', (req, res) => {
    console.log(req.params)
    const queryText = `DELETE FROM tasks WHERE id = $1 `;
    let queryParams = [req.params.id];
    pool.query(queryText, queryParams).then((dbRes) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log('DELETE failed:', err);
    })
});

module.exports = toDoRouter;
