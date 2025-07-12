import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectModel } from '../Models/project';

@Injectable({
  providedIn: 'root'
})
export class PopulateService {

  apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}
  populateData(): any {
    return this.http.post<any>(`${this.apiUrl}populate/`,null);
  }
}
