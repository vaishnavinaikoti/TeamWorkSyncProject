import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BacklogService } from 'src/app/Services/backlog.service';
import { ProjectAssignmentService } from 'src/app/Services/project-assignment.service';
import { ProjectService } from 'src/app/Services/project.service';
import { SprintService } from 'src/app/Services/sprint.service';

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrls: ['./myitems.component.css'],
})
export class MyitemsComponent {
  statuslist: any = ['Active', 'Resolved', 'New', 'Pending'];
  constructor(
    private sprintservice: SprintService,
    private route: ActivatedRoute,
    private projectservice: ProjectService,
    private backlogservice: BacklogService,
    private navigationRoute: Router,
    private projectAssignmentService: ProjectAssignmentService,
    private authservice: AuthenticationService
  ) {}
  private AllSprintsList: any = [];
  CurrentProject: any;
  CurrentSprint: any;
  SelectedWorkItem: any;
  CurrentUser: any;
  AllWorkItemsInThisSprint: any = [];
  WorkItemForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const projectId = params['id'];
      if (projectId) {
        this.projectservice.getProjectById(projectId).subscribe(
          (project) => {
            this.CurrentProject = project;
            this.GetCurrentUser();
            this.GetAllSprintsByProject(project._id);
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
  GetAllSprintsByProject(projectId: any) {
    this.sprintservice.getSprintByProject(projectId).subscribe((data: any) => {
      this.AllSprintsList = data;
      this.FindCurrentSprint(data);
    });
  }
  GetCurrentUser() {
    this.CurrentUser = this.authservice.getUserData();
    console.log(this.CurrentUser);
  }
  FindCurrentSprint(list: any) {
    const TodayDate = new Date();
    console.log(list);
    this.CurrentSprint = list.filter((obj: any) => {
      const startDate = new Date(obj.start_date);
      const endDate = new Date(obj.end_date);
      return startDate <= TodayDate && TodayDate <= endDate;
    });
    if (this.CurrentSprint == null) {
      this.CurrentSprint = list[list.length - 1];
    }
    this.GetUserStoriesBySprint(this.CurrentSprint[0]._id);
  }
  GetUserStoriesBySprint(sprintId: any) {
    this.backlogservice.getBacklogListBySprint(sprintId).subscribe((data) => {
      this.AllWorkItemsInThisSprint = data
        .filter(
          (item: any) =>
            item.employee_id != null &&
            item.employee_id._id == this.CurrentUser._id
        )
        .reverse();
      console.log(this.AllWorkItemsInThisSprint);
    });
  }
  UpdateWorkItemStatus(item: any) {
    this.SelectedWorkItem = item;
    console.log(this.SelectedWorkItem);
  }
  onWorkItemFormSubmit() {
    if (this.WorkItemForm.status == 'VALID') {
      var workItem: any = {
        backlogId: this.SelectedWorkItem._id,
        status: this.WorkItemForm.value.status!,
      };
      console.log(workItem);
      this.backlogservice.updateBacklog(workItem).subscribe((data: any) => {
        alert('New Sprint Added Successfully.');
        window.location.reload();
      });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }

  redirectToProjectDetails() {
    this.navigationRoute.navigate(['/project/detail'], {
      queryParams: { id: this.CurrentProject._id },
    });
  }
}
