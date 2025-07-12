import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProjectService  } from '../../../Services/project.service';
import { ProjectModel } from 'src/app/Models/project';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  constructor(private projectservice: ProjectService) {}

  projectForm = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    projectDescription: new FormControl('', [Validators.required]),
    storypoints: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
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
      this.projectservice.postProject(project).subscribe((data: any) => {
        alert('New Project Added Successfully.');
        this.projectForm.reset();
      });
    } else {
      alert('Enter Valid Data! All Feilds Are Required.');
    }
  }
}

