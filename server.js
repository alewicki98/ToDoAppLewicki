const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Przykładowe zadanie 1' },
    { id: 2, title: 'Przykładowe zadanie 2' },
];

// Endpoint do pobrania listy zadań
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint do dodawania nowego zadania
app.post('/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, title: req.body.title };
    tasks.push(newTask);
    res.json(newTask);
});

// Endpoint do usuwania zadania
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Zadanie usunięte pomyślnie' });
});

// Endpoint do oznaczania zadania jako zakończone
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: true };
        }
        return task;
    });
    res.json({ message: 'Zadanie oznaczone jako zakończone pomyślnie' });
});

app.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});
