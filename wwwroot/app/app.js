// app.js
document.addEventListener('DOMContentLoaded', function () {
    // Przypisanie obs�ugi zdarzenia po za�adowaniu strony
    document.getElementById('addTaskButton').addEventListener('click', addTask);

    // Przyk�ad renderowania istniej�cych zada� przy za�adowaniu strony
    refreshTaskList();
});

async function refreshTaskList() {
    const taskContainer = document.getElementById('tasks-container');
    taskContainer.innerHTML = ''; // Wyczy�� istniej�ce zadania

    try {
        // Wykorzystaj fetch do pobrania listy zada� z serwera
        const response = await fetch('/tasks');

        // Sprawd�, czy status odpowiedzi jest OK (200)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const tasks = await response.json();

        // Renderuj ka�de zadanie
        tasks.forEach(task => renderTask(task));
    } catch (error) {
        console.error('B��d podczas pobierania listy zada�:', error);
    }
}


function renderTask(task) {
    const taskContainer = document.getElementById('tasks-container');

    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskText = document.createElement('span');
    taskText.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usu�';
    deleteButton.onclick = () => deleteTask(task.id);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Zako�cz';
    completeButton.onclick = () => completeTask(task.id);

    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteButton);
    taskElement.appendChild(completeButton);

    taskContainer.appendChild(taskElement);
}

// Funkcja do usuwania zadania
async function deleteTask(id) {
    try {
        await fetch(`/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        refreshTaskList();
    } catch (error) {
        console.error('B��d podczas usuwania zadania:', error);
    }
}

// Funkcja do oznaczania zadania jako zako�czone
async function completeTask(id) {
    try {
        await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: true }),
        });

        refreshTaskList();
    } catch (error) {
        console.error('B��d podczas oznaczania zadania jako zako�czone:', error);
    }
}

// Funkcja do dodawania zadania
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value;

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: taskTitle }),
        });

        const newTask = await response.json();
        renderTask(newTask);
    } catch (error) {
        console.error('B��d podczas dodawania zadania:', error);
    }
}
