# To-Do List App

## Description

_Duration: 3 day sprint_

A common project when learning a new language, I built a simple app that creates and tracks a to-do list.  This the first app I have made that combines CRUD in its entirety, uses a RESTful architecture, and implements responsive design.

## Screenshot

![App in use:](https://github.com/aaron-r-rogers/weekend-sql-to-do-list/blob/master/server/public/images/screenshot.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Other dependencies can be viewed/installed via the accompanying .json files

## Installation

1. Create a database named `weekend-to-do-app`
2. The queries in the `tables.sql` file are set up to create all the tables and populate the data for the app to run properly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. Postico is recommended to run those queries as that was used to create the queries
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Open your browser and navigate to localhost:5000 to interact with the app

## Usage

1. To add a task, enter the information requested in the inputs.  Task and Deadline are required fields, and there are alerts when either of those fields is missing.  Details are optional.
2. Then click the add task button
3. The task will populate the "Task List" table, and the tasks will be ordered based on proximity to current date/time.
4. Tasks can be filtered by title using the search bar and deleted with the delete button.  Deleting triggers an alert to confirm the action.
5. The "Complete?" column holds buttons whose default is "No", but click that button when you want to mark the task complete.  A congratulatory alert will appear.
6. The text will change from "No" to the date.time that you marked it complete, and that task will move below the incomplete tasks.
7. If for some reason, the task needs to go from complete back to incomplete, clicking the button again, toggles it back to "No" and returns it to its time-ordered place.

## Built With

HTML, CSS, and JavaScript, with help from JQuery, Bootstrap, PostgreSQL, SweetAlert2, and Moment.js

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io), especially Edan and the Woodall Cohort, who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [rogers.aaron.r@mail.com](mailto:rogers.aaron.r@gmail.com)
