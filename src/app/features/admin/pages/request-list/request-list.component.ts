import { Component, inject, OnInit, signal } from '@angular/core';
import { RequestService } from '../../../home/services/request/request.service';
import { ProjectRequest } from '../../../home/models/projectRequest';
import { NgIcon } from '@ng-icons/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-list',
  imports: [NgIcon],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{
  requestService = inject(RequestService);
  requests = signal<ProjectRequest[]>([]);

  
  constructor(private router:Router){}
  
  ngOnInit(){
    this.requestService.getAll().subscribe({
      next:(data)=>{
        this.requests.set(data)
      },
      error:(err)=>{
        console.log("ERROR: error en el servidor: "+ err)
      }
    })
  }

  goToDetails(id:string){
      this.router.navigate(["/projects/request/detail/",id])
  }

  goToUpdate(id:string){
    this.router.navigate(["/form/project",id])
  }

  deleteRequest(id:string){
    this.requestService.delete(id).subscribe({
      next:()=>{
        this.requests.update(requestList => requestList.filter(r=>r.id!=id));
      },
      error:(err)=>{
         console.log("ERROR: error en el servidor: "+ err)
      }
    })
  }
  }

