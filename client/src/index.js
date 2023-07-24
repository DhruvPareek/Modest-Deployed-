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

/*This waits until the page is loaded before running the code that listens
for someone adding a job*/
document.addEventListener('DOMContentLoaded', (event) => {
  const addBtn = document.querySelector('#AddJob-btn');

  /* This function reads from the boxes for Job name along with 
  start and end dates, then calls the insert code in the temp.js file
  in the server directory to add this new Job to database when 'Add Job' is clicked*/
  addBtn.onclick = function () {
    const nameInput = document.querySelector('#Job-Name-Input');
    const name = nameInput.value;
    nameInput.value = '';
  
    const startDateInput = document.querySelector('#StartDate-Input');
    const startDate = startDateInput.value;
    startDateInput.value = '';  
  
    const endDateInput = document.querySelector('#EndDate-Input');
    const endDate = endDateInput.value;
    endDateInput.value = '';    
  
    fetch('http://localhost:5000/insert', {
      headers: {  
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: name, startDate: startDate, endDate: endDate })
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
  }  
});

function insertRowIntoTable(data) {

} 
document.addEventListener("DOMContentLoaded", function () {
  fetch('http://localhost:5000/getAll')
  .then(response => response.json())
  .then(data => console.log(data));
});