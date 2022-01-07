import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractService } from '@app/@shared/services/contract/contract.service';

@Component({
  selector: 'app-dialog-signatures-list-component',
  templateUrl: './dialog-signatures-list.html',
  styleUrls: ['./dialog-signatures-list.scss'],
})
export class DialogSignaturesListComponent implements OnInit {
  constructor(
    private contractService: ContractService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string; contract: any }
  ) {}
  ngOnInit() {
    console.log('data modal', this.data.contract);
  }

  public get signatureList(): any[] {
    return this.data.contract.attachments.signatureList || [];
  }
}
