const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

//Database connection
const connection = mysql.createConnection({
    host: "en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "l5r1l0kwcfged9qv",
    password: "y1nd5jf6ei8vu86f",
    database: "ekkxi4fhns28ioam"
});


connection.connect((err) => {
    if(err) {
        console.log(err.message);
    } 
});

//All database interaction functions, these make queries to the database and return results
class JobDBService{
    static getDBServiceInstance() {
        return instance ? instance : new JobDBService();
    }

    //Returns all jobs from Jobs list
    async getAllJobs() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Jobs_List;";

                connection.query(query, (err, results) => {
                   if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    //Adds a new job to the Jobs list table in database
    async insertNewJob(name, startDate, endDate) {
        try {
            const dateAdded = new Date();
            const formattedDate = dateAdded.toISOString().slice(0, 10);
            const insertId = await new Promise((resolve, reject) => {

                const query = "INSERT INTO Jobs_List (name, Start_Date, End_Date, Date_Added) VALUES (?, STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'))";
                console.log(query);
                connection.query(query, [name, startDate, endDate, formattedDate], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    resolve(result.insertId);
                })
            });
            return insertId;

        } catch (error) {
            console.log(error);
        }
    }
    
    //deletes a job from the Jobs list table in database
    async deleteJobByID(id){
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Jobs_List WHERE id = ?";
    
                connection.query(query, [id], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch(error){
            console.log(error);
            return false;
        }
    }

    //Sends query to database to update a job in the Jobs list table
    async updateJobByID(id, name, startDate, endDate){
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Jobs_List SET Name = ?, Start_Date = STR_TO_DATE(?, '%Y-%m-%d'), End_Date = STR_TO_DATE(?, '%Y-%m-%d') WHERE id = ?";
                connection.query(query, [name, startDate, endDate, id], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch(error){
            console.log(error);
            return false;
        }
    }

    /* This takes sum of all emissions subtotals for a job, then sets the totals for that job*/
    async updateJobEmissionTotals(id, totalCO2, totalN2O, totalCH4){
        try {
            id = parseInt(id, 10);

            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Jobs_List SET CO2Emissions = ?, N2OEmissions = ?, CH4Emissions = ?  WHERE id = ?";
                connection.query(query, [totalCO2, totalN2O, totalCH4, id], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch(error){
            console.log(error);
            return false;
        }
    }
}

module.exports = JobDBService;