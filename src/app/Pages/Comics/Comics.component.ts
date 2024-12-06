import { Component, OnInit ,NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicsPersonalService } from '../../Service/Comics-personal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
})
export class ComicsComponent implements OnInit {
    personalComics: any[] = [];
    isModalOpen = false;
    modalData: any = {};
    editingComic: any = null;
  
    constructor(private comicsPersonalService: ComicsPersonalService) {}
  
    ngOnInit(): void {
      this.fetchPersonalComics();
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
  
    openComicModal(comic: any = null): void {
      this.isModalOpen = true;
      if (comic) {
        this.editingComic = comic;
        this.modalData = { ...comic };
      } else {
        this.editingComic = null;
        this.modalData = {
          titulo: '',
          descripcion: '',
          imagen_url: '',
          fecha_publicacion: '',
          editorial: '',
          precio: 0,
        };
      }
    }
  
    closeComicModal(): void {
      this.isModalOpen = false;
      this.modalData = {};
      this.editingComic = null;
    }
  
    saveComic(): void {
      if (this.editingComic) {
        this.comicsPersonalService.updateComic(this.editingComic.id, this.modalData).subscribe({
          next: () => {
            alert('Cómic actualizado con éxito');
            this.fetchPersonalComics();
            this.closeComicModal();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error updating comic:', err);
            alert('Error al actualizar el cómic');
          },
        });
      } else {
        this.comicsPersonalService.createComic(this.modalData).subscribe({
          next: () => {
            alert('Cómic agregado con éxito');
            this.fetchPersonalComics();
            this.closeComicModal();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error adding comic:', err);
            alert('Error al agregar el cómic');
          },
        });
      }
    }
  
    deleteComic(id: number): void {
      if (confirm('¿Estás seguro de que quieres eliminar este cómic?')) {
        this.comicsPersonalService.deleteComic(id).subscribe({
          next: () => {
            alert('Cómic eliminado con éxito');
            this.fetchPersonalComics();
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error deleting comic:', err);
            alert('Error al eliminar el cómic');
          },
        });
      }
    }
  }
  