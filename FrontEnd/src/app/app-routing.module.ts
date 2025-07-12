import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './Components/Projects/all-projects/all-projects.component';
import { AddProjectComponent } from './Components/Projects/add-project/add-project.component';
import { EditProjectComponent } from './Components/Projects/edit-project/edit-project.component';
import { AllEmployeesComponent } from './Components/Employees/all-employees/all-employees.component';
import { AddEmployeeComponent } from './Components/Employees/add-employee/add-employee.component';
import { ProjectDetailComponent } from './Components/Projects/project-detail/project-detail.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { BacklogsComponent } from './Components/Projects/backlogs/backlogs.component';
import { SprintsComponent } from './Components/Projects/sprints/sprints.component';
import { AssignStoriesToSprintComponent } from './Components/Projects/assign-stories-to-sprint/assign-stories-to-sprint.component';
import { WorkItemsComponent } from './Components/Projects/work-items/work-items.component';
import { AssignWorkItemsComponent } from './Components/Projects/assign-work-items/assign-work-items.component';
import { authGuard } from './Gaurds/auth.guard';
import { MyitemsComponent } from './Components/Projects/myitems/myitems.component';
import { ProfileComponent } from './Components/Employees/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // any logged users
  { path: 'projects', component: AllProjectsComponent },
  // admin user
  {
    path: 'projects/AddProject',
    component: AddProjectComponent,
    canActivate: [authGuard],
    data: {
      expectedRole: 'ADMIN',
    },
  },
  // admin user
  {
    path: 'project/edit',
    component: EditProjectComponent,
    canActivate: [authGuard],
    data: {
      expectedRole: 'ADMIN',
    },
  },
  // any logged users
  {
    path: 'project/detail',
    component: ProjectDetailComponent,
  },
  {
    path: 'project/backlogs',
    component: BacklogsComponent,
  },
  {
    path: 'project/sprints',
    component: SprintsComponent,
  },
  {
    path: 'project/sprints/assign',
    component: AssignStoriesToSprintComponent,
  },
  {
    path: 'project/workitems',
    component: WorkItemsComponent,
  },
  {
    path: 'project/assign/workitems',
    component: AssignWorkItemsComponent,
    canActivate: [authGuard],
    data: {
      expectedRole: 'ADMIN',
    },
  },
  // any logged users
  {
    path: 'team',
    component: AllEmployeesComponent,
  },
  //// admin user
  {
    path: 'team/add',
    component: AddEmployeeComponent,
    // canActivate: [authGuard],
    // data: {
    //   expectedRole: 'ADMIN',
    // },
  },
  {
    path:"project/myitems",
    component: MyitemsComponent
  },
  {
    path:"profile",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
