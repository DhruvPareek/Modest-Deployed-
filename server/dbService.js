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
    } else {
     }
});

//All databse interaction functions, these are where queries come from
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
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO Jobs_List (name, Start_Date, End_Date) VALUES (?, STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'));";

                connection.query(query, [name, startDate, endDate], (err, result) => {
                    if(err) {
                        console.log("Error:", err);
                        reject(new Error(err.message));
                    }
                    console.log("Result:", result);
                    resolve(result.insertId);
                })
            }); 
            // return response;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DBService;