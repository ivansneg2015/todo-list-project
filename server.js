const express = require('express');
const app = express();
const port = 3000;

let tasks = [];

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/tasks', (req, res) => {
    let filteredTasks = tasks;
    const filter = req.query.filter;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    res.json(filteredTasks);
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        res.status(200).json(tasks[index]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.delete('/tasks', (req, res) => {
    tasks = []; // Удалить все задачи
    res.status(204).end();
});
