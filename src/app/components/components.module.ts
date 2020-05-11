import { NuevaPublicacionComponent } from './nueva-publicacion/nueva-publicacion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'


@NgModule({
  entryComponents: [
    NuevaPublicacionComponent
  ],
  declarations: [NuevaPublicacionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NuevaPublicacionComponent
  ]
})
export class ComponentsModule { }
