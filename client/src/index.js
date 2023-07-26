import React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//This loads App.js which loads Dashboard page
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
        <App />
  </BrowserRouter>
);

//This converts all of the dates into correct format for a SQL query, then sends that stuff to /update
export function handleEditClick(){
  const name = document.querySelector('#update-name-input');

  var startDate = document.querySelector('#update-startDate-input').value;
  let dateParts = startDate.split('-');
  startDate = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];

  var endDate = document.querySelector('#update-endDate-input').value;
  let dateParts2 = endDate.split('-');
  endDate = dateParts2[2] + '-' + dateParts2[0] + '-' + dateParts2[1];

  fetch('http://localhost:5000/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: name.dataset.id, name: name.value, startDate: startDate, endDate: endDate })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.location.reload();
    }
  })
}


/*This waits until the page is loaded before running the code that listens
for someone adding a job, deleting a job, or editing a job*/
document.addEventListener('DOMContentLoaded', (event) => {
  /* LISTENING FOR DELETING AND EDITING JOBS */
  document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-btn") {
        // handleEditRow(event.target.dataset.id);
    }  
  });

  /* DELETE A JOB */
  function deleteRowById(id){
    fetch('http://localhost:5000/delete/' + id, { 
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  /* LISTENING FOR ADDING JOBS */
  const addBtn = document.querySelector('#AddJob-btn');

  /* This function reads from the text input boxes for Job Name,
  Start Date, and End Date , then calls the insert code in the temp.js file
  in the server directory to add this new Job to database when 'Add Job' is clicked*/
  addBtn.onclick = function () {

    const nameInput = document.querySelector('#Job-Name-Input');
    const name = nameInput.value;
    nameInput.value = '';
  
    /* The user enters the date in the format MM-DD-YYYY for startDate and endDate, 
    this converts the date from MM-DD-YYYY to YYYY-MM-DD 
    because the database stores dates in the format YYYY-MM-DD */
    const startDateInput = document.querySelector('#StartDate-Input');
    var startDate = startDateInput.value;
    let dateParts = startDate.split('-');
    startDate = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
    startDateInput.value = '';  
  
    const endDateInput = document.querySelector('#EndDate-Input');
    var endDate = endDateInput.value;
    let dateParts2 = endDate.split('-');
    endDate = dateParts2[2] + '-' + dateParts2[0] + '-' + dateParts2[1];
    endDateInput.value = '';    

    fetch('http://localhost:5000/insert', {
      headers: {  
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: name, startDate: startDate, endDate: endDate })
    })
    .then(response => response.json());
    // .then(data => insertRowIntoTable(data['data']));
  }  
});

// function insertRowIntoTable(data) {

// } 

//This waits until the page is loaded before running the code that retrieves all items from MySQL table
document.addEventListener("DOMContentLoaded", function () {
  fetch('http://localhost:5000/getAll')
  .then(response => response.json());
  // .then(data => console.log(data));
});