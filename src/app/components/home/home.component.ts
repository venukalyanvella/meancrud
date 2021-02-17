import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
// import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee:any=[];
  isChecked:any = false; 
  @ViewChild('empForm',{static:false}) employeeForm:NgForm;
  // @ViewChild('updateempForm',null) updateEmpForm:NgForm;
  
  id:any;
  username:any=null;
  email:any=null;
  address:any=null;
  phone:any=null;
  
  constructor(private empservice:EmployeeService) { }

  ngOnInit() {
    this.getAllEmp()
  }
  onSelect(emp:any){
    console.log(emp);
    this.id = emp._id;
    this.ShowEdModal()
    this.username = emp.name;
    this.email=emp.email;
    this.address=emp.address;
    this.phone = emp.phone; 
  }

  openModal(){
    this.username=null;
    this.email=null;
    this.address=null;
    this.phone=null;
    $(document).ready(function(){
      $('#myModal').modal();
    })
    
  }
  closeModal(){
    $(document).ready(function(){
      $('#myModal').modal('hide');

    })
    this.resetAll();
  }

  ShowEdModal(){
    $(document).ready(function(){
      $('#updateEmpModal').modal();

    });
    
  }
  closeEdModal(){
    $(document).ready(function(){
      $('#updateEmpModal').modal('hide');

    })
    this.username='';
    this.email='';
    this.address='';
    this.phone='';
  }

  resetAll(){
    this.employeeForm.reset();
    this.username=null;
    this.email=null;
    this.address=null;
    this.phone=null;
  }
//getAll Employees 

getAllEmp(){
  this.empservice.getAllEmployees().subscribe(
    result=>{
      console.log(result);
      this.employee = result      
    }
  )
}

isCheckboxChecked(){
return this.employee.every(e=>e.checked)
}

AllCheckBoxChecked(event:any){
  // console.log(event);
  this.employee.forEach(x=> x.checked = event.target.checked)
}

deleteAllEmp(){
  const selectedEmp = this.employee.filter(employee=>employee.checked).map(e=>e._id);
  console.log(selectedEmp);
  if(selectedEmp == 0 && selectedEmp ==''){
    alert('please select at least one record')
  } else {
    console.log(JSON.stringify(selectedEmp));
    this.empservice.removeAllEmp(selectedEmp).subscribe(
      result=>{
        if(result['success']==true){
          console.log('All Emloyees removed');
          
        } else {
          console.log('Failed to remove all employeese');
          
        }
      },
      err=>{
        console.log('Error on api',err);
        
      }
    )
  }
}



addNewEmployee(empForm:any){
  console.log(empForm);
  this.empservice.newEmployee(empForm).subscribe(
    result=>{
      console.log(result);
      this.getAllEmp();
      this.closeModal();
      this.resetAll();
    },
    err=>{
      console.log(err);
    }
  )
}

// getbyId(emp_id){
//   this.empservice.getEmployeeById(emp_id).subscribe(
//     result=>{
//       console.log(result);
//       this.ShowEdModal();
//       this.employeeForm.control.patchValue(result);
//       this.getAllEmp();      
//     },
//     err=>{
//       console.log(err);  
//     }
//   )
// }

updateEmployee(updateEmpForm:any){
  let empid = this.id
console.log(updateEmpForm,'id is', empid);

  this.empservice.updateEmpById(empid,updateEmpForm).subscribe(
    result=>{
      // console.log(result); 
      this.closeEdModal()
      this.getAllEmp();
    },
    error=>{
      console.log(error); 
    }
  )
}

deleteEmpByid(emp_id:any){
   if(confirm('Are u want to delete')){
    this.empservice.removeEmployee(emp_id).subscribe(
    result=>{
      console.log(result);
      this.getAllEmp();
    },
    err=>{
      console.log(err);
      
    }) 
  } else {
    console.log('f');
  }
}

}
