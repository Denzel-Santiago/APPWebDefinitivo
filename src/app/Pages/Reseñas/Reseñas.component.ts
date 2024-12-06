import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResenasService } from '../../Service/Reseñas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Resena } from '../../../interfaces/Resena';

@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './Reseñas.component.html',
  styleUrls: ['./Reseñas.component.css'],
})
export class ReseñaComponent implements OnInit {
  resenas: Resena[] = [];

  constructor(private resenasService: ResenasService) {}

  ngOnInit(): void {
    this.loadResenas();
  }

  // Carga todas las reseñas
  loadResenas(): void {
    this.resenasService.getAllResenas().subscribe({
      next: (data: Resena[]) => {
        this.resenas = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar reseñas:', err);
      },
    });
  }

  // Crea una nueva reseña con los datos ingresados
  createResena(): void {
    const contenido = prompt('Ingrese el contenido de la reseña:');
    const calificacion = prompt('Ingrese la calificación (1-5):');
    const usuario = prompt('Ingrese su nombre de usuario:');
    const comic_id = prompt('Ingrese el ID del cómic asociado a la reseña:');

    if (contenido && calificacion && usuario && comic_id) {
      const nuevaResena: Resena = {
        comic_id: parseInt(comic_id, 10),
        contenido,
        calificacion: parseInt(calificacion, 10),
        usuario,
      };

      this.resenasService.createResena(nuevaResena).subscribe({
        next: () => {
          alert('Reseña creada con éxito.');
          this.loadResenas();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al crear reseña:', err);
          alert('No se pudo crear la reseña.');
        },
      });
    } else {
      alert('Por favor complete todos los campos correctamente.');
    }
  }

  // Elimina una reseña
  deleteResena(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID de la reseña no es válido.');
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      this.resenasService.deleteResena(id).subscribe({
        next: () => {
          alert('Reseña eliminada con éxito.');
          this.loadResenas();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al eliminar reseña:', err);
          alert('No se pudo eliminar la reseña.');
        },
      });
    }
  }
  
}
