import bcrypt from "bcrypt";
import pool from "../../db/index.js";

export const saveUser = async (name,email,password,age) => {
    try {
       
        if (!name || !email || !password || !age) {
            throw new Error("missing payload views")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('Insert into users (name,age,email,password) values ($1,$2,$3,$4)', [name,age,email,hashedPassword]);
        console.log('save query response', result);
        if (result.rows) {
            return {
                success: true,
                message: "user saved"
            }
        }
        else throw new Error('error which saving')
    } catch (err) {
        console.log('error is insert query', err);
        return {
            success: false,
            error: err,
        }
    }
}



