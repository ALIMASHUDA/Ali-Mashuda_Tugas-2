let todos = [];
let editingId = null;

// Load todos from localStorage
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text) {
        if (editingId !== null) {
            // Update existing todo
            const index = todos.findIndex(todo => todo.id === editingId);
            if (index !== -1) {
                todos[index].text = text;
                editingId = null;
                document.querySelector('.add-btn').textContent = 'Tambah';
            }
        } else {
            // Add new todo
            const newTodo = {
                id: Date.now(),
                text: text,
                completed: false
            };
            todos.unshift(newTodo);
        }

        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const input = document.getElementById('todoInput');
        input.value = todo.text;
        input.focus();
        editingId = id;
        document.querySelector('.add-btn').textContent = 'Update';
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <p>Belum ada tugas yang ditambahkan</p>
            </div>
        `;
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Handle Enter key press
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initialize app
loadTodos();