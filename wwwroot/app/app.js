// app.js
document.addEventListener('DOMContentLoaded', function () {
    // Przypisanie obs³ugi zdarzenia po za³adowaniu strony
    document.getElementById('addTaskButton').addEventListener('click', addTask);

    // Przyk³ad renderowania istniej¹cych zadañ przy za³adowaniu strony
    refreshTaskList();
});

async function refreshTaskList() {
    const taskContainer = document.getElementById('tasks-container');
    taskContainer.innerHTML = ''; // Wyczyœæ istniej¹ce zadania

    try {
        // Wykorzystaj fetch do pobrania listy zadañ z serwera
        const response = await fetch('/tasks');

        // SprawdŸ, czy status odpowiedzi jest OK (200)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const tasks = await response.json();

        // Renderuj ka¿de zadanie
        tasks.forEach(task => renderTask(task));
    } catch (error) {
        console.error('B³¹d podczas pobierania listy zadañ:', error);
    }
}


function renderTask(task) {
    const taskContainer = document.getElementById('tasks-container');

    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const taskText = document.createElement('span');
    taskText.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Usuñ';
    deleteButton.onclick = () => deleteTask(task.id);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Zakoñcz';
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
        console.error('B³¹d podczas usuwania zadania:', error);
    }
}

// Funkcja do oznaczania zadania jako zakoñczone
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
        console.error('B³¹d podczas oznaczania zadania jako zakoñczone:', error);
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
        console.error('B³¹d podczas dodawania zadania:', error);
    }
}
