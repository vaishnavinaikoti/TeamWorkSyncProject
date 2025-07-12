import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectAssignmentModel } from '../Models/project-assignment';

@Injectable({
  providedIn: 'root',
})
export class ProjectAssignmentService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  PutProjectTeam(data: ProjectAssignmentModel): any {
    return this.http.put<any>(`${this.apiUrl}projectassignments/`, data);
  }
  getEmployeesByProject(projectid: string):any {
    return this.http.get<any[]>(
      `${this.apiUrl}projectassignments/project/${projectid}`
    );
  }
  getProjectByEmployee(employeeid:any):any{
    return this.http.get<any[]>(
      `${this.apiUrl}projectassignments/user/${employeeid}`
    );
  }
}
