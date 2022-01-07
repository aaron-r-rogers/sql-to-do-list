CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(60) not null,
    "description" varchar(255),
    "deadline" date,
    "complete" bit
);
INSERT INTO "tasks" 
	("id", "title", "description", "deadline", "complete") 
VALUES
    (DEFAULT, 'Something', 'going to do some stuff', '2022-02-01', '0');