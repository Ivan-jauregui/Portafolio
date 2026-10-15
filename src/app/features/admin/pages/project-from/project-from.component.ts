import { Component, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Project } from '../../../projects/models/project';
import { ProjectService } from '../../../projects/services/project-service/project-service';
import { TecnologyService} from '../../../projects/services/tecnology-service/tecnology-service';
import { Tecnology } from '../../../projects/models/tecnology';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-from',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './project-from.component.html',
  styleUrl: './project-from.component.css'
})
export class ProjectFromComponent implements OnInit{
  form:FormGroup;
  private project=signal<Project|null>(null)
  private idParam=signal<string|null>(null)

  tecnologies=signal<Tecnology[]>([])
  selectedTecnologies=signal<Tecnology[]>([])

  constructor(
    private fb:FormBuilder,
    private projectService:ProjectService,
    private tecnologyService:TecnologyService,
    private router:Router,
    private route:ActivatedRoute
  ){
    this.form  = fb.group({
      name:["",[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
      description:["",Validators.required],
    })
  }

  ngOnInit(){
    this.idParam.set(this.route.snapshot.paramMap.get('id'))
    this.projectService.getById(this.idParam()!).subscribe({
      next:(data)=>{
        this.project.set(data)
        this.form.patchValue(data)
        this.selectedTecnologies.set(data.tecnologies)
      },
      error:(err)=>{
        console.log("ERROR: error en el servidor: "+ err)
      }
    })

    this.tecnologyService.getAll().subscribe({
      next:(data)=>{
        this.tecnologies.set(data)
      },
      error:(err)=>{
        console.log("ERROR: error en el servidor: "+ err)
      }
    })
  }

 // Agrega la tecnología seleccionada a la segunda lista
selectTecnology(tec: Tecnology) {
  this.selectedTecnologies.update(list => {
    if (list.some(item => item.id === tec.id)){
      return list.filter(item=>item.id!=tec.id)
    }; 
    return [...list, tec];
  });
}



  onSubmit(){
    const formValue = this.form.value;

    if(this.idParam()){
      const updatedProject:Project={
        ...this.project(),
        ...formValue
      };
      this.projectService.update(this.idParam()!,updatedProject).subscribe({
          next:(data)=>{
            this.router.navigate(["/admin"]);
          },
          error:(err)=>{
            console.log("ERROR: error en el servidor: "+ err)
          }
      })
    }else{
      const newProject:Project={
        name:formValue.name,
        description:formValue.description,
        tecnologies:this.selectedTecnologies()
      };
     this.projectService.save(newProject).subscribe({
          next:(data)=>{
            this.router.navigate(["/admin"]);
          },
          error:(err)=>{
            console.log("ERROR: error en el servidor: "+ err)
          }
      })
    }
  }
  
}
