const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

//Add a job to the Jobs List table in the database
app.post('/insert', (request, response) => {
    const {name, startDate, endDate} = request.body;
    const db = dbService.getDBServiceInstance();

    const result = db.insertNewJob(name, startDate, endDate);

    result
    .then(data => response.json({success : true}))
    .catch(err => console.log(err));
});

//read all jobs from database
app.get('/getAll', (request, response) => {
    const db = dbService.getDBServiceInstance();
    const result = db.getAllData();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})

//update a jb in the database, it can update name, startDate, endDate
app.patch('/update', (request, response) => {
    const {id, name, startDate, endDate} = request.body
    const db = dbService.getDBServiceInstance();  
    console.log("ID: " + id + " Name: " + name + " Start Date: " + startDate + " End Date: " + endDate);
    const result = db.updateJobByID(id, name, startDate, endDate);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

//delete a job from the database
app.delete('/delete/:id', (request, response) => {
     const { id } = request.params;
     const db = dbService.getDBServiceInstance();

    const result = db.deleteRowByID(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running'));