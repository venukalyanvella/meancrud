const express = require('express');
const router = express.Router();
const empCtrl = require('../controllers/employee.controller')


router.post('/newEmployee',empCtrl.newEmployee);
router.get('/employees', empCtrl.getAllEmployees)
router.get('/getByid/:id', empCtrl.getEmpById)
router.put('/updateemp/:id', empCtrl.updateEmpById)
router.delete('/removeemp/:id', empCtrl.removeEmpById)
router.delete('/removeAll/:id', empCtrl.removeAllEmp);

module.exports = router