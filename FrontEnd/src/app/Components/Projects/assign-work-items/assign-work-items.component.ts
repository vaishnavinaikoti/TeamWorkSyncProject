import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BacklogService } from 'src/app/Services/backlog.service';
import { ProjectAssignmentService } from 'src/app/Services/project-assignment.service';
import { ProjectService } from 'src/app/Services/project.service';
import { SprintService } from 'src/app/Services/sprint.service';

@Component({
  selector: 'app-assign-work-items',
  templateUrl: './assign-work-items.component.html',
  styleUrls: ['./assign-work-items.component.css'],
})
export class AssignWorkItemsComponent implements OnInit {
  constructor(
    private sprintservice: SprintService,
    private route: ActivatedRoute,
    private projectservice: ProjectService,
    private backlogservice:BacklogService,
    private navigationRoute: Router,
    private projectAssignmentService : ProjectAssignmentService,
  ) {}
  private AllSprintsList: any = [];
  AllWorkItemsInThisSprint:any = [];
  AllUnAssignesWorkItemsInThisSprint:any = [];
  EmployeesInProject:any = [];
  UserStoryStatus:any = ["New","Active","Resolved","Blocker"];
  CurrentProject: any;
  CurrentSprint: any;
  SelectedStory:any;
  AssignWorkItemForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
    employeeId: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const projectId = params['id'];
      if (projectId) {
        this.projectservice.getProjectById(projectId).subscribe(
          (project) => {
            this.CurrentProject = project;
            this.GetAllSprintsByProject(project._id);
            this.getEmployeesInProject(project);
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

  getEmployeesInProject(project: any) {
    this.projectAssignmentService.getEmployeesByProject(project._id).subscribe(
      (employees: any) => {
        this.EmployeesInProject = employees[0];
        console.log(this.EmployeesInProject);
      },
      (error: any) => {
        console.error('Error fetching employees in project:', error);
      }
    );
  }
  FindCurrentSprint(list: any) {
    const TodayDate = new Date();
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
  GetUserStoriesBySprint(sprintId:any)
  {
    this.backlogservice.getBacklogListBySprint(sprintId).subscribe
    ((data)=>{
      this.AllWorkItemsInThisSprint  = data;
      console.log(sprintId,data);
      this.AllUnAssignesWorkItemsInThisSprint = data.filter((item:any)=>item.employee_id == null);
      console.log(this.AllUnAssignesWorkItemsInThisSprint);
      
    });
  }
  ToggleStory(story:any)
  {
    this.SelectedStory = story;
    console.log(story);
  }
  onAssignWorkItemFormSubmit()
  {
    if (this.AssignWorkItemForm.status == 'VALID') {
      const updateBacklog = {
        "backlogId":this.SelectedStory._id,
        "status":this.AssignWorkItemForm.value.status!,
        "employeeId":this.AssignWorkItemForm.value.employeeId!,
      }
      this.backlogservice.setTeamMemberAndStatus(updateBacklog).subscribe(
        (data:any)=>{
          alert("Work Item Assigned, Successfully.");
          window.location.reload();
        }
      )
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
  redirectToSprint() {
    console.log(this.CurrentProject);
    this.navigationRoute.navigate(
      ['/project/detail'],
      { queryParams: { id: this.CurrentProject._id } }
    );
  }
}
