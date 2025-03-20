//what api will send

import express from 'express'
import { getAllStudents,updateStudents,deleteStudents,saveStudents,searchStudents } from '../services/studentService.js'
const router =  express.Router()

router.get('/',async(req,res)=>{
    try {
        const response = await getAllStudents()
        if (response.success) {
            return res.status(200).send({data:response.data})
        }
        else throw new Error('error in get api')
    } catch (error) {
        console.log('error in api ',error);
        return res.status(400).send({message:error.message || ''})
    }
})

router.get('/search',async(req,res)=>{
    try {
        const { name } = req.query; 
        const response = await searchStudents(name);
        if (response.success) {
            return res.status(200).send({data:response.data})
        }
        else throw new Error('error in search api')
    } catch (error) {
        console.log('error in api ',error);
        return res.status(400).send({message:error.message || ''})
    }
})

router.post('/add', async (req, res) => {
    try {
        const response = await saveStudents(req.body);
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
            throw new Error("ID is required for updating");
        }
        const response = await updateStudents(id, req.body); 
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

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Student ID is required");
        }
        const response = await deleteStudents(id);
        if (response.success) {
            return res.status(200).send({ message: response.message });
        } else {
            throw new Error(response.error);
        }
    } catch (error) {
        console.log('Error in DELETE API:', error);
        return res.status(400).send({ message: error.message || "An error occurred" });
    }
});


export default router;