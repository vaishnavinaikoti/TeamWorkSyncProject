import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PiechartService {
  apiUrl = "https://teamworksyncproject.onrender.com/";
  constructor(private http: HttpClient) {}
  getProjectStatus(sprintid: any) {
    this.getUserStoriesBySprint(sprintid).subscribe((data: any) => {
      var userstories = data;
    });
  }
  getUserStoriesBySprint(sprintId: string): any {
    return this.http.get<any[]>(`${this.apiUrl}userstories/sprint/${sprintId}`);
  }
}
