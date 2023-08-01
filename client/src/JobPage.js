import "./JobPage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { loadItemsIntoJobPage, handleItemEditClick} from './index.js';


function JobPage() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState(false);
    // const [itemsLoaded, setItemsLoaded] = useState(false);

    const [editingIndex, setEditingIndex] = useState(null);
    const { jobName,  jobID } = useParams();

    //This populates the array with jobs from database, it will run everytime newJob is changed
    useEffect(() => {
      fetch('http://localhost:5000/getAllItems/' + jobID )
        .then(response => response.json())
        .then(data => {
          setItems(data.data);
        });
    }, [newItem]);
  
      // const delItems = (index) => {
      //   const newItems = [...items];
      //   newItems.splice(index, 1);
      //   setItems(newItems);
      // }
  
      const editItem = (index) => {
        setEditingIndex(index);
      }
  
      const saveItem = (index, updatedItem) => {
        const newItems = [...items];
        newItems[index] = updatedItem;
        setItems(newItems);
        setEditingIndex(null);
      }

    return (
        <section>
      <nav><br />
        <Link to="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAD7+/s6Ojri4uLz8/OUlJSkpKTv7+8+Pj67u7tvb29NTU0bGxvp6enW1tYhISFSUlLFxcWAgIB6enpbW1tEREQQEBBoaGjc3NxhYWGXl5cxMTHNzc1zc3MTExONjY0qKipyIqj+AAACs0lEQVR4nO3da1bCQAyG4U4RBEXACyLewP1vUg/qUejkX2rsl/dZQXLQNOlMZ5oGAAAAAAAAAAAAAAAAAABgINqzRXQIfVrsN+XD9UV0IH2ZlG+zbXQsvViXX26io+nBZTlyFh2Pu8lxguUtOiBvF+WUWLnZdhIs6+iYXI27CZbVODoqR+19JUOpWnNZS1Apw9My+kWnfeuW0YNRdFxulvUEyz46MC/TlZGhzB9ptYwq/YSPRoLX0YF5eTISfFZ53BtlVOdZaJXR8hIdmZPxxkjwPDoyLzMjwdvowLzUu1GhMmp0o2XVRkfmxCyjKr1MZaj/pPKSbapeRutDfYYyOo8OzEveMirfjcqU0SvxMmp2o6/RgXl5MBKU70YZ6odCvozWlpgOZMqo1Y3eRQfmJW03uqMbHQj9oV69G22tblSmjFrdqEwZtZaYZHaUyJdR+W50uhMvo83ISJChfiisbvSNMjoQ+t2oleBT0/6pvhI0l5jKbPSnZuvbZS8ZWkN9iHkP33BYZTSK+974m+iMOpzLW2ttqww0dc3QfBIGcl1EN7d0Rdp4NlLmyBTKc0vgeXQyVZ4D2397VHyaOGao/xvq/x+OrVfAkVxrqTnbR/LdVKbf0+j3pf/vgdHDd7fy82GCGV//PU2Cd20J3pcmeOedYN0iwdpTgvVD/TXgFAVVfi9Ggv00CfZE6e9ro0PVIL9HOME+7wR79RN8b0GHKkH+27UUI7/8N6QZOlQKqgL5MxUydKj6Z5von0+Te+RXOScqdUFN0KHqFFT9cxP1z75M0aHKn0Gb4BzhBGdBJzjPW/9M9gTn6ie4GyHB/RYJ7ijRv2cmwV1BCe576hbU5+iA/Mnfu3bShOu8cvvtZ5QSvf+waRaTw8rbWq7IHFk4f30FAAAAAAAAAAAAAAAAAAAQ7R3PuilZ9nUhMgAAAABJRU5ErkJggg==" style={{width: '50px', height: '50px'}} alt="Dashboard" />
        </Link>
      </nav>
        <div className="header">
            <span className="underline">{jobName}</span> {/* Use jobName as the title */}
        </div>
        <div className="button-container">
            <button className="AddItem" onClick={() => {loadItemsIntoJobPage(jobID);document.location.reload()}} disabled={items.length!==0}>Load Items</button>
        </div>
        <table className="jobPageTable">
            <thead>
                  <tr>
                    <th>Item</th>
                    <th>Section</th>
                    <th>Category</th>
                    <th>EPA Criteria</th>
                    <th colSpan="2">Data</th>
                    <th>CO2 Subtotal</th>
                    <th>N2O Subtotal</th>
                    <th>CH4 Subtotal</th>
                  </tr>
            </thead>
            <tbody>
            {items.map((item, index) => (
          <tr key={index}>
            {editingIndex === index ? (
              <React.Fragment>
                {/* <td><input type="text" style={{width: '90px'}} data-id={item.Item_Name} id="update-itemName-input" defaultValue={item.Item_Name} onBlur={(e) => item.Item_Name = e.target.value} /></td> */}
                <td><input type="text" style={{width: '90px'}} data-id={item.Item_Name} id="update-itemName-input" defaultValue={item.Item_Name} onChange={(e) => item.Item_Name = e.target.value} /></td>
                <td>{item.Section}</td>
                <td>{item.Category}</td>
                <td>{item.EPA_Criteria}</td>
                <td><input type="text" style={{width: '90px'}} data-id={item.ID} id="update-data1-input" defaultValue={item.Data_1} onChange={(e) => item.Data_1 = e.target.value} /></td>
                <td><input type="text" style={{width: '90px'}} id="update-data2-input" defaultValue={item.Data_2} onChange={(e) => item.Data_2 = e.target.value} /></td>
                <td>{item.CO2_Subtotal + "kg"}</td><td>{item.N2O_Subtotal + "kg"}</td><td>{item.CH4_Subtotal + "kg"}</td>
                <td><button className="UpdateItem-btn" onClick={() => {saveItem(index, item);handleItemEditClick();}}>Save</button></td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td>{item.Item_Name}</td>
                <td>{item.Section}</td>
                <td>{item.Category}</td>
                <td>{item.EPA_Criteria}</td>
                <td>{item.Data_1}</td>
                <td>{item.Data_2}</td>
                <td>{item.CO2_Subtotal + "kg"}</td><td>{item.N2O_Subtotal + "kg"}</td><td>{item.CH4_Subtotal + "kg"}</td>
                {/* <td><button className="deleteItem-btn" onClick={() => delItems(index)} data-id={item.ID} style={{padding: '0', width: '55px', height: '25px'}}>Delete</button></td> */}
                <td><button className="editItem-btn" onClick={() => editItem(index)} data-id={item.ID} >Edit</button></td>
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