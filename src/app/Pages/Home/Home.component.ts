import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicsService } from '../../Service/Home.service'; // Servicio de la API pública
import { ComicsPersonalService } from '../../Service/Comics-personal.service'; // Servicio de tu API personalizada
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  publicComics: any[] = []; 
  personalComics: any[] = []; 

  constructor(
    private comicsService: ComicsService, 
    private comicsPersonalService: ComicsPersonalService 
  ) {}

  ngOnInit(): void {
    this.fetchPublicComics(); 
    this.fetchPersonalComics(); 
  }

  fetchPublicComics(): void {
    this.comicsService.getComics().subscribe({
      next: (data: any) => {
        this.publicComics = data?.results || [];
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching public comics:', err); 
      },
    });
  }

  
  fetchPersonalComics(): void {
    this.comicsPersonalService.getAllComics().subscribe({
      next: (data: any) => {
        this.personalComics = data || []; 
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching personal comics:', err); 
      },
    });
  }
}
