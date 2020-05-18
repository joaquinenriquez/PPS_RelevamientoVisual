import { AfsService } from './../../services/afs.service';
import { Observable } from 'rxjs';
import { DbfService } from './../../services/dbf.service';
import { NuevaPublicacionComponent } from './../../components/nueva-publicacion/nueva-publicacion.component';
import { TipoPublicacion, enumTipoDeCosa } from './../../model/tipo-publicacion';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Para sacar fotos desde el chrome
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ModalController } from '@ionic/angular';
import { IPublicacion } from 'src/app/model/ipublicacion';
import { map } from 'rxjs/operators';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);


@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})

export class PublicacionesPage implements OnInit {

  foto;

  // #region Atributos

  // Listado de publicaciones que obtenemos desde Firebase
  public publicaciones$: Observable<IPublicacion[]>;

  // Tipo de publicacion que nos van a pasar desde la pagina anterior (la de los botones)
  tipoPublicacion: TipoPublicacion;

  // #endregion 

  constructor(private rutaActual: ActivatedRoute, // Para saber la ruta actual
    private controladorModal: ModalController, // Para mostrar los modales
    private dbf: DbfService,
    public almacenFotos: AfsService) { }

  ngOnInit() {

    // Obtenemos el tipo de publicacion que nos pasaron desde la pagina anterior (la de los botones)
    this.rutaActual.paramMap.pipe(map(() => window.history.state)).subscribe((tipoPublicacionSeleccionada) => {

      if (tipoPublicacionSeleccionada != null) {
        this.tipoPublicacion = tipoPublicacionSeleccionada;
      } else {
        this.tipoPublicacion = new TipoPublicacion(enumTipoDeCosa.COSAS_LINDAS);
      }


    });

    // Nos traemos las publicaciones desde firebase
    this.publicaciones$ = this.dbf.traerTodosLasPublicaciones();

    this.almacenFotos.obtenerReferenciaAUnArchivo('/fotosperfilusuarios/invitado.jpg').getDownloadURL().subscribe((foto) => {
      this.foto = foto;
    })
  }

  async sacarUnaFoto() {

    this.mostrarModalPublicar();

  }

  async mostrarModalPublicar() {
    const modal = await this.controladorModal.create(
      {
        component: NuevaPublicacionComponent,
        componentProps:  // Se lo pasamos al modal
        {
          tipoPublicacion: this.tipoPublicacion
        }
      }
    );

    return await modal.present();

  }

  obtenerFotoDePerfilUsuarioPublicacion(nombreUsuario: string )
  {
    let unaFoto;
    this.almacenFotos.obtenerReferenciaAUnArchivo('/fotosperfilusuarios/invitado.jpg').getDownloadURL().subscribe((foto) => {
      this.foto = foto;
    });

    return this.foto;
  }

}
