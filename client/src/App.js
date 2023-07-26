import React from "react";
import "./app.css";
import { Routes, Route, Link } from "react-router-dom";
import JobPage from "./JobPage";
import { useState, useEffect } from "react";

//Title of dashboard and routes to different pages
export default function App() {
  return (
    <section>
      <nav className="title">
        Modest
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/job/:jobId" element={<JobPage />} />
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
      fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => {
          setRows(data.data);
        });
    }, [newJob]);
  
    //Everytime we add a job, we change the state of newJob and refresh the page
    const addRow = () => {
      setNewJob(!newJob);
      document.location.reload();
    }

    const delRow = (index) => {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }

    const editRow = (index) => {
      setEditingIndex(index);
    }

    const saveRow = (index, updatedRow) => {
      const newRows = [...rows];
      newRows[index] = updatedRow;
      setRows(newRows);
      setEditingIndex(null);
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
        <button className="AddJob" onClick={addRow} id="AddJob-btn" disabled={!jobName || !startDate || !endDate}>Add Job</button>
      </div>

      {/* Table of jobs */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
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
            {/* This section is what will be displayed for a Job, for each job */}
            {
              <React.Fragment>
                <td>{row.ID}</td>
                <td><Link to={`/job/${row.Name}`}>{row.Name}</Link></td>
                <td>{new Date(row.Start_Date).toLocaleDateString()}{' to '}{new Date(row.End_Date).toLocaleDateString()}</td>
                <td>{row.CO2Emissions}</td>
                <td>{row.CH4Emissions}</td>
                <td>{row.N2OEmissions}</td>
                <td>{new Date(row.Date_Added).toLocaleDateString()}</td>
                <td><button class="delete-btn" data-id={row.ID} onClick={() => delRow(index)} style={{padding: '0', width: '55px', height: '25px'}}>Delete</button></td>
                <td><button class="edit-btn" data-id={row.ID} onClick={() => editRow(index)}>Edit</button></td>
              </React.Fragment>
            }
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