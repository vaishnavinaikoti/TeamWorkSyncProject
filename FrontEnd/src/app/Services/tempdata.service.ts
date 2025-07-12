import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempdataService {
  SelectedProject!: any;
  SelectedEmployee!: any;
  
  constructor() { }
  getSelectedProject() {
    return this.SelectedProject;
  }
  setSelectedProject(project: any) {
    this.SelectedProject = project;
  }
  getSelectedEmployee() {
    return this.SelectedEmployee;
  }
  setSelectedEmployee(Employee: any) {
    this.SelectedEmployee = Employee;
  }
}
