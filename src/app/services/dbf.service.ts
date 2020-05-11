import { IPublicacion } from 'src/app/model/ipublicacion';
import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publicacion } from '../model/publicacion';


@Injectable({
  providedIn: 'root'
})
export class DbfService {

  coleccionPublicaciones: AngularFirestoreCollection<IPublicacion>;
  referenciaColeccionPublicaciones;

  constructor(private db: AngularFirestore) {
    this.coleccionPublicaciones = this.db.collection<IPublicacion>('publicaciones');
  }


  public agregarPublicacion(nuevaPublicacion: IPublicacion) {
    this.coleccionPublicaciones.add(nuevaPublicacion);
  }


  public traerTodosLasPublicaciones(): Observable<IPublicacion[]> {

    return this.db.collection('publicaciones', ref =>
      ref.orderBy('timeStamp', 'desc')).snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const datos = a.payload.doc.data() as IPublicacion;
            const id = a.payload.doc.id;
            return { id, ...datos };
          }))
      )

  }
}
