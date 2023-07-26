const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

//Database connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    } 
});

//All database interaction functions, these make queries to the database and return results
class DBService{
    static getDBServiceInstance() {
        return instance ? instance : new DBService();
    }

    async getAllData() {
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

    async insertNewJob(name, startDate, endDate) {
        try {
            const dateAdded = new Date();
            const formattedDate = dateAdded.toISOString().slice(0, 10);
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO Jobs_List (name, Start_Date, End_Date, Date_Added) VALUES (?, STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'))";

                connection.query(query, [name, startDate, endDate, formattedDate], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    console.log("Result:", result);
                    resolve(result.insertId);
                })
            });
            return insertId;

        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteRowByID(id){
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Jobs_List WHERE id = ?";
    
                connection.query(query, [id], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    console.log("Result:", result);
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

module.exports = DBService;