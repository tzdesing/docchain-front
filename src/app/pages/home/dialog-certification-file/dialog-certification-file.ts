import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContractService } from '@app/@shared/services/contract/contract.service';

@Component({
  selector: 'app-dialog-certification-file-component',
  templateUrl: './dialog-certification-file.html',
  styleUrls: ['./dialog-certification-file.scss'],
})
export class DialogCertificationFileComponent implements OnInit {
  @ViewChild('uploadFile') public uploadFile: ElementRef<HTMLInputElement>;

  public fileName = 'Selecione o certificado';
  public passwordCert: string;

  private file: File;

  constructor(private contractService: ContractService) {}
  ngOnInit() {}

  /*
    - Etapas para assinar o documento
    - Upload do arquivo de certificado (.pfx)
    - input com a senha do certificado

  */
  onSubmit() {
    if (this.passwordCert && this.file) {
      this.contractService.signDocument(this.file, this.passwordCert);
    }
  }

  onFileChange(event: { target: { files: File[] } }) {
    const fileSelected: File = event.target.files[0];

    this.verifyFile(fileSelected);
    console.log('fileSelected', fileSelected);
    console.log('file', this.file);
  }

  private verifyFile(file: File) {
    // const file: File = files.item(0);
    this.fileName = file && file.type === 'application/x-pkcs12' ? file.name : 'Selecione o certificado';
    if (file && this.fileName) {
      console.log('tem arquivo');
      this.file = file;
    } else {
      console.log('remove arquivo');
      this.file = null;
    }
  }

  public uploadFileButton(): void {
    console.log('button upload');
    console.log('upload field', this.uploadFile);
    this.uploadFile.nativeElement.click();
  }
}
