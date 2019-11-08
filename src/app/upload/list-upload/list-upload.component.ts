import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../../providers/upload-file.service';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  fileUploads: any[];

  constructor(private uploadservice: UploadFileService) { }

  ngOnInit() {
    this.uploadservice.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }
}


