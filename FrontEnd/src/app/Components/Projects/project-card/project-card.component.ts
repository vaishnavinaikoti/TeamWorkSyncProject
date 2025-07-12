import { Component, Input } from '@angular/core';
import { ProjectModel } from 'src/app/Models/project';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { TempdataService } from 'src/app/Services/tempdata.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input()
  projectDetailes!: ProjectModel;
  @Input()
  isAdmin: boolean = false;
  imageslist = [
    '../../../../assets/project1.jpg',
    '../../../../assets/project2.jpg',
    '../../../../assets/project3.avif',
    '../../../../assets/project4.webp',
    '../../../../assets/project5.svg',
    '../../../../assets/project6.png',
    '../../../../assets/project7.png',
    '../../../../assets/project8.jpg',
    '../../../../assets/project9.jpg',
    '../../../../assets/project10.jpg',
  ];

  constructor(
    private route: Router,
    private projectservice: ProjectService,
    private tempservice: TempdataService
  ) {}
  Edit(project: any) {
    this.tempservice.setSelectedProject(project);
    this.route.navigateByUrl('/project/edit');
  }
  SelectProject(project: any) {
    this.route.navigate(['/project/detail'], {
      queryParams: { id: project._id },
    });
  }
  Delete(project: any) {
    console.log(this.projectDetailes);
    this.projectservice
      .deleteProject(this.projectDetailes._id!)
      .subscribe((data: any) => {
        window.location.reload();
      });
  }
  RandomImage() {
    return this.imageslist[Math.floor(Math.random() * 10)];
  }
}
