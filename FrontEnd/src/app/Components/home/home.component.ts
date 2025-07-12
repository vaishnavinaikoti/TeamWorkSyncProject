import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  subscription: any;
  AccountName: string = "";
  constructor(private authService: AuthenticationService) {
  }
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
}
