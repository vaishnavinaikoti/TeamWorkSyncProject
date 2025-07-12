import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../Models/employee';
import { LoginModel } from '../Models/login';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}employees/`);
  }
  postEmployee(data: EmployeeModel): any {
    return this.http.post<any>(`${this.apiUrl}employees/`, data);
  }
  SignIn(data: LoginModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}employees/employee`, data);
  }
  // SignIn(data: LoginModel): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}employees/employee`, data);
  // }
  deleteEmployee(id: string) {
    const url = `${this.apiUrl}employees/${id}`;
    return this.http.delete<any>(url);
  }
  updateEmployee(employeeId: string, employeeData: EmployeeModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}employees/${employeeId}`, employeeData);
  }
}
