import { IPublicacion } from 'src/app/model/ipublicacion';
import { DbfService } from './../../services/dbf.service';
import { AuthService } from './../../services/auth.service';
import { AfsService } from './../../services/afs.service';
import { CamaraService } from './../../services/camara.service';
import { TipoPublicacion } from './../../model/tipo-publicacion';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-publicacion',
  templateUrl: './nueva-publicacion.component.html',
  styleUrls: ['./nueva-publicacion.component.scss'],
})
export class NuevaPublicacionComponent implements OnInit {

  @Input() tipoPublicacion: TipoPublicacion;

  foto: string;
  usuarioActual: firebase.User;
  fotoUsuarioActual: string;


  // Como son slides hacemos esto para quitarle el efecto de pasar
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private camara: CamaraService,
    private almacenFotos: AfsService,
    private auth: AuthService,
    private controladorModal: ModalController,
    private db: DbfService) { }

  ngOnInit() {
    this.usuarioActual = this.auth.usuarioActual;
    let rutaFotoPerfilUsuarioActual = `/fotosperfilusuarios/${this.usuarioActual.email}.jpg`;
    this.almacenFotos.obtenerReferenciaAUnArchivo(rutaFotoPerfilUsuarioActual)
      .getDownloadURL().subscribe((foto) => { this.fotoUsuarioActual = foto });
  }

  async tomarUnaFoto() {
    this.foto = await this.camara.tomarUnaFotoCamara();
  }

  async publicar() {

    // Subuimos la foto
    const nombreFoto = this.subirFoto();

    // Guardamos los datos (usuario, fecha, etc.)
    this.guardarDatosPublicacion(nombreFoto);

    // Cerramos el modal
    this.controladorModal.dismiss();
  }

  async subirFoto() {
    // Generamos un nombre aleatorio para la foto
    const nombreFoto = Math.random().toString(36).substring(2) + ".jpg";

    // Definimos la ruta destino en Firebase
    const rutaDestinoEnFirebase = this.tipoPublicacion.pathFotos + nombreFoto;

    // Subimos la foto al storage de firebase
    return this.almacenFotos.subirUnaFoto2(rutaDestinoEnFirebase, this.foto);
  }

  async guardarDatosPublicacion(nombreFoto) {
    const nuevaPublicacion: IPublicacion =
    {
      'nombreFoto': await nombreFoto,
      'fechaHora': new Date(),
      'emailUsuarioCreador': this.usuarioActual.email,
      'referenciaFotoPerfilUsuario': this.fotoUsuarioActual,
      'timeStamp': + new Date()
    }

    this.db.agregarPublicacion(nuevaPublicacion);

  }


  cancelarPublicacion() {
    this.foto = undefined;
  }

  async abrirGaleria() {
    this.foto = await this.camara.abrirGaleriaFotos();
  }

}
