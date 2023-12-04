// add task functionality
async function addTask() {
  // get the input field and task list elements

  const last_id = await getLastId();

  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  let divEl = document.createElement("div");
  divEl.className = "outside";
  divEl.id = last_id;

  let button = document.createElement("button");
  button.className = "button";
  button.appendChild(document.createTextNode("Delete"));

  let divForButton = document.createElement("div");
  divForButton.className = "hoverEffect";
  let blankDiv = document.createElement("div");

  button.appendChild(divForButton);
  button.appendChild(blankDiv);

  // check if input field is not empty or contains only whitespace
  if (taskInput.value.trim() != "") {
    // create a new list item
    let li = document.createElement("li");

    // add the task text to the list item
    li.appendChild(document.createTextNode(taskInput.value));

    // display the list item to the task list
    taskList.appendChild(divEl);
    divEl.appendChild(li);
    divEl.appendChild(button);
    button.onclick = function () {
      taskList.removeChild(divEl);
      deleteTask(divEl.id);
    };

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
  // console.log(alltasks);

  alltasks.forEach((element) => {
    let divEl = document.createElement("div");
    divEl.className = "outside";
    divEl.id = element[0];

    let button = document.createElement("button");
    button.className = "button";
    button.appendChild(document.createTextNode("Delete"));

    let divForButton = document.createElement("div");
    divForButton.className = "hoverEffect";
    let blankDiv = document.createElement("div");

    button.appendChild(divForButton);
    button.appendChild(blankDiv);
    let li = document.createElement("li");

    // add the task text to the list item
    li.appendChild(document.createTextNode(element[1]));

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
