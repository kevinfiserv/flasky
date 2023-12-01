// add task functionality
function addTask() {
  // get the input field and task list elements
  let taskInput = document.getElementById("taskInput");
  let taskList = document.getElementById("taskList");

  let divEl = document.createElement("div");
  divEl.className = "outside";

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
