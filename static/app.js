// add task functionality
async function addTask() {
  // get the input field and task list elements

  const last_id = await getLastId();

  // check if input field is not empty or contains only whitespace
  if (taskInput.value.trim() != "") {
    createTodoItemHtml(last_id);

    fetch(`http://127.0.0.1:5000/addtodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: String(taskInput.value) }),
    });

    // clear the input field
    taskInput.value = "";
  }
}

// delete task functionality

async function getAllTasks() {
  const res = await fetch(`http://127.0.0.1:5000/alltodos`, {
    method: "GET",
  });
  const alltasks = await res.json();
  let taskList = document.getElementById("taskList");

  alltasks.forEach((element) => {
    let divEl = document.createElement("div");
    divEl.className = "outside";
    divEl.id = element[0];

    let button = createDeleteButton();

    let divForButton = document.createElement("div");
    divForButton.className = "hoverEffect";
    let blankDiv = document.createElement("div");

    button.appendChild(divForButton);
    button.appendChild(blankDiv);

    let li = createListItem(element[1]);

    // display the list item to the task list
    taskList.appendChild(divEl);
    divEl.appendChild(li);
    divEl.appendChild(button);
    button.onclick = function () {
      taskList.removeChild(divEl);
      deleteTask(element[0]);
    };
  });

  return alltasks;
}

async function deleteTask(id_param) {
  const res = await fetch(`http://127.0.0.1:5000/removeOneTodo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: String(id_param) }),
  });
  return res;
}

async function getLastId() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const item_id = await fetch("http://127.0.0.1:5000/getLastId", requestOptions)
    .then((response) => response.text())
    // .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return item_id;
}

function createTodoItemHtml(last_id) {
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  let divEl = document.createElement("div");
  divEl.className = "outside";
  divEl.id = last_id;

  let button = createDeleteButton();

  let divForButton = document.createElement("div");
  divForButton.className = "hoverEffect";
  let blankDiv = document.createElement("div");

  button.appendChild(divForButton);
  button.appendChild(blankDiv);

  // create a new list item
  let li = createListItem(taskInput.value);

  // display the list item to the task list
  taskList.appendChild(divEl);
  divEl.appendChild(li);
  divEl.appendChild(button);
  button.onclick = function () {
    taskList.removeChild(divEl);
    deleteTask(divEl.id);
  };
}

function createDeleteButton() {
  let button = document.createElement("button");
  button.className = "noselect";

  let span = document.createElement("span");
  span.className = "text";
  span.appendChild(document.createTextNode("Delete"));

  let spanicon = document.createElement("span");
  spanicon.className = "icon";
  spanicon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg>`;

  button.appendChild(span);
  button.appendChild(spanicon);

  return button;
}

function createListItem(myInputValue) {
  let li = document.createElement("li");
  li.className = "task-item";

  // add the task text to the list item
  li.appendChild(document.createTextNode(myInputValue));

  return li;
}
