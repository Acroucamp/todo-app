CREATE TABLE todo (
    todo_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    todo_title TEXT NOT NULL,
    todo_description TEXT NOT NULL,
    todo_reminder BOOLEAN NOT NULL
)

INSERT INTO todo (todo_id, todo_description, todo_reminder)
VALUES ('todo title', 'todo description' TRUE)