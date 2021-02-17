const {
  Employee,
  validateData
} = require('../models/Employee.model');

module.exports.newEmployee = (req, res) => {
  const {
    error
  } = validateData(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const employee = new Employee({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  })
  //    const employee = Employee.findOne({email:req.body.email})
  employee.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: '',
        data: result
      })
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        success: false,
        statusCode: 400,
        message: 'Failed to save Employees Data',
        data: null
      })
    })
}

//get all employees
module.exports.getAllEmployees = (req, res) => {

  Employee.find()
    .then(result => {
      console.log(result);
      res.status(200).send(result)
      // res.status(200).json({
      //     success:true,
      //     statusCode:200,
      //     message:'',
      //     data:result
      // })
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        success: false,
        statusCode: 400,
        message: 'Failed to get All Employees data',
        data: null
      })
    })

 
}

//get employee by id 
module.exports.getEmpById = (req, res) => {

  const emp_id = req.params.id;
  console.log(emp_id);
  Employee.findById(emp_id)
    .then(result => {
      console.log(result);
      res.status(200).send(result)
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        success: false,
        statusCode: 400,
        message: 'Failed to get Employee by id ',
        data: result
      })
    })


}

// update by id 

module.exports.updateEmpById = (req, res) => {

  const empid = req.params.id

  const employee = Employee.findByIdAndUpdate(empid, req.body, {
      new: true
    })
    .then(result => {
      console.log(result);
      res.status(200).send(result)
    })
    .catch(error => {
      console.log(error);
      res.status(200).json({
        success: false,
        statusCode: 400,
        message: 'Failed to update Employee',
        data: null
      })
    })



}

// remove employee

module.exports.removeEmpById = (req, res) => {

  const empid = req.params.id;

  const employee = Employee.findOneAndDelete(empid)
    .then(emp => {
      console.log(emp);
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Employee Removed Suucesssfully',
        data: emp
      })
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        success: false,
        statusCode: 400,
        message: 'Failed to Remove Employee',
        data: null
      })
    })

}

//remove many employees

module.exports.removeAllEmp = (req, res) => {
  const empid = req.params.id;
  console.log(empid);
  try {
    Employee.deleteMany({
        _id: empid
      })
      .then(result=>{
            res.status(200).json({
                success:true,
                statusCode:200,
                message:'All Employees Deleted',
                data:result
            })
      })
      .catch(err => {
        res.status(200).json({
            success:false,
            statusCode:400,
            message:'Failed to remove all employees',
            data:err
        })
      })
  } catch {
    res.status(200).json({
        success:false,
        statusCode:400,
        message:'Failed to remove on api',
        data:null
    })
  }

}
