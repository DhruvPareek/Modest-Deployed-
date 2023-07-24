import React from "react";
import "./app.css";
import { Routes, Route, Link } from "react-router-dom";
import JobPage from "./JobPage";
import { useState } from "react";

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
    
    const addRow = () => {
      let today = getDateString();
      setRows([...rows, {
        job: "New Job",
        startDateM: "1",
        startDateD: "1",
        startDateY: "2000",
        endDateM: "1",
        endDateD: "11",
        endDateY: "2000",
        co2: "896kg",
        ch4: "133kg",
        n2o: "105kg",
        lastEdited: today
      }]);}

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

    const getDateString = () => {
      let currentDate = new Date();
      let year = currentDate.getFullYear();
      let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because JavaScript months start from 0
      let day = currentDate.getDate().toString().padStart(2, '0');

      let formattedDate = `${month}/${day}/${year}`;
      return formattedDate;
    }

    return (
      <section>

      <div className="header">
        <span className="underline">Dashboard</span>
      </div>        

      {/* Fields and buttons for adding a new job */}
      <div className="button-container">
        <label>Job Name:  </label>
        <input type="text" id="Job-Name-Input" />
        <label>Start Date:  </label>
        <input type="text" id="StartDate-Input" />
        <label>End Date:  </label>
        <input type="text" id="EndDate-Input" />
          <button className="AddJob" onClick={addRow} id="AddJob-btn">Add Job</button>
      </div>

      {/* Table of jobs */}
        <table>
          <thead>
            <tr>
              <th>Jobs</th>
              <th>Dates</th>
              <th>Total CO2</th>
              <th>Total CH4</th>
              <th>Total N2O</th>
              <th>Last Edited</th>
            </tr>
          </thead>
          <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {/* This section is what will be displayed for a row if the user is editing the row */}
            {editingIndex === index ? (
              <React.Fragment>
                <td><input type="text" defaultValue={row.job} onBlur={(e) => row.job = e.target.value} /></td>
                <td><input type="text" style={{width: '30px'}} defaultValue={row.startDateM} onBlur={(e) => row.startDateM = e.target.value} />{'-'}<input type="text" style={{width: '30px'}} defaultValue={row.startDateD} onBlur={(e) => row.startDateD = e.target.value} />{'-'}<input type="text" style={{width: '45px'}} defaultValue={row.startDateY} onBlur={(e) => row.startDateY = e.target.value} />{' to '}<input type="text" style={{width: '30px'}} defaultValue={row.endDateM} onBlur={(e) => row.endDateM = e.target.value} />{'-'}<input type="text" style={{width: '30px'}} defaultValue={row.endDateD} onBlur={(e) => row.endDateD = e.target.value} />{'-'}<input type="text" style={{width: '45px'}} defaultValue={row.endDateY} onBlur={(e) => row.endDateY = e.target.value} /></td>
                <td>{row.co2}</td>
                <td>{row.ch4}</td>
                <td>{row.n2o}</td>
                <td>{row.lastEdited = getDateString()}</td>
                <td><button onClick={() => saveRow(index, row)}>Save</button></td>
              </React.Fragment>
            ) : {/* This next section is what will be displayed for a row if the user is not editing the row */}
            (
              <React.Fragment>
                <td><Link to={`/job/${row.job} ${row.startDateM}${'-'}${row.startDateD}${'-'}${row.startDateY}${' to '}${row.endDateM}${'-'}${row.endDateD}${'-'}${row.endDateY}`}>{row.job}</Link></td>
                <td>{row.startDateM}{'-'}{row.startDateD}{'-'}{row.startDateY}{' to '}{row.endDateM}{'-'}{row.endDateD}{'-'}{row.endDateY}</td>
                <td>{row.co2}</td>
                <td>{row.ch4}</td>
                <td>{row.n2o}</td>
                <td>{row.lastEdited}</td>
                <td><button onClick={() => delRow(index)} style={{padding: '0', border: 'none', width: '30px', height: '30px'}}><img src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAeFBMVEX///8AAADHx8e7u7u/v7/Ly8uzs7PDw8NnZ2dbW1sjIyMXFxfT09O3t7fOzs7S0tLo6Oji4uJFRUWYmJirq6sICAj09PRMTEw2NjYuLi4cHBynp6dUVFSLi4t+fn7a2to+Pj57e3sQEBCGhoaamppxcXHw8PBlZWXb7nSSAAAD4UlEQVR4nO2d23qqMBBG8UhtQUXEI2qrtvv933ALEUjUqCEZEv3+dQvpZIkHOgkzngcAAAAAAAAAAJhl7HeU8ce2Z33FcNKqxWRke+Yi66SeR6uV9G3PnadXVyMz2dmePUfN9xUjtT37irGORyuZ2Z5/ia8l0hrann9JV0+kbXv+JRCBCBEQcVok9p9g8wIi/jMjQoiQAhGIEAERiBABEYjUYzZ8kGcT7pw2z2TmDiojDKW+Ztt9yzKrowmPb9saGb/6Ih+2HRja+ci/2rlQsyx1Rfq2DQp0E6uxbYGCqabI2rZAwVpTZGdboKCrKeItbBsw9tqZ7o5tBcZB18PzDo+j0GNkDWX6aVvjKzbhcSJq26Tn0tocAAAAAAAp467/Rx6jQx4jyDc0paS3cb08kzaIKGOE5+RQEtLFmJ5j7AlTwrsyyZUEVDGCMsYX3c7NQfW/zpwqxryK8UEVY8ZnHYk+jfxmvD1NiIstmETvYGGpheo7RQiinWe6jZCi7dHEgIgKEFEBIgo0L3JvFXoWp4vJ9sbNUrSdLNL4Xj7aKRF/lZ+RXCU6Y/aLurrzG+SSSLu8AbhYVS6X4xP5JnKXRKqcdyK8u7g1I/nSpkMiU+6kH/4Av9DdkY12SOSXO+mbP7CUGfI4JMLd67c++QNf3AHpHTpEVIAIAyLGEUSkv84QyYGIChBhQMQ4EGFAxDjdp4JAJAciKkCEARHjvKeINMcGkRyIqAARBkSMI4hIn6mDSA5EVIAIAyLGeU8R6RY6iORARAWIMCBiHIgwIGIciDAgYhyIMCBiHIgwXk3khzvpmz/A1/NwaE+jVKQjmy9v6NAuU/nTYtVu0r3wuFdUPdm0kA52SSQoCotd1rY/FmNX8mcMXRLxAlZbbHE1jz7bNJ/eeS7PKRHPG8aH+Ga+qLM5rO8+8umYSH0gosJzmUY9IKICRBRwaDFUD4io8J4iREEgogJEFHBoA7MeEFFBvYa3OhBR4W1EhAZiTVQYoGo5NuSD6BYSliBUfKYq8BLxQQY0MeZ8DLIiWwn5yyVU9VlRRMgRauEvCV6vsVCRl65RoljDeGk8kdITKwubqvJ7zWWl7/lmeqKfEYZh1s+he6JounWrdm9xLDsvO/80LB9++jPrzUWfy4SwxWujfRYoW3CGj8Obg7RxZYOXhOj7/cyusZ4Re+ImyI31WiDvG/yvGY8ttYfnpU14GOgA85gGesQ0cD0yjsSf+H1jfbWj+ePZ1GfQZNP2NtUnJUmbbuA8jlPjzSM+02OTV6NiFgUFozPDnN6Zi1tFgXMHiIzTiNEoiNzpCg4AAAAAAAAA4IX5D2buTB+OtRlQAAAAAElFTkSuQmCC" alt="DELETE"  style={{width: '100%', height: '100%'}}></img></button></td>
                <td><button onClick={() => editRow(index)}>Edit</button></td>
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
