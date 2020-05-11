import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// Firebase
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AfsService {

  constructor(private almacenArchivos: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  subirArchivo(ruta: string, archivo)
  {
    const referenciaAlArchivo = this.almacenArchivos.ref(ruta);
    const tarea = this.almacenArchivos.upload(ruta, archivo);
  }

  async subirUnaFoto(rutaDestinoEnFirebase: string, rutaOrigenLocal:string)
  {
    // Para subir una foto a firebase primero la tenemos que converir en blob
    const archivoEnBlob = await fetch(rutaOrigenLocal).then(r => r.blob());
    const referenciaAlArchivo = this.almacenArchivos.ref(rutaDestinoEnFirebase);
    const tarea = this.almacenArchivos.upload(rutaDestinoEnFirebase, archivoEnBlob);

        // observe percentage changes
        this.uploadPercent = tarea.percentageChanges();
        // get notified when the download URL is available
        tarea.snapshotChanges().pipe(
            finalize(() => {
            this.downloadURL = referenciaAlArchivo.getDownloadURL()
            console.log("url", this.downloadURL ) 
          })    
        )
        .subscribe()

    return this.downloadURL;
  }

  public obtenerReferenciaAUnArchivo(nombreArchivo: string) {
    return this.almacenArchivos.ref(nombreArchivo);
  }

  public obtenerReferenciaFotoPerfil(nombreUsuario: string) {
    return this.almacenArchivos.ref( `/fotosperfilusuarios/${nombreUsuario}.jpg`);
  }

  async subirUnaFoto2(rutaDestinoEnFirebase: string, rutaOrigenLocal:string)
  {
    const archivoEnBlob = await fetch(rutaOrigenLocal).then(r => r.blob());
    // const referenciaAlArchivo = this.almacenArchivos.ref(rutaDestinoEnFirebase);
    // const tarea = this.almacenArchivos.upload(rutaDestinoEnFirebase, archivoEnBlob);

    return this.almacenArchivos.storage.ref().child(rutaDestinoEnFirebase).put(archivoEnBlob)  // <-- Here return the chain
    .then(snap => {
      return snap.ref.getDownloadURL();
    })
    .then(downloadURL => {
      console.log("asd", downloadURL);
      return downloadURL;
    })
    .catch(error => {
      console.log(`An error occurred while uploading the file.\n\n${error}`);
    });
  }


}
