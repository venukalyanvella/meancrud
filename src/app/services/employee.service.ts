import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _apiUrl=`http://localhost:3000/api`;

  constructor(private _http:HttpClient) { }

  //Add Employee
  newEmployee(empForm){
    return this._http.post(this._apiUrl+`${'/newEmployee'}`,empForm)
  }

  //getAll Employees
  getAllEmployees(){
    return this._http.get(this._apiUrl+`${'/employees'}`)
  }
  
  //get Employee by id 
  getEmployeeById(emp_id){
    return this._http.get(this._apiUrl+`${'/getByid/'}${emp_id}`)
  }
  
  //update Employee
  updateEmpById(emp_id,data){
    return this._http.put(this._apiUrl+`${'/updateemp/'}${emp_id}`,data)
  }
  //remove Employee
  removeEmployee(emp_id){
    return this._http.delete(this._apiUrl+`${'/removeemp/'}${emp_id}`)
  }

  removeAllEmp(id:any){
    return this._http.delete(this._apiUrl+`${'/removeAll/'}${id}`)
  }

}

