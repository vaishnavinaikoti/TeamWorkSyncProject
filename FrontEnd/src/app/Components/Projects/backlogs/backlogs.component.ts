import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { backlogModel } from 'src/app/Models/backlog';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BacklogService } from 'src/app/Services/backlog.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-backlogs',
  templateUrl: './backlogs.component.html',
  styleUrls: ['./backlogs.component.css'],
})
export class BacklogsComponent {
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  currentSelectedProject: any;
  BacklogsList: any[] = [];
  BacklogForm = new FormGroup({
    backlogId: new FormControl(
      (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1)
        .toString(),
      [Validators.required]
    ),
    backlogTitle: new FormControl('', [Validators.required]),
    backlogDescription: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('NEW'),
  });
  subscription!: any;
  constructor(
    private backlogservice: BacklogService,
    private route: ActivatedRoute,
    private projectservice: ProjectService,
    private navigationRoute: Router, 
    private authService: AuthenticationService
  ) {}
  ngOnInit() {
    this.subscription = this.authService.IsLogedIn.subscribe((data) => {
      this.isLogedIn = data.IsLogin;
      this.isAdmin = data.IsAdmin;
    });
    this.authService.checkToken();
    this.route.queryParams.subscribe((params) => {
      const projectId = params['id'];
      if (projectId) {
        this.projectservice.getProjectById(projectId).subscribe(
          (project) => {
            this.currentSelectedProject = project;
            this.getbacklogList(this.currentSelectedProject._id);
          },
          (error) => {
            console.error('Error fetching projects:', error);
          }
        );
      } else {
        console.error('Project ID is missing');
      }
    });
  }

  getbacklogList(projectid: string) {
    this.backlogservice.getBacklogListByProject(projectid).subscribe((data) => {
      const bclist = data;
      this.BacklogsList[0] = bclist.filter(
        (e: any) => e.priority == 'Important'
      );
      this.BacklogsList[1] = bclist.filter(
        (e: any) => e.priority == 'High Priority'
      );
      this.BacklogsList[2] = bclist.filter(
        (e: any) => e.priority == 'Moderate Priority'
      );
      this.BacklogsList[3] = bclist.filter(
        (e: any) => e.priority == 'Low Priority'
      );
    });
  }
  statuslist: any = [
    'Important',
    'High Priority',
    'Moderate Priority',
    'Low Priority',
  ];
  onAddBacklogFormSubmit() {
    if (this.BacklogForm.status == 'VALID') {
      var backlog: backlogModel = {
        project_id: this.currentSelectedProject._id!,
        sprint_id:"",
        employee_id:"",
        backlogId: this.BacklogForm.value.backlogId!,
        backlogTitle: this.BacklogForm.value.backlogTitle!,
        backlogDescription: this.BacklogForm.value.backlogDescription!,
        priority: this.BacklogForm.value.priority!,
        status: 'NEW',
      };
      this.backlogservice.postBacklog(backlog).subscribe((data: any) => {
        alert('New Backlog Added Successfully.');
        window.location.reload();
      });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
  redirectToProjectDetails() {
    this.navigationRoute.navigate(
      ['/project/detail'],
      { queryParams: { id: this.currentSelectedProject._id } }
    );
  }
}
