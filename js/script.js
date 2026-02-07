document.addEventListener('DOMContentLoaded', () => {
   
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const dateInput = document.getElementById('dateInput');
    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];

    
    function renderTasks(filter = 'all') {
        todoList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
        if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

        if (filteredTasks.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filteredTasks.forEach(task => {
                const item = document.createElement('div');
                item.className = `flex items-center justify-between p-4 border-2 rounded-xl transition-all ${task.completed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-purple-100 shadow-sm'}`;
                item.innerHTML = `
                    <div class="flex flex-col">
                        <span class="font-bold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}">${task.text}</span>
                        <span class="text-xs text-gray-500">Deadline: ${task.date}</span>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="toggleStatus(${task.id})" class="px-3 py-1 text-xs font-bold rounded-lg border-2 ${task.completed ? 'border-green-500 text-green-600' : 'border-amber-500 text-amber-600'}">
                            ${task.completed ? 'SELESAI' : 'BELUM SELESAI'}
                        </button>
                        <button onclick="deleteTask(${task.id})" class="text-red-500 hover:text-red-700 font-bold p-1">X</button>
                    </div>
                `;
                todoList.appendChild(item);
            });
        }
    }

   
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const taskText = todoInput.value.trim();
        const dueDate = dateInput.value;

        if (taskText && dueDate) {
            tasks.push({
                id: Date.now(),
                text: taskText,
                date: dueDate,
                completed: false
            });
            todoInput.value = '';
            dateInput.value = '';
            renderTasks();
        }
    });

    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('border-purple-600', 'text-purple-600'));
            btn.classList.add('border-purple-600', 'text-purple-600');
            renderTasks(btn.dataset.filter);
        });
    });

    
    window.toggleStatus = (id) => {
        tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
        renderTasks();
    };

    window.deleteTask = (id) => {
        if(confirm('Hapus tugas ini?')) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        }
    };

    renderTasks(); 
});
