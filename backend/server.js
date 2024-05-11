const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy database to store tasks
let tasks = [];

// Counters for API calls
let addCounter = 0;
let updateCounter = 0;

// API endpoint to add a task
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    tasks.push(task);
    addCounter++; // Increment addCounter
    return res.status(201).json({ message: 'Task added successfully', task, addCounter });
});

// API endpoint to update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    if (!tasks[id]) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[id] = task;
    updateCounter++; // Increment updateCounter
    return res.status(200).json({ message: 'Task updated successfully', task, updateCounter });
});

// API endpoint to get all tasks
app.get('/tasks', (req, res) => {
    return res.status(200).json({ tasks });
});

// API endpoint to get the count of API calls
app.get('/counters', (req, res) => {
    return res.status(200).json({ addCounter, updateCounter });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
