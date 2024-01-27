import { Routes } from '@angular/router';
import { FotoComponent } from './camara/foto/foto.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'formulario',
    loadComponent: () => import('./paginas/formulario/formulario.page').then( m => m.FormularioPage)
  },
  {
    path: 'usuario',
    loadComponent: () => import('./paginas/usuario/usuario.page').then( m => m.UsuarioPage)
  },
  {
    path: 'foto',
    component: FotoComponent,
  }
  
];
