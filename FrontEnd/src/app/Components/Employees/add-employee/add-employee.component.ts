import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  constructor(private employeeService: EmployeeService) {}
  EmployeeForm = new FormGroup({
    Firstname: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    HireDate: new FormControl('', [Validators.required]),
    Phonenumber: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Role: new FormControl('', [Validators.required]),
    Salary: new FormControl('', [Validators.required]),
    Status: new FormControl('', [Validators.required]),
    EmpID: new FormControl(
      (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1)
        .toString()
    ),
  });
  
  onSubmit() {
    if (this.EmployeeForm.status == 'VALID') {
      const EmployeeDataObject: EmployeeModel = {
        first_name: this.EmployeeForm.value.Firstname!,
        last_name: this.EmployeeForm.value.LastName!,
        email: this.EmployeeForm.value.Email!,
        password: this.EmployeeForm.value.Password!,
        hire_date: this.EmployeeForm.value.HireDate!,
        phone_number: this.EmployeeForm.value.Phonenumber!,
        address: this.EmployeeForm.value.Address!,
        role: this.EmployeeForm.value.Role!,
        salary: this.EmployeeForm.value.Salary!,
        working_status: this.EmployeeForm.value.Status!,
        empid: this.EmployeeForm.value.EmpID!,
      };
      this.employeeService
        .postEmployee(EmployeeDataObject)
        .subscribe((data: any) => {
          alert('New Employee Added Successfully.');
          window.location.reload();
        });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
}
