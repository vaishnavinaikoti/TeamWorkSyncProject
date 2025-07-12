import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Models/login';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    if (this.LoginForm.status == 'VALID') {
      const logindata: LoginModel = {
        email: this.LoginForm.value.Email!,
        password: this.LoginForm.value.Password!,
      };
      this.employeeService.SignIn(logindata).subscribe((data) => {
        if (data != null) {
          this.authService.storeToken(data);
          this.router.navigateByUrl('/');
        } else {
          alert('Wrong Credientials! Try Again');
          this.LoginForm.reset();
        }
      });
    } else {
      alert('Enter Valid Data!');
    }
  }
}
