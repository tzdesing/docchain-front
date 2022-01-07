import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IConfig } from '@app/@shared/model';
import { ParnerService } from '@app/@shared/services/partner/partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss'],
})
export class PartnerComponent implements OnInit {
  configList: IConfig[] = [];
  public showFilter: boolean = false;
  public pageForm: FormGroup = this.formBulder.group({
    name: new FormControl(''),
    cnpj: new FormControl(''),
  });

  displayedColumns: string[] = ['nome', 'cnpj', 'comissao', 'url', 'options'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBulder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private parnerService: ParnerService
  ) {}

  ngOnInit() {
    this.parnerService.partnerList().subscribe((data) => {
      this.configList = data;
      const contracts = this.configList;
      this.dataSource = new MatTableDataSource(contracts);
      this.dataSource.sort = this.sort;
    });
  }

  sortData(sort: Sort) {
    console.log(sort);
  }


  public onSubmit(): void {}

  public deletePartner(partner: any): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '350px',
      data: partner,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.configList.splice(partner, 1);
        this.parnerService.setConfig(this.configList).subscribe(() => {
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/page/partner']));
        });
      }
    });
  }
}

@Component({
  selector: 'delete-dialog',
  template: `<h1 mat-dialog-title>Exclusão de registro</h1>
    <div mat-dialog-content>
      <p>
        Tem certeza que deseja excluir o parceiro <b>{{ data.nome }}</b
        >? <br />A exclusão é irreversível!
      </p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="confirmar(true)" cdkFocusInitial>Comfirmar</button>
      <button mat-button (click)="confirmar(false)">Cancelar</button>
    </div>`,
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  confirmar(confirmed: boolean): void {
    this.dialogRef.close({ confirmed });
  }
}
