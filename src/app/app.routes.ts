import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/Home/Home.component';
import { ReseñaComponent } from './Pages/Reseñas/Reseñas.component';
import { ComicsComponent } from './Pages/Comics/Comics.component';


export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'Reseña', component: ReseñaComponent,},
    { path: 'Comics', component: ComicsComponent,}




];
