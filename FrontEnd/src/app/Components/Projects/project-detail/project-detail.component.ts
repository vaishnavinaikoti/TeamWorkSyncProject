import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';

import { ProjectService } from 'src/app/Services/project.service';
import { ProjectAssignmentService } from 'src/app/Services/project-assignment.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EmployeeModel } from 'src/app/Models/employee';
import { sprintModel } from 'src/app/Models/sprint';
import { SprintService } from 'src/app/Services/sprint.service';
import { userstoryModel } from 'src/app/Models/userstory';
import { UserstoryService } from 'src/app/Services/userstory.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { BacklogService } from 'src/app/Services/backlog.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  donutData: any = null;
  currentSelectedProject: any;
  CurrentRunningSprint: any;
  EmployeesList: any[] = [];
  EmployeesInProject: any[] = [];
  SprintsInProjects: any[] = [];
  UserStoriesList: any[] = [];
  subscription: any;
  isLogedIn: boolean = false;
  isAdmin: boolean = false;
  employeeForm = new FormGroup({
    selectedEmployees: new FormControl([]),
  });
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
  UserstoryForm = new FormGroup({
    sprintId: new FormControl(''),
    employeeId: new FormControl(''),
    userstoryName: new FormControl(
      (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1)
        .toString(),
      [Validators.required]
    ),
    description: new FormControl('', [Validators.required]),
    status: new FormControl(''),
  });

  constructor(
    private projectservice: ProjectService,
    private sprintservice: SprintService,
    private projectAssignment: ProjectAssignmentService,
    private employeesService: EmployeeService,
    private userstoryservice: UserstoryService,
    private backlogservice: BacklogService,
    private route: ActivatedRoute,
    private redirectRoute: Router,
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
            this.getEmployeesInProject(project);
            this.getSprintsInProject(project);
          },
          (error) => {
            console.error('Error fetching project:', error);
          }
        );
      } else {
        console.error('Project ID is missing');
      }
    });
    this.getAllEmployees();
  }

  getEmployeesInProject(project: any) {
    this.projectAssignment.getEmployeesByProject(project._id).subscribe(
      (employees: any) => {
        this.EmployeesInProject = employees;
        console.log(this.EmployeesInProject);
      },
      (error: any) => {
        console.error('Error fetching employees in project:', error);
      }
    );
  }
  async getSprintsInProject(project: any) {
    this.sprintservice.getSprintByProject(project._id).subscribe(
      (sprints: any) => {
        this.SprintsInProjects = sprints;
        if (this.SprintsInProjects.length > 0) {
          this.updateChart(sprints[0]);
        }
      },
      (error: any) => {
        console.error('Error fetching employees in project:', error);
      }
    );
  }
  getAllEmployees() {
    this.employeesService.getEmployees().subscribe(
      (data: EmployeeModel[]) => {
        this.EmployeesList = data.map((emp) => ({ ...emp, selected: false }));
      },
      (error) => {
        console.error('Error fetching all employees:', error);
      }
    );
  }
  listUserStories(sprint: any) {
    var newCount = 0;
    var activeCount = 0;
    var resolvedCount = 0;
    var blockerCount = 0;
    this.userstoryservice.getUserStoriesBySprint(sprint._id).subscribe(
      (userstorylist: any) => {
        this.UserStoriesList = userstorylist;
        this.UserStoriesList.forEach((obj) => {
          switch (obj.status) {
            case 'new':
              newCount++;
              break;
            case 'old':
              activeCount++;
              break;
            case 'regular':
              blockerCount++;
              break;
            case 'regular':
              resolvedCount++;
              break;
          }
        });
        this.donutData[0].value = 50;
        this.donutData[1].value = 50;
        this.donutData[2].value = 0;
        this.donutData[3].value = 0;

        console.log(this.donutData);
      },
      (error: any) => {
        console.error('Error fetching all employees:', error);
      }
    );
  }
  updateChart(sprint: any) {
    var newCount = 0;
    var activeCount = 0;
    var resolvedCount = 0;
    var blockerCount = 0;
    this.backlogservice.getBacklogListBySprint(sprint._id).subscribe(
      (userstorylist: any) => {
        if (userstorylist.length > 0) {
          this.UserStoriesList = userstorylist;
          this.UserStoriesList.forEach((obj) => {
            switch (obj.status) {
              case 'New':
                newCount++;
                break;
              case 'Active':
                activeCount++;
                break;
              case 'Resolved':
                resolvedCount++;
                break;
              case 'Blocker':
                blockerCount++;
                break;
            }
            this.donutData = [
              { name: 'New', value: newCount, color: '#b2dafb' },
              { name: 'Active', value: activeCount, color: '#fc8d2b' },
              { name: 'Resolved', value: resolvedCount, color: '#32c563' },
              { name: 'Blocker', value: blockerCount, color: '#ff4778' },
            ];
          });
        } else {
          this.donutData = [
            { name: 'New', value: 100, color: '#b2dafb' },
            { name: 'Active', value: 0, color: '#fc8d2b' },
            { name: 'Resolved', value: 0, color: '#32c563' },
            { name: 'Blocker', value: 0, color: '#ff4778' },
          ];
        }
      },
      (error: any) => {
        console.error('Error fetching all employees:', error);
      }
    );
  }

  onSelectedEmployeesSubmit() {
    const selectedEmployees = this.EmployeesList.filter(
      (emp: any) => emp.selected
    ).map((e: any) => e._id);
    console.log(selectedEmployees);
    this.projectAssignment
      .PutProjectTeam({
        project_id: this.currentSelectedProject._id,
        employees_id: selectedEmployees,
      })
      .subscribe(
        (data: any) => {
          alert('New Employee Added Successfully.');
          window.location.reload();
        },
        (error: any) => {
          console.error('Error adding employees to project:', error);
        }
      );
  }
  getRandomName() {
    return (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1)
      .toString();
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
  onUserStoryFormSubmit() {
    if (this.UserstoryForm.status == 'VALID') {
      var userstory: userstoryModel = {
        sprint_id: this.UserstoryForm.value.sprintId!,
        employee_id: this.UserstoryForm.value.employeeId!,
        name: this.UserstoryForm.value.userstoryName!,
        description: this.UserstoryForm.value.description!,
        status: 'NEW',
      };
      this.userstoryservice.postUserStory(userstory).subscribe((data: any) => {
        alert('New User Story Added Successfully.');
        window.location.reload();
      });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
  FindCurrentSprint(list: any) {
    const TodayDate = new Date();
    var currentsprint = list.filter((obj: any) => {
      const startDate = new Date(obj.start_date);
      const endDate = new Date(obj.end_date);
      return startDate <= TodayDate && TodayDate <= endDate;
    });
    if (currentsprint != null) {
      return currentsprint;
    }
    if (currentsprint == null) {
      return list[list.length - 1];
    }
  }
  RedirectToBacklogs() {
    this.redirectRoute.navigate(['project/backlogs'], {
      queryParams: { id: this.currentSelectedProject._id },
    });
  }
  RedirectToSprints() {
    this.redirectRoute.navigate(['project/sprints'], {
      queryParams: { id: this.currentSelectedProject._id },
    });
  }
  RedirectToWorkItems() {
    this.redirectRoute.navigate(['project/workitems'], {
      queryParams: { id: this.currentSelectedProject._id },
    });
  }
  RedirectToAssignWorkItems() {
    this.redirectRoute.navigate(['project/assign/workitems'], {
      queryParams: { id: this.currentSelectedProject._id },
    });
  }
  RedirectToProjects() {
    this.redirectRoute.navigate(['projects']);
  }
  RedirectToMyAssignments() {
    this.redirectRoute.navigate(['project/myitems'], {
      queryParams: { id: this.currentSelectedProject._id },
    });
  }
}
