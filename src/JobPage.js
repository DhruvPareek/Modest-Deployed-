import "./JobPage.css";
import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams


function JobPage() {
    const [rows, setRows] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [jobType, setJobType] = useState('Producer');
    const { jobId } = useParams();

    const jobData = {
        'Producer': {
            item: "Producer",
            section: "a",
            scope: "6",
            criteria: "ferd",
            data: {value: "ched", err: "err"},
            subCO2: "111", subN2O: "222", subCH4: "333"
        },
        'Actor': {
            item: "Actor",
            section: "juan",
            scope: "5",
            criteria: "jeef",
            data: "geeg",
            subCO2: "444", subN2O: "555", subCH4: "666"
        }
    };

    const addRow = () => {
        setRows([...rows, jobData[jobType]]);
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
      <nav><br />
        <Link to="/dashboard">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAD7+/s6Ojri4uLz8/OUlJSkpKTv7+8+Pj67u7tvb29NTU0bGxvp6enW1tYhISFSUlLFxcWAgIB6enpbW1tEREQQEBBoaGjc3NxhYWGXl5cxMTHNzc1zc3MTExONjY0qKipyIqj+AAACs0lEQVR4nO3da1bCQAyG4U4RBEXACyLewP1vUg/qUejkX2rsl/dZQXLQNOlMZ5oGAAAAAAAAAAAAAAAAAABgINqzRXQIfVrsN+XD9UV0IH2ZlG+zbXQsvViXX26io+nBZTlyFh2Pu8lxguUtOiBvF+WUWLnZdhIs6+iYXI27CZbVODoqR+19JUOpWnNZS1Apw9My+kWnfeuW0YNRdFxulvUEyz46MC/TlZGhzB9ptYwq/YSPRoLX0YF5eTISfFZ53BtlVOdZaJXR8hIdmZPxxkjwPDoyLzMjwdvowLzUu1GhMmp0o2XVRkfmxCyjKr1MZaj/pPKSbapeRutDfYYyOo8OzEveMirfjcqU0SvxMmp2o6/RgXl5MBKU70YZ6odCvozWlpgOZMqo1Y3eRQfmJW03uqMbHQj9oV69G22tblSmjFrdqEwZtZaYZHaUyJdR+W50uhMvo83ISJChfiisbvSNMjoQ+t2oleBT0/6pvhI0l5jKbPSnZuvbZS8ZWkN9iHkP33BYZTSK+974m+iMOpzLW2ttqww0dc3QfBIGcl1EN7d0Rdp4NlLmyBTKc0vgeXQyVZ4D2397VHyaOGao/xvq/x+OrVfAkVxrqTnbR/LdVKbf0+j3pf/vgdHDd7fy82GCGV//PU2Cd20J3pcmeOedYN0iwdpTgvVD/TXgFAVVfi9Ggv00CfZE6e9ro0PVIL9HOME+7wR79RN8b0GHKkH+27UUI7/8N6QZOlQKqgL5MxUydKj6Z5von0+Te+RXOScqdUFN0KHqFFT9cxP1z75M0aHKn0Gb4BzhBGdBJzjPW/9M9gTn6ie4GyHB/RYJ7ijRv2cmwV1BCe576hbU5+iA/Mnfu3bShOu8cvvtZ5QSvf+waRaTw8rbWq7IHFk4f30FAAAAAAAAAAAAAAAAAAAQ7R3PuilZ9nUhMgAAAABJRU5ErkJggg==" style={{width: '50px', height: '50px'}} alt="Dashboard" />
        </Link>
      </nav>
        <div className="header">
            <span className="underline">{jobId}</span> {/* Use jobId as the title */}
        </div>
        <div className="button-container">
            <select value={jobType} onChange={e => setJobType(e.target.value)}>
                <option value="Producer">Producer</option>
                <option value="Actor">Actor</option>
            </select>
            <button className="AddItem" onClick={addRow}>Add Item</button>
        </div>
        <table className="jobPageTable">
            <thead>
                  <tr>
                    <th>Item</th>
                    <th>Section</th>
                    <th>Scope</th>
                    <th>EPA Criteria</th>
                    <th colspan="2">Data</th>
                    <th>CO2 Subtotal</th>
                    <th>N2O Subtotal</th>
                    <th>CH4 Subtotal</th>
                  </tr>
            </thead>
            <tbody>
            {rows.map((row, index) => (
          <tr key={index}>
            {editingIndex === index ? (
              <React.Fragment>
                <td><input type="text" style={{width: '90px'}} defaultValue={row.item} onBlur={(e) => row.item = e.target.value} /></td>
                <td><input type="text" style={{width: '90px'}} defaultValue={row.section} onBlur={(e) => row.section = e.target.value} /></td>
                <td><input type="text" style={{width: '90px'}} defaultValue={row.scope} onBlur={(e) => row.scope = e.target.value} /></td>
                <td><input type="text" style={{width: '90px'}} defaultValue={row.criteria} onBlur={(e) => row.criteria = e.target.value} /></td>
                 {/* If this row corresponds to a 'Producer' item, render two input fields */}
    {row.item === 'Producer' ? (
      <React.Fragment>
        <td><input type="text" style={{width: '90px'}} defaultValue={row.data.value} onBlur={(e) => row.data.value = e.target.value} /></td>
        <td><input type="text" style={{width: '90px'}} defaultValue={row.data.err} onBlur={(e) => row.data.err = e.target.value} /></td>
      </React.Fragment>
    ) : (
      /* Otherwise, render one input field */
      <React.Fragment>
      <td><input type="text" style={{width: '90px'}} defaultValue={row.data} onBlur={(e) => row.data = e.target.value} /></td>
      <td></td>
      </React.Fragment>
    )}
                <td>{row.subCO2 + "kg"}</td><td>{row.subCH4 + "kg"}</td><td>{row.subN2O + "kg"}</td>
                <td><button onClick={() => saveRow(index, row)}>Save</button></td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td>{row.item}</td>
                <td>{row.section}</td>
                <td>{row.scope}</td>
                <td>{row.criteria}</td>
                 {/* If this row corresponds to a 'Producer' item, render two input fields */}
    {row.item === 'Producer' ? (
      <React.Fragment>
        <td>{row.data.value}</td>
        <td>{row.data.err}</td>
      </React.Fragment>
    ) : (
      /* Otherwise, render one input field */
      <React.Fragment>
      <td>{row.data}</td>
      <td></td>
      </React.Fragment>
    )}
                <td>{row.subCO2 + "kg"}</td><td>{row.subCH4 + "kg"}</td><td>{row.subN2O + "kg"}</td>
                <td><button onClick={() => delRow(index)} style={{padding: '0', border: 'none', width: '30px', height: '30px'}}><img src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAeFBMVEX///8AAADHx8e7u7u/v7/Ly8uzs7PDw8NnZ2dbW1sjIyMXFxfT09O3t7fOzs7S0tLo6Oji4uJFRUWYmJirq6sICAj09PRMTEw2NjYuLi4cHBynp6dUVFSLi4t+fn7a2to+Pj57e3sQEBCGhoaamppxcXHw8PBlZWXb7nSSAAAD4UlEQVR4nO2d23qqMBBG8UhtQUXEI2qrtvv933ALEUjUqCEZEv3+dQvpZIkHOgkzngcAAAAAAAAAAJhl7HeU8ce2Z33FcNKqxWRke+Yi66SeR6uV9G3PnadXVyMz2dmePUfN9xUjtT37irGORyuZ2Z5/ia8l0hrann9JV0+kbXv+JRCBCBEQcVok9p9g8wIi/jMjQoiQAhGIEAERiBABEYjUYzZ8kGcT7pw2z2TmDiojDKW+Ztt9yzKrowmPb9saGb/6Ih+2HRja+ci/2rlQsyx1Rfq2DQp0E6uxbYGCqabI2rZAwVpTZGdboKCrKeItbBsw9tqZ7o5tBcZB18PzDo+j0GNkDWX6aVvjKzbhcSJq26Tn0tocAAAAAAAp467/Rx6jQx4jyDc0paS3cb08kzaIKGOE5+RQEtLFmJ5j7AlTwrsyyZUEVDGCMsYX3c7NQfW/zpwqxryK8UEVY8ZnHYk+jfxmvD1NiIstmETvYGGpheo7RQiinWe6jZCi7dHEgIgKEFEBIgo0L3JvFXoWp4vJ9sbNUrSdLNL4Xj7aKRF/lZ+RXCU6Y/aLurrzG+SSSLu8AbhYVS6X4xP5JnKXRKqcdyK8u7g1I/nSpkMiU+6kH/4Av9DdkY12SOSXO+mbP7CUGfI4JMLd67c++QNf3AHpHTpEVIAIAyLGEUSkv84QyYGIChBhQMQ4EGFAxDjdp4JAJAciKkCEARHjvKeINMcGkRyIqAARBkSMI4hIn6mDSA5EVIAIAyLGeU8R6RY6iORARAWIMCBiHIgwIGIciDAgYhyIMCBiHIgwXk3khzvpmz/A1/NwaE+jVKQjmy9v6NAuU/nTYtVu0r3wuFdUPdm0kA52SSQoCotd1rY/FmNX8mcMXRLxAlZbbHE1jz7bNJ/eeS7PKRHPG8aH+Ga+qLM5rO8+8umYSH0gosJzmUY9IKICRBRwaDFUD4io8J4iREEgogJEFHBoA7MeEFFBvYa3OhBR4W1EhAZiTVQYoGo5NuSD6BYSliBUfKYq8BLxQQY0MeZ8DLIiWwn5yyVU9VlRRMgRauEvCV6vsVCRl65RoljDeGk8kdITKwubqvJ7zWWl7/lmeqKfEYZh1s+he6JounWrdm9xLDsvO/80LB9++jPrzUWfy4SwxWujfRYoW3CGj8Obg7RxZYOXhOj7/cyusZ4Re+ImyI31WiDvG/yvGY8ttYfnpU14GOgA85gGesQ0cD0yjsSf+H1jfbWj+ePZ1GfQZNP2NtUnJUmbbuA8jlPjzSM+02OTV6NiFgUFozPDnN6Zi1tFgXMHiIzTiNEoiNzpCg4AAAAAAAAA4IX5D2buTB+OtRlQAAAAAElFTkSuQmCC" style={{width: '100%', height: '100%'}}></img></button></td>
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

export default JobPage;