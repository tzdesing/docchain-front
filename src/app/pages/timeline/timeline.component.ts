import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  contractList: any[] = [];
  @Input("data") set data( value: any ){
    this.contractList = [];
    console.log(this.contractList)

    for (var i in value) {
      var obj = JSON.parse(value[i].payload);
      this.contractList.push({
        id: value[i].id,
        veiculo: obj.veiculo,
        checkin: obj.checkin,
        checkout: obj.checkout,
        diaria: obj.diaria,
        vlr_diaria: obj.vlr_diaria,
        total: obj.total,
        parceiro: obj.parceiro,
        status: obj.status
      });
    }
  } 

  

  ngOnInit() {
    
    //console.log(this.contractList)
  }

  openDetails(contract: any) {
    const dialogRef = this.dialog.open(ContractDetailsDialog, {
      width: '600px',
      data: contract,
    });
  }
}
@Component({
  selector: 'delete-dialog',
  template: `<h1 mat-dialog-title>Detalhes do contrato</h1>
    <div mat-dialog-content>
      <p>
        Veículo {{ data.veiculo }} com check-in em {{ data.checkin }} e check-out
        {{ data.checkout || 'Em aberto' }}.<br />
        Com {{ data.diaria }} até o momento com valor de {{ data.vlr_diaria }} por dia, tendo o total até o momento de
        {{ data.total }}.<br />
        Locador: {{ data.locador }}<br />
        Parceiro: {{ data.parceiro }}<br />
        Status: {{ data.status }}
      </p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">Fechar</button>
    </div>`,
})
export class ContractDetailsDialog {
  constructor(public dialogRef: MatDialogRef<ContractDetailsDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  close(): void {
    this.dialogRef.close();
  }
}
