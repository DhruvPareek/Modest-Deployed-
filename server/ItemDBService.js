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

//Array of all the items needed for a single job
const items = [
    {Item_Name: 'Line Producer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Director', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director of Photography', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '1st Assistant Camera', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd Assistant Camera', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'DIT', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Master', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Props', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: 0, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Camera Op', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gaffer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Electric', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Electric', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Electric/Driver', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prep/Strike/Pre Rig Crew', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Key Grip', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Grip', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Grip', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Grip/Driver', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Tech 2x', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Head Tech', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Steadi Cam Op', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Choreographer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair Asst', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Wardrobe Stylist', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Wardrobe', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Script Supervisor', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Boom Operator', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Sound Mixer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'VTR Operator', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Stunt Coordinator', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Safety Officer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Site Rep', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Storyboard Artist', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Catering Crew', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Location Scout', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Compliance Assistant', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd AD', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Medic', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Firefighter', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Police Officers/Ranger/CHP', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Welfare/Teacher', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gang Boss', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Teamster Drivers / Animal Wranglers', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Supervisor', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Production Supervisor', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Line Producer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Director', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director of Photography', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '1st Assistant Camera', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd Assistant Camera', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'DIT', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Master', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Props', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: 0, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Camera Op', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gaffer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Electric', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Electric', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Electric/Driver', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prep/Strike/Pre Rig Crew', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Key Grip', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Grip', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Grip', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Grip/Driver', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Tech 2x', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Head Tech', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Steadi Cam Op', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Choreographer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair Asst', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Wardrobe Stylist', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Wardrobe', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Script Supervisor', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Boom Operator', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Sound Mixer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'VTR Operator', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Stunt Coordinator', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Safety Officer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Site Rep', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Storyboard Artist', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Location Manager', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Compliance Assistant', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd AD', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Medic', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Firefighter', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Police Officers/Ranger/CHP', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Welfare/Teacher', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gang Boss', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Teamster Drivers / Animal Wranglers', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Supervisor', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Production Supervisor', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Per Diems', Section: 'C', Category: 6, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Hotels', Section: 'C', Category: 6, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Scouting Expenses', Section: 'C', Category: 6, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Deliveries & Taxi', Section: 'C', Category: 6, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Car Rental', Section: 'C', Category: 8, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
];

class ItemDBService{
    static getDBServiceInstance() {
        return instance ? instance : new ItemDBService();
    }

    //This adds all of the items from the items array to the database for a job
    async populateItemsForJob(jobID) {
        try{
            jobID = parseInt(jobID, 10);

            let totalAffectedRows = 0;
            for (var x = 0; x < items.length; x++) {    
                //Add the JobID for these items to the array
                const values = items.map(item => [jobID, item.Item_Name, item.Section, item.Category, item.EPA_Criteria, item.CO2_Subtotal, item.N2O_Subtotal, item.CH4_Subtotal]);
                // create the query string, using a placeholder for each set of values
                const queryString = "INSERT INTO Items_List (Job_ID, Item_Name, Section, Category, EPA_Criteria, CO2_Subtotal, N2O_Subtotal, CH4_Subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                const response = await new Promise((resolve, reject) => {
                    connection.query(queryString, values[x], (err, result) => {
                        if(err) {
                            console.log("Error:", err);
                            reject(new Error(err.message));
                        }
                        resolve(result.affectedRows);
                    })
                });
            }
            return totalAffectedRows === items.length ? true : false;
            }catch(error){
                console.log(error);
            return false;
        }
    }

    //Returns all items from items list
    async getAllItems(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Items_List WHERE Job_ID = ?";

                connection.query(query, [id], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    //deletes an item from the Items list table in database
    // async deleteItemByID(id){
    //     try {
    //         id = parseInt(id, 10);
    //         const response = await new Promise((resolve, reject) => {
    //             const query = "DELETE FROM Items_List WHERE id = ?";
    
    //             connection.query(query, [id], (err, result) => {
    //                 if(err) {
    //                     console.log("Error:", err);
    //                     reject(new Error(err.message));
    //                 }
    //                 console.log("Result:", result);
    //                 resolve(result.affectedRows);
    //             })
    //         });

    //         return response === 1 ? true : false;
    //     } catch(error){
    //         console.log(error);
    //         return false;
    //     }
    // }
    
}

module.exports = ItemDBService;