import React from "react";
import "./app.css";
import { Routes, Route, Link } from "react-router-dom";
import JobPage from "./JobPage";
import { useState, useEffect } from "react";
import { handleJobEditClick, addJob, deleteItemByJobID, deleteJobById } from './utils.js';

//Title of dashboard and routes to different pages
export default function App() {
  return (
    <section>
      <nav className="title">
        Modest
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/job/:jobName/:jobID" element={<JobPage />} />
      </Routes>
    </section>
  );
}

//Dashboard page
function Dashboard() {
  function Jobs() {
    const [rows, setRows] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newJob, setNewJob] = useState(false);

    const [jobName, setJobName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //This populates the array with jobs from database, it will run everytime newJob is changed
    useEffect(() => {
      fetch('https://modest-e0ffdbc6f86a.herokuapp.com/getAllJobs')
        .then(response => response.json())
        .then(data => {
          if (data && data.data && Array.isArray(data.data)) {
            setRows(data.data);
        } else {
            console.error("Received unexpected data format:", data);
            setRows([]);  // Ensure rows is always an array
        }        
        console.log(data.data);});
    }, [newJob]);
  
    //Everytime we add a job, we change the state of newJob and refresh the page
    const addRow = () => {
      setNewJob(!newJob);
    }

    const delRow = (index) => {
      const jobId = rows[index].ID;
      deleteItemByJobID(jobId);
      deleteJobById(jobId);
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }

  //This changes the job that we want to edit into textboxes that can be typed into
  const editRow = (index) => {
      setEditingIndex(index);
  }
  
  //This just changes the job that was being edited back to a regular row in the table
  const saveRow = () => {
    setEditingIndex(null);
  }

  //This function checks if the given dates by the user are properly formatted then will add the job to the database or display an alert for the wrong format
  function validateDatesAndAddJob() {
    // Regex to check the MM-DD-YYYY date format
    const dateRegex = /^(0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[-](19|20)\d\d$/;
  
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      alert('Date format needs to be in MM-DD-YYYY');
    } else {
      addRow();
      addJob();
    }
  }

  //This function checks if the given dates by the user are properly formatted then will update the job or display an alert for the wrong format
  function validateDatesAndUpdateJob() {
    const startDateInput = document.getElementById("update-startDate-input").value;
    const endDateInput = document.getElementById("update-endDate-input").value;
    
    // Regex to check the MM-DD-YYYY date format
    const dateRegex = /^(0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[-](19|20)\d\d$/;
    
    if (!dateRegex.test(startDateInput) || !dateRegex.test(endDateInput)) {
      alert('Start and End Date format need to be in MM-DD-YYYY');
    } else {
      saveRow();
      handleJobEditClick();
    }
  }

  function convertMySQLDateDisplayDate(date){
    date = date.split('T')[0];
    return date.split('-')[1] +'-'+ date.split('-')[2] +'-'+ date.split('-')[0];
  }

    return (
      <section>
      <div className="header">
        <span className="underline">Dashboard</span>
      </div>        

      {/* Fields and buttons for adding a new job, this also requires that all three fields hold some value before the 'Add Job' button can be clicked */}
      <div className="button-container">
        <label>Job Name:  </label>
        <input type="text" id="Job-Name-Input" value={jobName} onChange={e => setJobName(e.target.value)} />
        <label>Start Date:  </label>
        <input type="text" id="StartDate-Input" value={startDate} onChange={e => setStartDate(e.target.value)} placeholder="MM-DD-YYYY"/>
        <label>End Date:  </label>
        <input type="text" id="EndDate-Input" value={endDate} onChange={e => setEndDate(e.target.value)} placeholder="MM-DD-YYYY"/>
        <button className="AddJob" onClick={() => validateDatesAndAddJob()} id="AddJob-btn" disabled={!jobName || !startDate || !endDate}>Add Job</button>
      </div>

      {/* Table of jobs */}
        <table>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Jobs</th>
              <th>Dates</th>
              <th>Total CO2</th>
              <th>Total CH4</th>
              <th>Total N2O</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
          {rows.map((row, index) => (
      <tr key={index}>
        {/*This is what is displayed while a job is being edited, the names and dates become textboxes that can be edited, while the edit button becomes a save button */}
        {editingIndex === index ? (
            <React.Fragment>
                {/* <td>{row.ID}</td> */}
                <td><input type="text" data-id={row.ID} id="update-name-input" defaultValue={row.Name} /></td>
                <td>
                    <input type="text" id="update-startDate-input" defaultValue={convertMySQLDateDisplayDate(row.Start_Date)} />
                    {' to '}
                    <input type="text" id="update-endDate-input" defaultValue={convertMySQLDateDisplayDate(row.End_Date)} />
                </td>
                <td>{row.CO2Emissions + "kg"}</td>
                <td>{row.CH4Emissions + "kg"}</td>
                <td>{row.N2OEmissions + "kg"}</td>
                <td>{convertMySQLDateDisplayDate(row.Date_Added)}</td>
                <td><button className="delete-btn" data-id={row.ID} onClick={() => delRow(index)} style={{padding: '0', width: '55px', height: '25px'}} disabled={true}>Delete</button></td>
                <td><button className="UpdateJob-btn" data-id={row.ID} onClick={validateDatesAndUpdateJob}>Save</button></td>
                {/* The save button calls the handleEditClick function to send query to databse to update */}
            </React.Fragment>
          ) : (
            <React.Fragment>
                {/* <td>{row.ID}</td> */}
                <td><Link to={`/job/${row.Name}/${row.ID}`}>{row.Name}</Link></td>
                {/* <td>{new Date(row.Start_Date).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-')}{' to '}{new Date(row.End_Date).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-')}</td> */}
                <td>
                {convertMySQLDateDisplayDate(row.Start_Date)}
                {' to '}
                {convertMySQLDateDisplayDate(row.End_Date)}
                </td>
                <td>{row.CO2Emissions + "kg"}</td>
                <td>{row.CH4Emissions + "kg"}</td>
                <td>{row.N2OEmissions + "kg"}</td>
                <td>{convertMySQLDateDisplayDate(row.Date_Added)}</td>
                <td><button className="deleteJob-btn" data-id={row.ID} onClick={() => delRow(index)} style={{padding: '0', width: '55px', height: '25px'}}>Delete</button></td>
                <td><button className="editJob-btn" data-id={row.ID} onClick={() => editRow(index)}>Edit</button></td>
            </React.Fragment>
        )}
      </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}

  return (
    <section>
      {Jobs()}
    </section>
  );  
}