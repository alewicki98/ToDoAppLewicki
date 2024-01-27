const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Przyk³adowe zadanie 1' },
    { id: 2, title: 'Przyk³adowe zadanie 2' },
];

// Endpoint do pobrania listy zadañ
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
    res.json({ message: 'Zadanie usuniête pomyœlnie' });
});

// Endpoint do oznaczania zadania jako zakoñczone
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: true };
        }
        return task;
    });
    res.json({ message: 'Zadanie oznaczone jako zakoñczone pomyœlnie' });
});

app.listen(port, () => {
    console.log(`Serwer nas³uchuje na porcie ${port}`);
});
