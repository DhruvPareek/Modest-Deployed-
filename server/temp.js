const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

//Add to database
app.post('/insert', (request, response) => {
    const {name, startDate, endDate} = request.body;
    const db = dbService.getDBServiceInstance();

    const result = db.insertNewJob(name, startDate, endDate);

    result
    .then(data => response.json({success : true}))
    .catch(err => console.log(err));
});

//read
app.get('/getAll', (request, response) => {
    const db = dbService.getDBServiceInstance();
    const result = db.getAllData();

    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
})

//update


//delete
app.delete('/delete/:id', (request, response) => {
     const { id } = request.params;
     const db = dbService.getDBServiceInstance();

    const result = db.deleteRowByID(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running'));