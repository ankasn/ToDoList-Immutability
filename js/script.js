{
    let tasks = [];

    let hideDoneTasks = false;

    let addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask, }
        ]
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done,},
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const allTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task, 
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const removeEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            })
        });
    }

    const toggleEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        });
    }

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""} js-task">
                    <button class="list__button list__button--done js-done">
                        ${task.done ? "✓" : ""}
                    </button>
                    <span class="list__item ${task.done ? " list__item--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-remove">
                        🗑
                    </button>
                </li>`
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let headerContent = "Lista zadań"
        if (tasks.length > 0) {
            headerContent = `
                Lista zadań
                <button class="header__button js-hideDoneTasks">
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="header__button js-allDone
                    ${tasks.every(({done}) => done) ? "header__button--disabled" : ""}
                    ${tasks.every(({done}) => done) ? "disabled" : ""}> 
                    Ukończ wszystkie
                </button>
                `;
        }
        document.querySelector(".js-listHeader").innerHTML = headerContent;
    };

    const buttonEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
        const allDoneButton = document.querySelector(".js-allDone");
        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
        if (allDoneButton) {
            allDoneButton.addEventListener("click",  allTasksDone);
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();
        removeEvents();
        toggleEvents();
        buttonEvents();
    };

    const clearInput = () => {
        const formInput = document.querySelector(".js-newTask");
        formInput.value = "";
        formInput.focus();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask").value.trim();
        if (newTask === "") {
            return;
        }
        addNewTask(newTask);
        clearInput();
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form")
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}