import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'publicaciones/:tipo-de-cosa',
    loadChildren: () => import('./pages/publicaciones/publicaciones.module').then( m => m.PublicacionesPageModule)
  }, 

  {
    path: 'publicaciones',
    loadChildren: () => import('./pages/publicaciones/publicaciones.module').then( m => m.PublicacionesPageModule)
  },  {
    path: 'pruebas',
    loadChildren: () => import('./pages/pruebas/pruebas.module').then( m => m.PruebasPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
