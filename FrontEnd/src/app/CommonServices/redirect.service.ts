import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private router: Router
  ) { }
  RedirectTo(URL:String) {
    this.router.navigate([URL]);
  }
}

