import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/Models/employee';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TempdataService } from 'src/app/Services/tempdata.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent {
  EmployeesList!: EmployeeModel[];
  isAdmin: boolean = false;
  constructor(
    private employeesService: EmployeeService,
    private authService: AuthenticationService,
    private router: Router,
    private tempservice: TempdataService
  ) {
    // this.isAdmin = true;
  }
  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe((data: EmployeeModel[]) => {
      this.InitAuth();
      console.log(this.isAdmin);
      this.EmployeesList = data;
    });
  }
  InitAuth() {
    this.isAdmin = (this.authService.IsAdmin());
  }
  Delete(employee: any) {
    this.employeesService.deleteEmployee(employee._id).subscribe((data) => {
      window.location.reload();
    });
  }
  Edit(employee: EmployeeModel) {
    this.tempservice.setSelectedEmployee(employee);
    this.router.navigateByUrl('/employees/edit');
  }
}
