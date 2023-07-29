const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

/* JOB MANAGEMENT ON DASHBOARD*/
/* JOB MANAGEMENT ON DASHBOARD*/
/* JOB MANAGEMENT ON DASHBOARD*/

const JobDBService = require('./JobDBService');

//Add a job to the Jobs List table in the database
app.post('/insertJob', (request, response) => {
    const {name, startDate, endDate} = request.body;
    const db = JobDBService.getDBServiceInstance();

    const result = db.insertNewJob(name, startDate, endDate);

    result
    .then(data => response.json({success : true}))
    .catch(err => console.log(err));
});

//read all jobs from database
app.get('/getAllJobs', (request, response) => {
    const db = JobDBService.getDBServiceInstance();
    const result = db.getAllJobs();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})

//update a jb in the database, it can update name, startDate, endDate
app.patch('/updateJob', (request, response) => {
    const {id, name, startDate, endDate} = request.body
    const db = JobDBService.getDBServiceInstance();
    // console.log("ID: " + id + " Name: " + name + " Start Date: " + startDate + " End Date: " + endDate);
    const result = db.updateJobByID(id, name, startDate, endDate);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

//delete a job from the database
app.delete('/deleteJob/:id', (request, response) => {
     const { id } = request.params;
     const db = JobDBService.getDBServiceInstance();

    const result = db.deleteJobByID(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

/* JOB MANAGEMENT ON DASHBOARD*/
/* JOB MANAGEMENT ON DASHBOARD*/
/* JOB MANAGEMENT ON DASHBOARD*/

/* ITEM MANAGEMENT ON JOBPAGE*/
/* ITEM MANAGEMENT ON JOBPAGE*/
/* ITEM MANAGEMENT ON JOBPAGE*/

const ItemDBService = require('./ItemDBService');

app.post('/loadItems', (request, response) => {
    const {id} = request.body;
    const db = ItemDBService.getDBServiceInstance();
    console.log("JobID in temp.js: " + id);

    const result = db.populateItemsForJob(id);

    result
    .then(data => response.json({success : true}))
    .catch(err => console.log(err));
});

/* ITEM MANAGEMENT ON JOBPAGE*/
/* ITEM MANAGEMENT ON JOBPAGE*/
/* ITEM MANAGEMENT ON JOBPAGE*/

app.listen(process.env.PORT, () => console.log('app is running'));