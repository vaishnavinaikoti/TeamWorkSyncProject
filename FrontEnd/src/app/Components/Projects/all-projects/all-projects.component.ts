import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectService } from 'src/app/CommonServices/redirect.service';
import { ProjectModel } from 'src/app/Models/project';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ProjectAssignmentService } from 'src/app/Services/project-assignment.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css'],
})
export class AllProjectsComponent implements OnInit {
  projects!: ProjectModel[];
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  subscription: any;
  constructor(
    private projectApi: ProjectService,
    public redirectService: RedirectService,
    private authService: AuthenticationService,
    private projectassignmentService: ProjectAssignmentService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.IsLogedIn.subscribe((data) => {
      this.isLogedIn = data.IsLogin;
      this.isAdmin = data.IsAdmin;
    });
    this.authService.checkToken();
    if (this.isAdmin) {
      this.projectApi.getProjects().subscribe((data: ProjectModel[]) => {
        this.projects = data;
      });
    } else {
      if (this.isLogedIn) {
        this.projectassignmentService
          .getProjectByEmployee(this.authService.getUserData()._id)
          .subscribe((data: any) => {
            this.projects = data.map((obj:any)=>obj.project);
          });
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
