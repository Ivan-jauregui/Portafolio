import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';

@Component({
  selector: 'project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project:Project| null=null;
}
