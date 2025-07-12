import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BacklogService } from 'src/app/Services/backlog.service';
import { SprintService } from 'src/app/Services/sprint.service';
import { UserstoryService } from 'src/app/Services/userstory.service';

@Component({
  selector: 'app-assign-stories-to-sprint',
  templateUrl: './assign-stories-to-sprint.component.html',
  styleUrls: ['./assign-stories-to-sprint.component.css'],
})
export class AssignStoriesToSprintComponent {
  subscription: any;
  constructor(
    private userstoryservice: UserstoryService,
    private sprintservice: SprintService,
    private route: ActivatedRoute,
    private redirectRoute: Router,
    private backlogservice: BacklogService,
    private authService: AuthenticationService,
    private navigationRoute: Router
  ) {}
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  CurrentSprintStoriesList: any;
  AddingSprintList: any = [];
  AvailableStories: any;
  CurrentSprint: any;
  ngOnInit() {
    this.subscription = this.authService.IsLogedIn.subscribe((data) => {
      this.isLogedIn = data.IsLogin;
      this.isAdmin = data.IsAdmin;
    });
    this.authService.checkToken();
    this.route.queryParams.subscribe((params) => {
      const sprintId = params['id'];
      if (sprintId) {
        this.sprintservice.getSprintById(sprintId).subscribe(
          (sprint: any) => {
            this.CurrentSprint = sprint;
            this.listStoriesInSprint(sprint._id);
            this.getAllAvailableUserStories(sprint.project_id);
          },
          (error: any) => {
            console.error('Error fetching projects:', error);
          }
        );
      } else {
        console.error('Project ID is missing');
      }
    });
  }
  listStoriesInSprint(sprint: any) {
    this.backlogservice.getBacklogListBySprint(sprint).subscribe((data)=>{
      this.CurrentSprintStoriesList = data;
      console.log(this.CurrentSprintStoriesList);
    })
  }
  getAllAvailableUserStories(id: any) {
    this.backlogservice.getBacklogListByProject(id).subscribe((data) => {
      this.AvailableStories = data.filter(
        (item: any) => item.sprint_id == null
      );
      console.log(this.AvailableStories);
    });
  }
  AddToList(backlog: any) {
    this.AddingSprintList.push(backlog);
    this.AvailableStories = this.AvailableStories.filter(
      (item: any) => item.backlogId != backlog.backlogId
    );
    console.log(this.AddingSprintList);
  }
  SubmitAddedBacklogList() {
    this.backlogservice
      .assignBacklogsToSprint(this.AddingSprintList, this.CurrentSprint._id)
      .subscribe(
        (data) => {
          alert('UserStories Updated!');
          window.location.reload();
        },
        (error) => {
          window.alert(error);
        }
      );
  }
  redirectToBacklogs() {
    this.navigationRoute.navigate(
      ['/project/backlogs'],
      { queryParams: { id: this.CurrentSprint.project_id } }
    );
  }
}
