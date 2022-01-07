import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatusService } from '@app/@shared/services/status/status.service';
import { ParnerService } from '@app/@shared/services/partner/partner.service';
import { AttachmentContractInterface, IKeyValue, IPartner, IRegister } from '@app/@shared/model';
import { LoadingEvent } from '@app/@shared/events/loading.event';
import { MatDialog } from '@angular/material/dialog';
import { DialogSignaturesListComponent } from './dialog-signatures-list/dialog-signatures-list';
import { ContractService } from '@app/@shared/services/contract/contract.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  contractList: IRegister[] = [];
  parsedList: any[] = [];
  public showFilter: boolean = false;
  public pageForm: FormGroup = this.formBuilder.group({
    veiculo: new FormControl(''),
    checkin: new FormControl(''),
    checkout: new FormControl(''),
    diaria: new FormControl(''),
    vlr_diaria: new FormControl(''),
    total: new FormControl(''),
    parceiro: new FormControl(''),
    status: new FormControl(''),
  });
  public statusList: IKeyValue[];
  public partnerList: IPartner[];
  displayedColumns: string[] = [
    'id',
    'veiculo',
    'docstatus',
    'checkin',
    'checkout',
    'diaria',
    'vlr_diaria',
    'total',
    'parceiro',
    'status',
    'download',
    'signatures',
    'options',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private statusService: StatusService,
    private partnerService: ParnerService,
    private contractService: ContractService
  ) {}

  ngOnInit() {
    LoadingEvent.load(true);
    this.statusService.list().subscribe((v) => (this.statusList = v));
    this.partnerService.partnerList().subscribe((v) => {
      this.partnerList = v;
      console.log({ v });
    });
    this.partnerService.getRegisters().subscribe(
      (data: IRegister[]) => {
        console.log('data', data);
        this.contractList = data;

        data.map((register, i) => {
          const payload = JSON.parse(register.payload);
          console.log({ payload });

          this.parsedList.push({
            id: register.id,
            veiculo: payload.veiculo,
            checkin: payload.checkin,
            checkout: payload.checkout,
            diaria: payload.diaria,
            vlr_diaria: payload.vlr_diaria,
            total: payload.total,
            parceiro: payload.parceiro,
            status: payload.status,
            signatures: this.handleSignatures(payload.attachments),
            attachments: payload.attachments,
          });
        });

        this.dataSource = new MatTableDataSource(this.parsedList);

        //  LoadingEvent.load(false);
      },
      () => {
        //   LoadingEvent.load(false);
      }
    );
  }

  handleSignatures(attachment: AttachmentContractInterface): undefined | string {
    if (!attachment || !attachment.signatureList) {
      return undefined;
    }

    const totalSigns = attachment.signatureList.length;
    const totalContractSigned = attachment.signatureList.filter((el) => el.signed).length;

    return `${totalContractSigned}/${totalSigns}`;
  }

  sortData(sort: Sort) {
    console.log(sort);
  }

  downloadFile(id: string) {
    const contract = this.parsedList.find((el) => el.id === id);
    if (contract && contract.attachments) {
      const { hash } = contract.attachments;
      if (hash) {
        this.contractService.getSignedDoc(hash + '.pdf').subscribe(
          (value) => {
            // console.log({ value });
            // const file2 = new File([value], 'filename.pdf', { type: 'application/pdf' });
            // console.log({ file2 });
            // const file = new Blob([file2], { type: 'application/pdf' });
            // const fileURL = URL.createObjectURL(file);
            // // window.open(fileURL);
            // var anchor = document.createElement('a');
            // anchor.href = fileURL;
            // FileSave
            // anchor.download = 'test.pdf';
            // console.log({ file, file2, fileURL });
            // anchor.click();
            const file = new Blob([value], { type: 'application/pdf' });
            saveAs(file)
            // this._FileSaverService.save(value, 'test.pdf');
          },
          (err) => {
            console.log({ err });
          }
        );
      }
    }
  }

  showListSignatures(id: string) {
    const dialogRef = this.dialog.open(DialogSignaturesListComponent, {
      width: '600px',
      data: { id, contract: this.parsedList.find((el) => el.id === id) },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngAfterViewInit() {
    //  this.dataSource.sort = this.sort;
  }

  public onSubmit(): void {}

  public print(): void {
    window.print();
  }
}
