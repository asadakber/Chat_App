import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../providers/upload-file.service';
import { FileUpload } from '../../providers/fileupload';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private uploadservice: UploadFileService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadservice.pushFileToStorage(this.currentFileUpload, this.progress);
  }

}
