import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { PopulateService } from 'src/app/Services/populate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    private authenticateService: AuthenticationService,
    private populateService: PopulateService
  ) {}
  UserProfile: any;
  ngOnInit(): void {
    this.UserProfile = this.authenticateService.getUserData();
    console.log(this.UserProfile);
  }
  populate() {
    this.populateService.populateData().subscribe((data: any) => {
      console.log('Data population', data);
    });
  }
}
