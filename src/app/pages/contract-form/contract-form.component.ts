import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { IKeyValue, IPartner, IRegister, SignatureContact } from '@app/@shared/model';
import { ParnerService } from '@app/@shared/services/partner/partner.service';
import { StatusService } from '@app/@shared/services/status/status.service';
import { ContractService } from '@app/@shared/services/contract/contract.service';

@Component({
  selector: 'app-contractNew',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent implements OnInit {
  @ViewChild('uploadFile') public uploadFile: ElementRef<HTMLInputElement>;
  @ViewChild('signatureNameInput') signatureNameInput: ElementRef;
  @ViewChild('contactForm') contactForm: NgForm;

  public pageTitle: string = 'Novo contrato';
  public contractId: string;
  public statusList: IKeyValue[];
  public parnerList: IPartner[];
  // public fileName: string;
  contractListHist: IRegister[] = [];
  file: FormData = new FormData();
  loading = false;
  fileName = 'Selecione o documento';

  register: IRegister = null;

  displayedColumns: string[] = ['name', 'email', 'action'];
  listSignatures: SignatureContact[] = [];
  contactSignatureModel: SignatureContact = new SignatureContact('', '');

  dataSource: MatTableDataSource<SignatureContact>;

  public pageForm: FormGroup = this.formBulder.group({
    veiculo: new FormControl('1', [Validators.required]),
    checkin: new FormControl('2021-09-06', [Validators.required]),
    checkout: new FormControl('2021-09-09', [Validators.required]),
    diaria: new FormControl('1', [Validators.required]),
    vlr_diaria: new FormControl('2', [Validators.required]),
    file: new FormControl(''),
    attachments: new FormControl(''),
    descricaoDocumento: new FormControl(''),
    total: new FormControl('3', [Validators.required]),
    parceiro: new FormControl('Latam', [Validators.required]),
    status: new FormControl('AE', [Validators.required]),
    listaAssinaturas: new FormControl(undefined),
  });

  constructor(
    private contractService: ContractService,
    private statusService: StatusService,
    private parnerService: ParnerService,
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.statusService.list().subscribe((v) => (this.statusList = v));
    this.parnerService.partnerList().subscribe((v) => (this.parnerList = v));

    this.route.params.subscribe(({ id }: { id: string }) => this.editContract(id));
  }

  onFileChange(event: { target: { files: File[] } }) {
    // const reader = new FileReader();
    // if(event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.pageForm.patchValue({
    //       file: reader.result
    //    });
    //     // need to run CD since file load runs outside of zone
    //     // this.cd.markForCheck();
    //   };
    // }
    const fileSelected: File = event.target.files[0];
    this.pageForm.patchValue({
      file: fileSelected,
    });

    this.verifyFile(fileSelected);

    console.log('his.pageForm', this.pageForm);
  }

  onSubmit() {
    console.log('onSubmit', this.pageForm.value);
    this.loading = true;
    this.pageForm.removeControl('partner');

    if (this.pageForm.valid) {
      if (this.pageForm.controls['file'].value) {
        this.contractService.uploadFileAndSign(this.pageForm.controls['file'].value).subscribe((response: any) => {
          console.log({ response });
          const { pdfSigned } = response;

          // const saveFile = (data: any[], name: string) => {
          //   let a = document.createElement('a');
          //   document.body.appendChild(a);

          //   const blob = new Blob(data, { type: 'octet/stream' });
          //   const url = window.URL.createObjectURL(blob);
          //   a.href = url;
          //   a.download = name;
          //   a.click();
          //   window.URL.revokeObjectURL(url);
          // };

          // saveFile(pdfSigned.data, 'example.pdf');
          console.log(`${response.docHash}.pdf`);
          const filePdf = new File(pdfSigned.data, `${response.docHash}.pdf`);

          this.contractService.uploadFileDirect(filePdf).subscribe((hashDOC) => {
            console.log({ hashDOC });
            this.saveContract(hashDOC);
          });
        });
        return;
        this.contractService.uploadFileDirect(this.pageForm.controls['file'].value).subscribe((response) => {
          console.log(response);

          this.register = {
            id: this.contractId || uuid(),
            payload: JSON.stringify(this.pageForm.value),
          };

          this.parnerService.createRegister(this.pageForm.controls['parceiro'].value, this.register).subscribe(() => {
            console.log('before');
            this.wait(8000);
            console.log('after w');
            this.loading = false;
            // this.router
            //   .navigateByUrl('/', { skipLocationChange: true })
            //   .then(() => this.router.navigate(['list-register']));
          });
        });

        return;
        this.parnerService.uploadFile(this.pageForm.controls['file'].value).subscribe((response: any) => {
          this.pageForm.removeControl('file');
          //let lista = [response.toString()];
          const base64 = this.arrayBufferToBase64(response.pdfSigned.data);
          const urlPdf = 'data:application/pdf;base64,' + base64;

          // this.pageForm.controls['attachment_list'].setValue(lista);
          const form = { ...this.pageForm.value, docHash: response.docHash, pdfSigned: response?.pdfSigned?.data };
          //const buffer = Buffer.from();
          const file = new Blob([JSON.stringify(response?.pdfSigned)], { type: 'application/pdf' });

          const element = document.createElement('a');

          const fileUrl = URL.createObjectURL(file);
          element.setAttribute('href', urlPdf);
          element.setAttribute('download', 'assinado.pdf');
          element.style.display = 'none';

          document.body.appendChild(element);
          element.click();
          //window.open(fileUrl);

          // console.log(form);

          /*
              this.parnerService.createRegister(this.pageForm.controls['parceiro'], this.register).subscribe(() => {
                this.wait(10000);
                this.loading = false;
                this.router
                  .navigateByUrl('/', { skipLocationChange: true })
                  .then(() => this.router.navigate(['list-register']));
              });*/
        });
      } else {
        this.pageForm.removeControl('file');
        // this.pageForm.removeControl('attachments');
        this.saveContract();
        return;
        this.parnerService.createRegister(this.pageForm.controls['parceiro'].value, this.register).subscribe(() => {
          console.log('beforeWait');
          this.wait(8000);
          console.log('afterWait');
          this.loading = false;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['list-register']));
        });
      }
    }
  }

  public saveContract(hashDoc?: string) {
    console.log(JSON.parse(JSON.stringify(this.pageForm.value)));

    this.pageForm.patchValue({
      descricaoDocumento: undefined,
      listaAssinaturas: undefined,
      attachments: {
        description: this.pageForm.get('descricaoDocumento').value,
        signatureList: [...this.pageForm.get('listaAssinaturas').value],
      },
    });

    if (hashDoc) {
      this.pageForm.patchValue({
        file: undefined,
        attachments: {
          hash: hashDoc,
          description: this.pageForm.get('attachments.description').value,
          signatureList: [...this.pageForm.get('attachments.signatureList').value],
        },
      });
    }
    console.log(JSON.parse(JSON.stringify(this.pageForm.value)));

    this.register = {
      id: this.contractId || uuid(),
      payload: JSON.stringify(this.pageForm.value),
    };

    console.log(JSON.parse(JSON.stringify(this.register)));

    this.parnerService.createRegister(this.pageForm.controls['parceiro'].value, this.register).subscribe(
      (response) => {
        this.wait(3000);
        console.log(response);
        this.loading = false;
        this.router.navigateByUrl('/page/contract');
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public uploadFileButton(): void {
    console.log('button upload');
    console.log('upload field', this.uploadFile);
    this.uploadFile.nativeElement.click();
  }

  public get showSignatureTable(): boolean {
    return this.listSignatures.length > 0;
  }

  public addContactSignture(signed: boolean = false): void {
    const newSignture: SignatureContact = new SignatureContact(
      this.contactSignatureModel.name,
      this.contactSignatureModel.email
    );
    newSignture.signed = signed;
    this.listSignatures.push(newSignture);
    this.dataSource = new MatTableDataSource<SignatureContact>(this.listSignatures);
    this.resetDefaultSigntureContact();
    this.contactForm.reset();
    // this.signatureNameInput.nativeElement.focus();
    this.pageForm.controls['listaAssinaturas'].patchValue(this.listSignatures);
  }

  private resetDefaultSigntureContact(): void {
    this.contactSignatureModel = new SignatureContact('', '');
  }

  public removeSignture(element: SignatureContact) {
    console.log('removing...', element);
    this.listSignatures.splice(
      this.listSignatures.findIndex((el) => el.email === element.email),
      1
    );
    this.dataSource = new MatTableDataSource<SignatureContact>(this.listSignatures);
  }

  private calculateTotal() {
    this.pageForm.controls['total'].setValue(
      this.pageForm.controls['diaria'].value * this.pageForm.controls['vlr_diaria'].value
    );
  }

  // onSubmit() {
  //   this.pageForm.controls['total'].setValue(this.pageForm.controls['diaria'].value * this.pageForm.controls['vlr_diaria'].value);
  //   if (this.contractId) {
  //     this.register = {
  //       id: this.contractId,
  //       payload: JSON.stringify(this.pageForm.value)
  //     };
  //   } else {
  //     this.register = {
  //       id: uuid(),
  //       payload: JSON.stringify(this.pageForm.value)
  //     };
  //   }

  //   if (!this.file) {
  //     this._snackBar.open('Informe o documento pdf', '', {
  //       horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       duration: 5000
  //     });
  //     return;
  //   }
  //   this.parnerService.createRegister(this.pageForm.controls['parceiro'].value, this.register)
  //     .subscribe(() => {
  //       this.wait(9000);
  //       this.router
  //         .navigateByUrl('/', { skipLocationChange: true })
  //         .then(() => this.router.navigate(['/page/contract']));
  //     });
  // }

  private wait(ms: number) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  private verifyFile(file: File) {
    // const file: File = files.item(0);
    this.fileName = file && file.type === 'application/pdf' ? file.name : 'Selecione o documento';
    if (file && file.name && file.type === 'application/pdf') {
      this.file.append('file', file);
    }
    if (!file || file.type !== 'application/pdf') {
      this.file = null;
    }
  }

  private arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  private editContract(id?: string) {
    if (id) {
      this.loading = true;
      this.contractId = id;
      this.pageTitle = 'Alterar contrato';
      this.parnerService.getRegisterById(id).subscribe((data) => {
        console.log('getRegister', id, data);
        var contract = data[0];
        var obj = JSON.parse(contract.payload);

        this.pageForm.patchValue({
          //id: contract.id,
          veiculo: obj.veiculo,
          checkin: obj.checkin,
          checkout: obj.checkout,
          diaria: obj.diaria,
          vlr_diaria: obj.vlr_diaria,
          total: obj.total,
          parceiro: obj.parceiro,
          status: obj.status,
        });

        if (obj.attachments) {
          console.log('tem arquivo', obj.attachments);
          this.pageForm.patchValue({
            descricaoDocumento: obj.attachments.description,
          });
          if (obj.attachments.signatureList) {
            obj.attachments.signatureList.forEach((element: any) => {
              this.contactSignatureModel = new SignatureContact(element.name, element.email);
              this.addContactSignture(element.signed);
            });
          }
        }

        this.parnerService.getRegisterHistById(this.contractId).subscribe((data) => {
          console.log('getHistory', data);
          this.contractListHist = data;
          this.loading = false;
        });
      });
    }
  }
}
