import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectModel } from '../Models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  postProject(data: ProjectModel): any {
    return this.http.post<any>(`${this.apiUrl}projects/`, data);
  }
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}projects/`);
  }
  deleteProject(id: string) {
    const url = `${this.apiUrl}projects/${id}`;
    return this.http.delete<any>(url);
  }
  updateProject(Id: string, project: ProjectModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}projects/${Id}`, project);
  }
  getProjectById(id:any):Observable<any>
  {
    console.log(id);
    return this.http.get<any[]>(`${this.apiUrl}projects/${id}`);
  }
 
}
