import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RequestService } from '../../../home/services/request/request.service';
import { ProjectRequest } from '../../../home/models/projectRequest';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  lucideArrowLeft, 
  lucideMail, 
  lucideCalendar, 
  lucideTrash2 
} from '@ng-icons/lucide';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIcon, CurrencyPipe],
  providers: [
    provideIcons({ 
      lucideArrowLeft, 
      lucideMail, 
      lucideCalendar, 
      lucideTrash2 
    })
  ],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent implements OnInit {
  idParam = signal<string | null>(null);
  request = signal<ProjectRequest | null>(null);
  
  private requestService = inject(RequestService);
  private router = inject(Router); 
  private route = inject(ActivatedRoute); // Inyección moderna recomendada

  ngOnInit() {
    this.idParam.set(this.route.snapshot.paramMap.get('id'));

    if (this.idParam()) {
      this.requestService.getById(this.idParam()!).subscribe({
        next: (data) => {
          this.request.set(data);
        },
        error: (err) => {
          console.error("ERROR: error en el servidor: " + err);
        }
      });
    }
  }
   
  deleteRequest(id: string) {
    this.requestService.delete(id).subscribe({
      next: () => {
        console.log('Solicitud eliminada con éxito');
        this.router.navigate(['/project/requests']); 
      },
      error: (err) => {
        console.error('Error al intentar eliminar:', err);
      }
    });
  }
}