import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectModel } from 'src/app/Models/project';
import { ProjectService } from 'src/app/Services/project.service';
import { TempdataService } from 'src/app/Services/tempdata.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  currentSelectedProject: any;
  projectForm!: FormGroup;
  constructor(
    private projectservice: ProjectService,
    private router: Router,
    private tempservice: TempdataService
  ) {
    this.currentSelectedProject = tempservice.getSelectedProject();
  }

  ngOnInit(): void {
    if (this.currentSelectedProject == null) {
      this.router.navigateByUrl('/');
    } else {
      console.log(this.currentSelectedProject);
      this.projectForm = new FormGroup({
        projectName: new FormControl(this.currentSelectedProject.project_name, [
          Validators.required,
        ]),
        projectDescription: new FormControl(
          this.currentSelectedProject.project_description,
          [Validators.required]
        ),
        storypoints: new FormControl(
          this.currentSelectedProject.total_story_points,
          [Validators.required]
        ),
        status: new FormControl(this.currentSelectedProject.project_status, [
          Validators.required,
        ]),
        startDate: new FormControl(this.currentSelectedProject.start_date, [
          Validators.required,
        ]),
        endDate: new FormControl(this.currentSelectedProject.end_date, [
          Validators.required,
        ]),
      });
    }
  }
  onSubmit() {
    if (this.projectForm.status == 'VALID') {
      var project: ProjectModel = {
        project_name: this.projectForm.value.projectName!,
        project_description: this.projectForm.value.projectDescription!,
        project_manager: 'bhaskar',
        total_story_points: Number(this.projectForm.value.storypoints)!,
        completed_story_points: 0,
        project_status: this.projectForm.value.status!,
        start_date: this.projectForm.value.startDate!,
        end_date: this.projectForm.value.endDate!,
      };
      this.projectservice.updateProject(this.currentSelectedProject._id,project).subscribe((data: any) => {
        alert('Project Updated Successfully.');
        this.projectForm.reset();
      });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
}
