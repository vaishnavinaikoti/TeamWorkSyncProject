import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { sprintModel } from 'src/app/Models/sprint';
import { ProjectService } from 'src/app/Services/project.service';
import { SprintService } from 'src/app/Services/sprint.service';
import { DatePipe, formatDate } from '@angular/common';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css'],
})
export class SprintsComponent {
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  subscription!: any;
  SprintForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    SprintName: new FormControl(
      'Sprint#' +
        (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1)
          .toString()
    ),
  });

  currentSelectedProject: any;
  SprintsInProjects: any[] = [];
  NewSprintStartDate: any;
  NewSprintEndDate: any;
  CurrentSprint: any;
  constructor(
    private sprintservice: SprintService,
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
            this.getSprintsInProject(project);
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
  onSprintFormSubmit() {
    if (this.SprintForm.status == 'VALID') {
      var sprint: sprintModel = {
        project_id: this.currentSelectedProject._id,
        sprint_name: this.SprintForm.value.SprintName!,
        start_date: this.SprintForm.value.startDate!,
        end_date: this.SprintForm.value.endDate!,
      };
      this.sprintservice.postSprint(sprint).subscribe((data: any) => {
        alert('New Sprint Added Successfully.');
        window.location.reload();
      });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
  createSprint()
  {
    this.setSprintStartDate(this.currentSelectedProject);
  }
  getSprintsInProject(project: any) {
    this.sprintservice.getSprintByProject(project._id).subscribe(
      (sprints: any) => {
        if (sprints.length != 0) {
          this.SprintsInProjects = sprints;
          this.SprintsInProjects = this.AlterSprintsList(sprints);
        }
        this.setSprintStartDate(project);
      },
      (error: any) => {
        console.error('Error fetching employees in project:', error);
      }
    );
  }
  setSprintStartDate(project: any) {
    if (this.SprintsInProjects.length == 0) {
      this.NewSprintStartDate = project.start_date;
    } else {
      const latestSprint: any =
        this.SprintsInProjects[this.SprintsInProjects.length - 1];
      this.NewSprintStartDate = latestSprint.end_date;
    }
    this.SprintForm.controls['startDate'].setValue(
      formatDate(this.NewSprintStartDate, 'yyyy-MM-dd', 'en')
    );
  }
  setSprintEndDate(data: any) {
    const weeks = data.value;
    const endDate = new Date(
      new Date(this.NewSprintStartDate).getTime() +
        weeks * 7 * 24 * 60 * 60 * 1000
    );
    this.SprintForm.controls['endDate'].setValue(
      formatDate(endDate, 'yyyy-MM-dd', 'en')
    );
  }
  redirectToProjectDetails() {
    this.navigationRoute.navigate(['/project/detail'], {
      queryParams: { id: this.currentSelectedProject._id },
    });
  }
  redirectToAssignBacklogs(sprint: any) {
    this.navigationRoute.navigate(['/project/sprints/assign'], {
      queryParams: { id: sprint._id },
    });
  }
  FindCurrentSprint(list: any) {
    const TodayDate = new Date();
    var currentsprint = list.filter((obj: any) => {
      const startDate = new Date(obj.start_date);
      const endDate = new Date(obj.end_date);
      return startDate <= TodayDate && TodayDate <= endDate;
    });
    if (currentsprint == null) {
      currentsprint = list[list.length - 1];
    }
    return currentsprint;
  }
  AlterSprintsList(list: any): any[] {
    const cSprint = this.FindCurrentSprint(list);
    console.log(cSprint);
    return list.map((element: any) => ({
      ...element,
      Active: element._id == cSprint[0]._id,
    }));
  }
}
