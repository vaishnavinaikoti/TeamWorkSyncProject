import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenModel } from '../Models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public data: boolean = false;
  private dataSubject = new Subject<TokenModel>();
  public IsLogedIn: Observable<TokenModel>;

  constructor() {
    this.IsLogedIn = this.dataSubject.asObservable();
  }

  ngOnInit(): void {}

  updateData(status: boolean, adminstatus: boolean) {
    this.data = status;
    this.dataSubject.next({
      IsLogin: status,
      IsAdmin: adminstatus,
    });
  }

  checkToken() {
    const data = JSON.parse(localStorage.getItem('logintoken')!);
    if (data) {
      this.updateData(true, this.IsAdmin());
    } else {
      this.updateData(false, this.IsAdmin());
    }
  }
  storeToken(data: any) {
    localStorage.setItem('logintoken', JSON.stringify(data));
    this.updateData(true, this.IsAdmin());
  }
  deleteToken() {
    localStorage.clear();
    this.updateData(false, this.IsAdmin());
  }
  getLoginStatus() {
    this.IsLogedIn.subscribe((data: any) => {
      return data;
    });
  }
  getUserName() {
    const data = JSON.parse(localStorage.getItem('logintoken')!);
    if (data != null) return data.first_name + ' ' + data.last_name;
    else return 'user name';
  }
  getEmployeeId() {
    const data = JSON.parse(localStorage.getItem('logintoken')!);
    return data.empid;
  }
  getUserData(){
    return JSON.parse(localStorage.getItem('logintoken')!);
  }
  IsAdmin() {
    const data = JSON.parse(localStorage.getItem('logintoken')!);
    if (data && data.role == 'ADMIN') {
      return true;
    }
    return false;
  }
}
