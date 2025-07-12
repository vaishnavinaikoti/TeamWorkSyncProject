import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectModel } from "../Models/project";

@Injectable({
  providedIn: "root",
})
export class PopulateService {
  apiUrl = "https://teamworksyncproject.onrender.com/";
  constructor(private http: HttpClient) {}
  populateData(): any {
    return this.http.post<any>(`${this.apiUrl}populate/`, null);
  }
}
