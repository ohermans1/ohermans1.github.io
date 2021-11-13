let usersName = localStorage.getItem("usersName");
let leftHeader = document.querySelector(".leftHeader");
if (usersName === null) {
  usersName = prompt("Please enter your name");
  localStorage.setItem("usersName", usersName);
}
leftHeader.innerHTML = usersName + "'s Projects To Do";

// Get date function
function getDate() {
  var todaysDate = new Date();
  todaysDate = String(todaysDate).slice(0, 15);
  return todaysDate;
}

function setTotals() {
  atAGlanceTotal.innerHTML = complete.childElementCount + notStarted.childElementCount + inProgress.childElementCount;
  if (atAGlanceTotal === NaN) {
    atAGlanceTotal = 0;
  }
  inProgressTotal.innerHTML = inProgress.childElementCount;
  if (inProgressTotal === NaN) {
    inProgressTotal = 0;
  }
  notStartedTotal.innerHTML = notStarted.childElementCount;
  if (notStartedTotal === NaN) {
    notStartedTotal = 0;
  }
  completeTotal.innerHTML = complete.childElementCount;
  if (completeTotal === NaN) {
    completeTotal = 0;
  }
  saveFile();
}

// Drag and drop projects
function onDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
  deleteThis = e.target;
  deleteThisParentID = deleteThis.parentElement.id;
}

function onDragOver(e) {
  e.preventDefault();
}

function onDrop(e) {
  const id = e.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = e.target;
  if (dropzone.id === "notStartedContainer") {
    notStartedArray.push(dropzone);
    dropzone.appendChild(draggableElement);
  } else if (dropzone.id === "inProgressContainer") {
    inProgressArray.push(dropzone);
    dropzone.appendChild(draggableElement);
  } else if (dropzone.id === "Complete") {
    completeArray.push(dropzone);
    dropzone.appendChild(draggableElement);
  } else {
    return;
  }
  if (deleteThisParentID === "notStartedContainer") {
    notStartedArray.pop(deleteThis);
  } else if (deleteThisParentID === "inProgressContainer") {
    inProgressArray.pop(deleteThis);
  } else if (deleteThisParentID === "Complete") {
    completeArray.pop(deleteThis);
  }
  setTotals();
  e.dataTransfer.clearData();
}

var notStartedSaveFile;

/* Todays Date */
document.querySelector(".date").innerHTML = getDate();

/////////////////
/* At a Glance */
/////////////////

// Total projects
var atAGlanceTotal = document.querySelector("#totalProjects");
var inProgressTotal = document.querySelector("#totalInProgress");
var completeTotal = document.querySelector("#totalComplete");
var notStartedTotal = document.querySelector("#totalNotStarted");

/////////////////
/* Add Project */
/////////////////
var addProjectButton = document.querySelector("#addProjectButton");
var notStarted = document.querySelector("#notStartedContainer");
var inProgress = document.querySelector("#inProgressContainer");
var complete = document.querySelector("#Complete");

var count = 0;
var notStartedArray = [];
var inProgressArray = [];
var completeArray = [];
var deleteThisParentID = "";
var deleteThis = "";

addProjectButton.addEventListener("click", function addProject() {
  var projectName = document.querySelector("#projectName").value;

  // Checking for blank inputs
  if (projectName === "") {
    return;
  }

  // Creating required elements
  let tempFragAdd = document.createDocumentFragment();
  var projectDiv = document.createElement("div");
  var projectButton = document.createElement("button");
  var removeProjectButton = document.createElement("button");

  // Assigning classes and IDs
  projectDiv.className = "projectDiv";
  projectDiv.id = "projectDiv" + count;
  projectButton.className = "projectButton";
  projectButton.id = "projectButton" + count;
  removeProjectButton.className = "removeProjectButton";
  removeProjectButton.id = "removeProjectButton" + count;
  //Count for increasing ID value
  count++;

  //Adding text
  projectButton.innerHTML = projectName + "<span class='left'>Added: " + getDate();
  +"</span>";
  removeProjectButton.innerHTML = "x";

  // Adding new elements to document
  tempFragAdd.appendChild(projectDiv);
  projectDiv.appendChild(projectButton);
  projectDiv.appendChild(removeProjectButton);
  notStarted.appendChild(tempFragAdd);
  notStartedArray.push(projectDiv);
  projectDiv.setAttribute("draggable", "true");
  projectDiv.setAttribute("ondragstart", "onDragStart(event)");
  console.log(notStartedArray);
  setTotals();
  // Resetting form
  document.querySelector("#inputForm").reset();
});

////////////////////
/* Delete Project */
////////////////////

main.addEventListener("click", function deleteProject(e) {
  var deleteThis = e.target;
  if (deleteThis.parentElement.parentElement.id === "notStartedContainer") {
    notStartedArray.pop(deleteThis);
  } else if (deleteThis.parentElement.parentElement.id === "inProgressContainer") {
    inProgressArray.pop(deleteThis);
  } else if (deleteThis.parentElement.parentElement.id === "Complete") {
    completeArray.pop(deleteThis);
  }
  if (deleteThis.className === "removeProjectButton") {
    deleteThis.parentElement.remove();
    count--;
    // Remove from total projects
    setTotals();
  }
  return;
});

function saveFile() {
  localStorage.setItem("notStartedSave", notStarted.innerHTML);
  localStorage.setItem("inProgressSave", inProgress.innerHTML);
  localStorage.setItem("completeSave", complete.innerHTML);
}

function loadFile() {
  if (localStorage.getItem("notStartedSave") !== null) {
    var notStartedSaveFile = localStorage.getItem("notStartedSave");
    notStarted.insertAdjacentHTML("beforeend", notStartedSaveFile);
  }
  if (localStorage.getItem("inProgressSave") !== null) {
    var inProgressSaveFile = localStorage.getItem("inProgressSave");
    inProgress.insertAdjacentHTML("beforeend", inProgressSaveFile);
  }
  if (localStorage.getItem("completeSave") !== null) {
    var completeSaveFile = localStorage.getItem("completeSave");
    complete.insertAdjacentHTML("beforeend", completeSaveFile);
  }
  setTotals();
}

loadFile();
console.log(notStarted.childElementCount);
