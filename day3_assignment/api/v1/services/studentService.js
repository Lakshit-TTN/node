//what we want from api

import pool from "../../db/index.js";

export const getAllStudents = async () => {
    try {
        const res = await pool.query('SELECT * from students', []);
        console.log('response is ', res);
        return {
            success: true,
            data: res.rows,
        }
    } catch (err) {
        console.log('error is select query', err);
        return {
            success: false,
            error: err,
        }
    }
}
export const saveStudents = async (body) => {
    try {
        const { full_name,age, department_id } = body;
        console.log(full_name);
        if (!full_name || !department_id || !age) {
            throw new Error("missing payload views")
        }
        const result = await pool.query('Insert into students (full_name,age,department_id) values ($1,$2,$3)', [full_name,age, department_id]);
        console.log('save query response', result);
        if (result.rows) {
            return {
                success: true,
                message: "students saved"
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

export const updateStudents = async (body) => {
    try {
        const { id,full_name,age, department_id } = body;
        if (!full_name || !department_id || !age) {
            throw new Error("missing payload views")
        }
        const result = await pool.query(`UPDATE students SET full_name = $1, department_id = $2, age = $3 WHERE id = $4`,
            [full_name, department_id, age, id]
        );

        if (result.rowCount > 0) 
        {
            return { success: true, message: "Student updated successfully" };
        } else {
            throw new Error("Student not found");
        }
    } catch (err) {
        console.log('Error in update query:', err);
        return { success: false, error: err.message };
    }
};
export const deleteStudents = async (id) => {
    try {
        await pool.query(`DELETE from students where id=$1`,[id]);
        return { success: true, message: "Student deleted successfully" };
    } catch (err) {
        console.log('Error in delete query:', err);
        return { success: false, error: err.message };
    }
};

export const searchStudents = async (name) => {
    try {
        console.log(name);  
        const result = await pool.query(`SELECT * FROM studentS WHERE full_name ILIKE $1`, [name]);
        if (result.rows.length > 0) {
            return { success: true, data: result.rows };
        } else {
            return { success: false, message: "No students found" };
        }
    } catch (err) {
        console.log('Error in search query:', err);
        return { success: false, error: err.message };
    }
};




