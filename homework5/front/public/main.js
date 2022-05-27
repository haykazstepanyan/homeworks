const pathName = window.location.pathname;
const baseURL = "http://localhost:5000";

if (pathName === "/") {
  document.querySelector(".show-page").classList.add("active-link");
  fetchTodos();
} else if (pathName === "/create") {
  document.querySelector(".create-page").classList.add("active-link");
  creationFormListener();
} else if (pathName === "/update") {
  document.querySelector(".create-page").classList.add("active-link");
}

function renderTodosList(todos) {
  const main = document.querySelector(".main");
  main.querySelector(".todos-list")?.remove();

  const container = document
    .getElementById("todos-template")
    .content.cloneNode(true);
  const todosList = container.querySelector(".todos-list");
  todosList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    const newElement = `
        <h3 class="todo-title">${todo.title}</h3>
        <p class="todo-description">${todo.description}</p>
        <p class="todo-date">${new Date(todo.date).toLocaleString()}</p>
        ${todo.status ? "<p class='todo-status'>Completed</p>" : ""}
        <div>
          <button class="btn primary-btn update-post">Update</button>
          <button class="btn alert-btn delete-post">Delete</button>
        </div>
    `;

    todoItem.innerHTML = newElement;
    todoItem
      .querySelector(".delete-post")
      .addEventListener("click", () => openModal("delete", todo.id));

    todoItem
      .querySelector(".update-post")
      .addEventListener("click", () => openModal("update", todo));

    todosList.append(todoItem);
  });
  main.append(container);
  isTodoCreated();
}

function isTodoCreated() {
  if (localStorage.getItem("postCreation")) {
    showNotification("success", "Your todo has been successfully created!");
    localStorage.removeItem("postCreation");
  }
}

async function fetchTodos() {
  const response = await fetch(baseURL);
  const result = await response.json();
  renderTodosList(result);
}

function creationFormListener() {
  const createTodoForm = document.getElementById("create-todo");
  createTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {};
    data.title = createTodoForm.querySelector("#title").value;
    data.description = createTodoForm.querySelector("#description").value;
    data.status = createTodoForm.querySelector("#status").checked;
    data.isNotified = false;
    const dateTime = createTodoForm.querySelector("#dateTime").value;
    const validDate = dateTime ? new Date(dateTime).toISOString() : "";
    data.date = validDate;

    const checkResult = validateInput(data);
    if (checkResult === "empty fields") {
      animateData("empty");
      return;
    } else if (checkResult === "invalid date") {
      animateData("date");
      return;
    }
    createTodo(data);
  });
}

function createTodo(data) {
  fetch(`${baseURL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 201) {
        localStorage.setItem("postCreation", true);
        window.location.href = "http://localhost:3000";
      } else {
        throw new Error("error");
      }
    })
    .catch(() => showNotification("error"));
}

function updateTodo(data, id) {
  fetch(`${baseURL}/update/${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200) throw new Error();
      return res.json();
    })
    .then((todos) => {
      renderTodosList(todos);
      closeModal();
      showNotification("success", "Your todo has been successfully updated");
    })
    .catch(() => showNotification("error"));
}

function deleteTodo(id) {
  fetch(`${baseURL}/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status !== 200) throw new Error("error");
      return res.json();
    })
    .then((todos) => {
      renderTodosList(todos);
      closeModal();
      showNotification("success", "Your todo has been successfully deleted");
    })
    .catch((err) => showNotification("error"));
}

function updateHandler(id) {
  const modal = document.getElementById("modal");
  modal.querySelector(".modal-error")?.remove();
  const data = {
    title: document.querySelector(".update-title").value,
    description: document.querySelector(".update-description").value,
    date: document.querySelector(".update-date").value,
    status: document.querySelector(".update-status").checked,
  };
  const validationResult = validateInput(data);
  if (typeof validationResult === "string") {
    const errorElement = document.createElement("p");
    errorElement.classList.add("modal-error");
    errorElement.innerText =
      validationResult === "empty fields"
        ? "Please fill all fields!"
        : "Date must be greater than today";
    modal.prepend(errorElement);
    return;
  }
  updateTodo(data, id);
}

function animateData(errType) {
  const container = document
    .getElementById("modal-template")
    .content.cloneNode(true);

  container.querySelector("p").innerText =
    errType === "empty"
      ? "Please fill all fields!"
      : "Date must be greater than today";
  document.body.append(container);
  document.querySelector(".alert-btn").addEventListener("click", () => {
    document.getElementById("modal").remove();
    document.querySelector(".main").style.opacity = 1;
  });
  setTimeout(() => {
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".main").style.opacity = 0.25;
  }, 0);
}

function showNotification(type, text) {
  const container = document
    .getElementById("notification-template")
    .content.cloneNode(true);
  const icon = container.querySelector(".done-icon");
  if (type === "error") {
    icon.innerHTML = "&#x2717;";
    icon.classList.add("failed-icon");
    container.querySelector(".notification-text").innerText =
      "Something went wrong. Please try again!";
  } else if (type === "success") {
    icon.innerHTML = "&#10004;";
    container.querySelector(".notification-text").innerText = text;
  }
  setTimeout(() => {
    document.querySelector(".notification").classList.add("show-notification");
  }, 0);
  document.body.append(container);
  setTimeout(() => {
    document.querySelector(".notification").remove();
  }, 3000);
}

function validateInput(data) {
  const { title, description, date } = data;
  if (!title || !description || !date) return "empty fields";
  if (new Date(date) < Date.now()) return "invalid date";
  return true;
}

function openModal(type, data) {
  const containerName =
    type === "delete" ? "delete-modal-template" : "update-modal-template";
  const container = document
    .getElementById(`${containerName}`)
    .content.cloneNode(true);

  if (type === "update") {
    container.querySelector(".update-title").value = data.title;
    container.querySelector(".update-description").value = data.description;
    container.querySelector(".update-status").checked = data.status;
    container.querySelector(".update-date").value = new Date(data.date)
      .toISOString()
      .slice(0, 16);
  }
  container.querySelector(".close-modal").addEventListener("click", closeModal);

  container
    .querySelector(".submit-modal")
    .addEventListener(
      "click",
      type === "delete" ? () => deleteTodo(data) : () => updateHandler(data.id)
    );
  document.body.append(container);
  setTimeout(() => {
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".main").style.opacity = 0.25;
  }, 0);
}

function closeModal() {
  document.getElementById("modal").remove();
  document.querySelector(".main").style.opacity = 1;
}
