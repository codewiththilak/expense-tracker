import pool from "./config/db.js"; 

async function testDB() {
    try {
        const result = await pool.query("SELECT NOW()"); 
        console.log("Database Connected!"); 
        console.log(result.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}


testDB(); 
