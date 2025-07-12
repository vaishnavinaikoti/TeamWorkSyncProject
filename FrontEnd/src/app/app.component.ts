import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  AccountName = '';
  private subscription: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.subscription = this.authService.IsLogedIn.subscribe((data) => {
      this.isLogedIn = data.IsLogin;
      this.isAdmin = data.IsAdmin;
      this.AccountName = this.authService.getUserName();
    });

    this.authService.checkToken();
    this.AccountName = this.authService.getUserName();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  logout() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/');
  }
}
