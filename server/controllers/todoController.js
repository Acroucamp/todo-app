import db from '../database/database.js'

const getAllTodos = async (req, res) => {
    const sql = 'SELECT * FROM todo'
    const params = []

    db.all(sql, params, (error, rows) => {
        if (error) {
            res.status(400).json({
                'error': error.message
            })
            return
        }
        res.status(200).json({
            'message': 'success',
            'data': rows
        })
    })
}

const getTodo = (req, res) => {
    const sql = 'SELECT * FROM todo WHERE todo_id = ?'
    const params = [req.params.id]

    db.get(sql, params, (error, row) => {
        if (error) {
            res.status(400).json({
                'error': error.message
            })
            return
        }
        res.status(200).json({
            'message': 'success',
            'data': row
        })
    })
}

const createTodo = (req, res) => {
    const errors = []

    if (!req.body.todo_title) {
        errors.push('No title specified!')
    }
    if (!req.body.todo_description) {
        errors.push('No description specified!')
    }
    if (errors.length) {
        res.status(400).json({
            'error': errors.join(', ')
        })
        return
    }

    const data = {
        todo_title: req.body.todo_title,
        todo_description: req.body.todo_description,
        todo_reminder: req.body.todo_reminder
    }

    const sql = 'INSERT INTO todo (todo_title, todo_description, todo_reminder) VALUES (?,?,?)'
    const params = [data.todo_title, data.todo_description, data.todo_reminder]
    db.run(sql, params, (error, result) => {
        if (error) {
            res.status(400).json({
                'error': error.message
            })
            return
        }
        res.status(200).json({
            'message': 'success',
            'data': data,
        })
    })
}

const updateTodo = (req, res) => {
    const data = {
        todo_title: req.body.todo_title,
        todo_description: req.body.todo_description,
        todo_reminder: req.body.todo_reminder
    }

    db.run(`
        UPDATE todo SET
            todo_title = COALESCE(?, todo_title),
            todo_description = COALESCE(?, todo_description),
            todo_reminder = COALESCE(?, todo_reminder)
            WHERE todo_id = ?
    `,
    [data.todo_title, data.todo_description, data.todo_reminder, req.params.id],
    (error, result) => {
        if (error) {
            res.status(400).json({
                'error': error.message
            })
            return
        }
        res.status(200).json({
            'message': 'success',
            data: data
        })
    })
}

const deleteTodo = (req, res) => {
    db.run('DELETE FROM todo  WHERE todo_id = ?', req.params.id, (error, result) => {
        if (error) {
            res.status(400).json({
                'error': error.message
            })
            return
        }
        res.status(200).json({
            'message': 'deleted'
        })
    })
}

export default {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}