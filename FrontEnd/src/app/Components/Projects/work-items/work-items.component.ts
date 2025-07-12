import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BacklogService } from 'src/app/Services/backlog.service';
import { ProjectAssignmentService } from 'src/app/Services/project-assignment.service';
import { ProjectService } from 'src/app/Services/project.service';
import { SprintService } from 'src/app/Services/sprint.service';

@Component({
  selector: 'app-work-items',
  templateUrl: './work-items.component.html',
  styleUrls: ['./work-items.component.css']
})
export class WorkItemsComponent implements OnInit{
  constructor(
    private sprintservice: SprintService,
    private route: ActivatedRoute,
    private projectservice: ProjectService,
    private backlogservice:BacklogService,
    private navigationRoute: Router,
    private projectAssignmentService : ProjectAssignmentService,
  ) {}
  private AllSprintsList: any = [];
  CurrentProject: any;
  CurrentSprint: any;
  AllWorkItemsInThisSprint:any = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const projectId = params['id'];
      if (projectId) {
        this.projectservice.getProjectById(projectId).subscribe(
          (project) => {
            this.CurrentProject = project;
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
  GetUserStoriesBySprint(sprintId:any)
  {
    this.backlogservice.getBacklogListBySprint(sprintId).subscribe
    ((data)=>{
      this.AllWorkItemsInThisSprint = data.filter((item:any)=>item.employee_id !=null).reverse();
      console.log(this.AllWorkItemsInThisSprint);
    });
  }
  redirectToProjectDetails() {
    this.navigationRoute.navigate(
      ['/project/detail'],
      { queryParams: { id: this.CurrentProject._id } }
    );
  }
}
