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
//mysql://l5r1l0kwcfged9qv:y1nd5jf6ei8vu86f@en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ekkxi4fhns28ioam

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    } 
});

//Array of all the items needed for a single job
const items = [
    {Item_Name: 'Line Producer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Director', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director of Photography', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '1st Assistant Camera', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd Assistant Camera', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'DIT', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Master', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Props', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: 0, EPA_Criteria: '(Blank)', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Camera Op', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gaffer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Electric', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Electric', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Electric/Driver', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prep/Strike/Pre Rig Crew', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Key Grip', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Grip', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Grip', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Grip/Driver', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Tech 2x', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Head Tech', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Steadi Cam Op', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Choreographer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair Asst', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Wardrobe Stylist', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Wardrobe', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Script Supervisor', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Boom Operator', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Sound Mixer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'VTR Operator', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Stunt Coordinator', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Safety Officer', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Site Rep', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Storyboard Artist', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Catering Crew', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Location Scout', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Compliance Assistant', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd AD', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Medic', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Firefighter', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Police Officers/Ranger/CHP', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Welfare/Teacher', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gang Boss', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Teamster Drivers / Animal Wranglers', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Supervisor', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Production Supervisor', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'A', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    
    {Item_Name: 'Line Producer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Director', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director of Photography', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '1st Assistant Camera', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd Assistant Camera', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'DIT', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Master', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Props', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: 0, EPA_Criteria: '(Blank)', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Camera Op', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gaffer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Electric', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Electric', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Electric/Driver', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prep/Strike/Pre Rig Crew', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Key Grip', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Best Boy Grip', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '3rd Grip', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Grip/Driver', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Tech 2x', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Head Tech', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Steadi Cam Op', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Choreographer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Make-Up/Hair Asst', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Wardrobe Stylist', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Wardrobe', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Script Supervisor', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Boom Operator', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Sound Mixer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'VTR Operator', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Stunt Coordinator', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Safety Officer', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Site Rep', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Storyboard Artist', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Location Manager', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Compliance Assistant', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '2nd AD', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Medic', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Firefighter', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Police Officers/Ranger/CHP', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Welfare/Teacher', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Gang Boss', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Teamster Drivers / Animal Wranglers', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Supervisor', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Assistant Production Supervisor', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Assistant', Section: 'B', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Craft Service', Section: 'C', Category: 1, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Per Diems', Section: 'C', Category: 6, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Hotels', Section: 'C', Category: 6, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Scouting Expenses', Section: 'C', Category: 6, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Deliveries & Taxi', Section: 'C', Category: 6, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Car Rental', Section: 'C', Category: 8, EPA_Criteria: null, Data_1_Type: 'Car Mileage', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Trucking', Section: 'C', Category: 4, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Distance Traveled (miles)', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Casting Director', Section: 'C', Category: 8, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Cast', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Casting Facility', Section: 'C', Category: 1, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Cast', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Home Econ Supplies', Section: 'C', Category: 8, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Telephone & Cable', Section: 'C', Category: 8, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Working Meals', Section: 'C', Category: 1, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Messengers', Section: 'C', Category: 1, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Location Fees', Section: 'D', Category: null, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Permits', Section: 'D', Category: null, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Lane Closures', Section: 'D', Category: null, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Set Security', Section: 'D', Category: 7, EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Cargo Van', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Trucking', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Camera Truck', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Car Rentals', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Bus Rentals', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Limousines', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Dressing Room Vehicles', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production MoHo', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Other Vehicles', Section: 'D', Category: 4, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Parking/Tolls/Gas', Section: 'D', Category: 3, EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Excess Bags/Homeland Security', Section: 'D', Category: 0, EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Air Fares', Section: 'D', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: '# of Flights', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Hotels', Section: 'D', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Hotel Days', Data_2_Type: 'Cast', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Per Diems', Section: 'D', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Talent Meals', Section: 'D', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Breakfast', Section: 'D', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Lunch', Section: 'D', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Dinner', Section: 'D', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Cabs/Ubers/Lyfts/Other Transportation', Section: 'D', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: '# of Rides', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Kit Rental', Section: 'D', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Art Work', Section: 'D', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Sustainable Practices', Section: 'D', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Prop Rental', Section: 'E', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Purchase', Section: 'E', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Fabrication', Section: 'E', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Wardrobe Rental', Section: 'E', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Wardrobe Purchase', Section: 'E', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Costumes', Section: 'E', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Picture Vehicles', Section: 'E', Category: '4', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Animals & Handlers', Section: 'E', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Mileage', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Theatrical Makeup', Section: 'E', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Product Prep/Color Correct', Section: 'E', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Greens', Section: 'E', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Rental For Build Days (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Build OT Hours (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Rental for Pre-Lite Days (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Pre-Lite OT Hours (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Rental for Shoot Days (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Shoot OT Hours (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Rental for Strike Days (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Strike OT Hours (STAGE)', Section: 'F', Category: '8', EPA_Criteria: 'Daily Energy Usage x Days', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Generator and Operator', Section: 'F', Category: '8', EPA_Criteria: 'Fuel Consumed or Mileage', Data_1_Type: 'Fuel Consumed', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Stage Manager/Studio Security', Section: 'F', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked @ Location', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Power Charges', Section: 'F', Category: '1', EPA_Criteria: 'Energy or Fuel Consumed', Data_1_Type: 'Fuel Consumed', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Misc Studio Charges', Section: 'F', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Meals for Crew and Talent', Section: 'F', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Air Conditioning (and/or Heating)', Section: 'F', Category: '1', EPA_Criteria: 'BTU @ Rate, or Daily Energy Usage x Days', Data_1_Type: 'Daily Energy Usage', Data_2_Type: '# of Days', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crew Parking', Section: 'F', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Condor/Scissor Lift (to incl. Delivery/PU)', Section: 'F', Category: '8', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Fuel Consumed', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Steeldeck (to incl. Delivery/PU)', Section: 'F', Category: '8', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Fuel Consumed', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Production Designer/Art Director', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Set Decorator', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Art Dept Coordinator', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Prop Master', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Asst Props', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Swing', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Leadman', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Set Dresser', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Scenics', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Grips/Riggers', Section: 'G', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Set Dressing Rentals', Section: 'H', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Set Dressing Purchases', Section: 'H', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Art Dept Prod Supplies', Section: 'H', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Art Dept Kit Rental', Section: 'H', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Special Effects Rental', Section: 'H', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Art Dept Trucking', Section: 'H', Category: '4', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Outside Construction', Section: 'H', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Car Prep', Section: 'H', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Art Dept meals', Section: 'H', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Messengers/Deliveries', Section: 'H', Category: '4', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Camera Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Sound Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Lighting Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Grip Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Generator Rental', Section: 'I', Category: '3', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'VTR Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Walkie Talkie Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Dolly Rental', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'SteadiCam', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Helicopter', Section: 'I', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Distance Traveled (miles)', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Production Supplies', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Jib Arm', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crane head', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Camera Car', Section: 'I', Category: '4', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Expendables', Section: 'I', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Lenses', Section: 'I', Category: '8', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Cinedrives', Section: 'I', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Media/Drives', Section: 'J', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Film', Section: 'J', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Transcode/Transfer', Section: 'J', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Process', Section: 'J', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Dailies ', Section: 'J', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Petty Cash', Section: 'K', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Air Shipping and Carriers', Section: 'K', Category: '4', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Phones and Cables', Section: 'K', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Cash Under $15 Each', Section: 'K', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'External Billing Costs', Section: 'K', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Special Insurance', Section: 'K', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Cell Phones', Section: 'K', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Foreign Producction Service Co.', Section: 'K', Category: '1', EPA_Criteria: null, Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Director Prep', Section: 'L', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director Travel', Section: 'L', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director Shoot', Section: 'L', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Director Post', Section: 'L', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Fringes', Section: 'L', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'O/C Principals', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Office Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Crowd Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'General Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'General Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'General Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'General Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'General Extras', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Hand Models', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Voice Over', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Fitting Fees', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Fitting Fees', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Audition Fees', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Audition Fees', Section: 'M', Category: '7', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Days Worked', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Talent Agency Fees', Section: 'M', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Talent Payroll Service', Section: 'M', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Talent Wardrobe Allowance', Section: 'M', Category: '0', EPA_Criteria: 'N/A', Data_1_Type: 'N/A', Data_2_Type: 'N/A', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},

    {Item_Name: 'Talent Air Fares', Section: 'M', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: '# of Flights', Data_2_Type: 'Distance Traveled (miles)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Talent Per Diem', Section: 'M', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: null, Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: 'Talent Ground Transportation', Section: 'M', Category: '6', EPA_Criteria: 'Fuel Consumed or Distance Traveled', Data_1_Type: 'Mileage', Data_2_Type: null, CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
    {Item_Name: '(Blank)', Section: '(Blank)', Category: '0', EPA_Criteria: '(Blank)', Data_1_Type: '(Blank)', Data_2_Type: '(Blank)', CO2_Subtotal: 0, N2O_Subtotal: 0, CH4_Subtotal: 0},
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
                const values = items.map(item => [jobID, item.Item_Name, item.Section, item.Category, item.EPA_Criteria, item.Data_1_Type, item.Data_2_Type, item.CO2_Subtotal, item.N2O_Subtotal, item.CH4_Subtotal]);
                // create the query string, using a placeholder for each set of values
                const queryString = "INSERT INTO Items_List (Job_ID, Item_Name, Section, Category, EPA_Criteria, Data_1_Type, Data_2_Type, CO2_Subtotal, N2O_Subtotal, CH4_Subtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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

    //Sends query to database to update a job in the Jobs list table
    async updateItemByID(id, name, data1, data2){
        try {
            id = parseInt(id, 10);
            if(data1 === "") data1 = null;
            if(data2 === "") data2 = null;

            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Items_List SET Item_Name = ?, Data_1 = ?, Data_2 = ?  WHERE id = ?";
                connection.query(query, [name, data1, data2, id], (err, result) => {
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

    //deletes an item from the Items list table in database
    async deleteItemByJobID(Job_ID){
        try {
            Job_ID = parseInt(Job_ID, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Items_List WHERE Job_ID = ?";
    
                connection.query(query, [Job_ID], (err, result) => {
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
    async updateItemSubtotals(id, CO2subtotal, N2Osubtotal, CH4subtotal){
        try {
            id = parseInt(id, 10);

            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Items_List SET CO2_Subtotal = ?, N2O_Subtotal = ?, CH4_Subtotal = ?  WHERE id = ?";
                connection.query(query, [CO2subtotal, N2Osubtotal, CH4subtotal, id], (err, result) => {
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

module.exports = ItemDBService;