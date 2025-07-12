import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { sprintModel } from "../Models/sprint";

@Injectable({
  providedIn: "root",
})
export class SprintService {
  apiUrl = "https://teamworksyncproject.onrender.com/";

  constructor(private http: HttpClient) {}
  postSprint(data: sprintModel): any {
    return this.http.post<any>(`${this.apiUrl}sprints/`, data);
  }
  getSprintByProject(projectid: string): any {
    return this.http.get<any[]>(`${this.apiUrl}sprints/project/${projectid}`);
  }
  getSprintById(sprintId: string): any {
    return this.http.get<any[]>(`${this.apiUrl}sprints/${sprintId}`);
  }
}
