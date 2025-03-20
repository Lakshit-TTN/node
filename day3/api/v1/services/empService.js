//what we want from api

import pool from "../../db/index.js";
export const getAllEmployees = async () => {
    try {
        const res = await pool.query('SELECT * from employees', []);
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
export const saveEmployees = async (body) => {
    try {
        const { full_name, department_id, salary } = body;
        console.log(full_name);
        
        if (!full_name || !department_id || !salary) {
            throw new Error("missing payload views")
        }
        const result = await pool.query('Insert into employees (full_name,department_id,salary) values ($1,$2,$3)', [full_name, department_id, salary]);
        console.log('save query response', result);
        if (result.rows) {
            return {
                success: true,
                message: "employees saved"
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

export const updateEmployee = async (id, body) => {
    try {
        const { full_name, department_id, salary } = body;
        if (!full_name || !department_id || !salary) {
            throw new Error("missing payload views")
        }
        const result = await pool.query(`UPDATE employees SET full_name = $1, department_id = $2, salary = $3 WHERE id = $4`,
            [full_name, department_id, salary, id]
        );

        if (result.rowCount > 0) 
        {
            return { success: true, message: "Employee updated successfully" };
        } else {
            throw new Error("Employee not found");
        }
    } catch (err) {
        console.log('Error in update query:', err);
        return { success: false, error: err.message };
    }
};



