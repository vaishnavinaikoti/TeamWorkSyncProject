import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sprintModel } from '../Models/sprint';
import { userstoryModel } from '../Models/userstory';

@Injectable({ 
  providedIn: 'root'
})
export class UserstoryService {

  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  postUserStory(data:userstoryModel): any {
    return this.http.post<any>(`${this.apiUrl}userstories/`, data);
  }
  getUserStoriesBySprint(sprintId: string):any {
    return this.http.get<any[]>(
      `${this.apiUrl}userstories/sprint/${sprintId}`
    );
  }
}
