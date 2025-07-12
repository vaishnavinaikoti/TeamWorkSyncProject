import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backlogModel } from '../Models/backlog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BacklogService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  postBacklog(data: backlogModel): any {
    return this.http.post<any>(`${this.apiUrl}backlogs`, data);
  }
  getBacklogListByProject(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}backlogs/project/${id}`);
  }
  getBacklogListBySprint(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}backlogs/sprint/${id}`);
  }
  assignBacklogsToSprint(backloglist: backlogModel[], sprintId: string) {
    const data = {
      sprintId: sprintId,
      list: backloglist,
    };
    return this.http.post<any>(`${this.apiUrl}backlogs/assign`, data);
  }
  setTeamMemberAndStatus(data: any) {
    return this.http.post<any>(`${this.apiUrl}backlogs/assign/team`, data);
  }
  updateBacklog(data: any) {
    return this.http.post<any>(`${this.apiUrl}backlogs/update`, data);
  }
}
