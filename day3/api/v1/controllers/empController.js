//what api will send

import express from 'express'
import { getAllEmployees, saveEmployees,updateEmployee } from '../services/empService.js'
const router =  express.Router()

router.get('/',async(req,res)=>{
    try {
        const response = await getAllEmployees()
        if (response.success) {
            return res.status(200).send({data:response.data})
        }
        else throw new Error('error in get api')
    } catch (error) {
        console.log('error in api ',error);
        return res.status(400).send({message:error.message || ''})
    }
})

router.post('/add', async (req, res) => {
    try {
        const response = await saveEmployees(req.body);
        if (response.success) {
            return res.status(200).send({ message: response.message });
        } else {
            throw new Error(response.error);
        }
    } catch (error) {
        console.log('Error in API:', error);
        return res.status(400).send({ message: error.message || "An error occurred" });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { id } = req.body; 
        if (!id) {
            throw new Error("Employee ID is required for updating");
        }
        const response = await updateEmployee(id, req.body); 
        if (response.success) {
            return res.status(200).send({ message: response.message });
        } else {
            throw new Error(response.error);
        }
    } catch (error) {
        console.log('Error in PUT API:', error);
        return res.status(400).send({ message: error.message || "An error occurred" });
    }
});


export default router;