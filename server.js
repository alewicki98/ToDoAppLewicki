const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [
    { id: 1, title: 'Przyk�adowe zadanie 1' },
    { id: 2, title: 'Przyk�adowe zadanie 2' },
];

// Endpoint do pobrania listy zada�
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
    res.json({ message: 'Zadanie usuni�te pomy�lnie' });
});

// Endpoint do oznaczania zadania jako zako�czone
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: true };
        }
        return task;
    });
    res.json({ message: 'Zadanie oznaczone jako zako�czone pomy�lnie' });
});

app.listen(port, () => {
    console.log(`Serwer nas�uchuje na porcie ${port}`);
});
