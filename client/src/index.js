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

//This converts all of the dates into correct format for a SQL query, then sends that stuff to /updateJob
export function handleJobEditClick(){
  var name = document.querySelector('#update-name-input');
  name.value = name.value.replace(/[^a-zA-Z0-9-,@:&$() ]/g, '');

  var startDate = document.querySelector('#update-startDate-input').value;
  startDate = startDate.replace(/[^0-9-]/g, '');
  let dateParts = startDate.split('-');
  startDate = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];

  var endDate = document.querySelector('#update-endDate-input').value;
  endDate = endDate.replace(/[^0-9-]/g, '');
  let dateParts2 = endDate.split('-');
  endDate = dateParts2[2] + '-' + dateParts2[0] + '-' + dateParts2[1];

  fetch('http://localhost:5000/updateJob', {
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

//When the Add Item button is clicked in the JobPage, this function is called
//which will then send the jobID to /loadItems
export function loadItemsIntoJobPage(jobID){
  fetch('http://localhost:5000/loadItems', {
    headers: {  
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id:jobID })
  })
  .then(response => response.json());

}

/* DELETE A JOB */
export function deleteJobById(id){
  fetch('http://localhost:5000/deleteJob/' + id, { 
      method: 'DELETE'
  })
  .then(response => response.json());
}

/* This function reads from the text input boxes for Job Name,
Start Date, and End Date , then calls the insert code in the temp.js file
in the server directory to add this new Job to database when 'Add Job' is clicked*/
export function addJob () {
  const nameInput = document.querySelector('#Job-Name-Input');
  var name = nameInput.value;
  name = name.replace(/[^a-zA-Z0-9-,@:&$() ]/g, '');
  nameInput.value = '';

  /* The user enters the date in the format MM-DD-YYYY for startDate and endDate, 
  this converts the date from MM-DD-YYYY to YYYY-MM-DD 
  because the database stores dates in the format YYYY-MM-DD */
  const startDateInput = document.querySelector('#StartDate-Input');
  var startDate = startDateInput.value;
  startDate = startDate.replace(/[^0-9-]/g, '');
  let dateParts = startDate.split('-');
  startDate = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
  startDateInput.value = '';  

  const endDateInput = document.querySelector('#EndDate-Input');
  var endDate = endDateInput.value;
  endDate = endDate.replace(/[^0-9-]/g, '');
  let dateParts2 = endDate.split('-');
  endDate = dateParts2[2] + '-' + dateParts2[0] + '-' + dateParts2[1];
  endDateInput.value = '';    

  fetch('http://localhost:5000/insertJob', {
    headers: {  
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name: name, startDate: startDate, endDate: endDate })
  })
  .then(response => response.json());
}  

/* DELETE AN ITEM by its Job_ID */
export function deleteItemByJobID(Job_ID){
  fetch('http://localhost:5000/deleteItem/' + Job_ID, { 
      method: 'DELETE'
  })
  .then(response => response.json());
}

//This function retrieves changes to an item and sends them to /updateItem
export function handleItemEditClick(){
  var name = document.querySelector('#update-itemName-input');
  var data1 = document.querySelector('#update-data1-input');
  var data2 = document.querySelector('#update-data2-input');

  fetch('http://localhost:5000/updateItem', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: data1.dataset.id, name:name.value, data1: data1.value, data2: data2.value})
  })
  .then(response => response.json());
}

//This updates emissions subtotals for an item
export function updateItemSubtotals(CO2subtotal, N2Osubtotal, CH4subtotal, id, jobID){
  fetch('http://localhost:5000/updateItemSubtotals', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id, CO2subtotal: CO2subtotal, N2Osubtotal: N2Osubtotal, CH4subtotal: CH4subtotal})
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

/*This function updates the emission totals for a job this gets
called after an item from that job gets its subtotals updated*/
// export function updateJobEmissionTotals(jobID){
//   fetch('http://localhost:5000/updateEmissionsTotals/' + jobID, {
//     method: 'PATCH'
//   })
//   .then(response => response.json())
//   .catch(err => console.log(err));
// }

//This waits until the page is loaded before running the code that retrieves all items from MySQL table
document.addEventListener("DOMContentLoaded", function () {
  fetch('http://localhost:5000/getAllJobs')
  .then(response => response.json());
});