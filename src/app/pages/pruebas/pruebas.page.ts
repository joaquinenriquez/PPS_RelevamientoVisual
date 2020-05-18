import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AfsService } from 'src/app/services/afs.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {

  // uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;

  constructor(public afs: AfsService) { }

  ngOnInit() { }

  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   const filePath = 'name-your-file-path-here';
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);

  //   // observe percentage changes
  //   this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available
  //   task.snapshotChanges().pipe(
  //     finalize(() => this.downloadURL = fileRef.getDownloadURL())
  //   )
  //     .subscribe();
  // }
}
