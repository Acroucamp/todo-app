import database from '../database/database.js'

const getAllTodos = (req, res) => {
    const sql = `SELECT * FROM todo ORDER BY todo_title`
    const params = []
    database.serialize(() => {
        database.all(sql, params, (error, rows) => {
            if (error) {
                res.status(400).json({ 'error': error.message })
                return
            }
            res.status(200).json(rows)
        })
    })
}

const getTodo = (req, res) => {
    const params = [req.params.id]
    database.serialize(() => {
        database.get(`SELECT * FROM todo WHERE todo_id = ?`, params, (error, row) => {
            if (error) {
                res.status(400).json({ 'error': error.message })
                return
            }
            res.status(200).json(row)
        })
    })
}

const createTodo = async(req, res) => {
    res.json({ message: 'CREATE todo' })
}

const updateTodo = (req, res) => {
    res.json({ message: 'UPDATE todo' })
}

const deleteTodo = (req, res) => {
    res.json({ message: 'DELETE todo' })
}

export default {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}