import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from '@app/@shared/dashboard/dashboard.service';
import { IDash, IRegister } from '@app/@shared/model';
import { ParnerService } from '@app/@shared/services/partner/partner.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCertificationFileComponent } from './dialog-certification-file/dialog-certification-file';

interface SigntureContractTableInterface {
  contract: string;
  name: string;
  signed: boolean;
  showAction: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  contractList: IRegister[] = [];
  parsedList: any[] = [];
  quote: string | undefined;
  isLoading = false;
  public dashboard: IDash = {} as IDash;
  public chart: any = {
    title: '',
    type: 'BarChart',
    columnNames: ['City', 'Inhabitants'],
    data: [
      ['Jan', 56],
      ['Fev', 1256],
      ['Mar', 658],
      ['Abr', 852],
      ['Mai', 2200],
    ],
    options: {
      title: '',
      legend: { position: 'none' },
      chart: { title: 'Chess opening moves', subtitle: 'popularity by percentage' },
      bars: 'horizontal', // Required for Material Bar Charts.
      axes: {
        x: {
          0: { side: 'top', label: 'Percentage' }, // Top x-axis.
        },
      },
      bar: { groupWidth: '90%' },
    },
  };

  displayedColumns: string[] = [
    'id',
    'veiculo',
    'checkin',
    'checkout',
    'diaria',
    'vlr_diaria',
    'total',
    'parceiro',
    'status',
  ];

  dataSource: MatTableDataSource<any>;

  // signturesDataMock;
  displayColumnsSigntures: string[] = ['contract', 'name', 'action'];
  dataSourceSigntures: MatTableDataSource<SigntureContractTableInterface>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private parnerService: ParnerService, private dialog: MatDialog) {
    this.parnerService.getSummary().subscribe((data) => (this.dashboard = data));

    this.parnerService.getRegisters().subscribe((data) => {
      this.contractList = data;

      for (var i in this.contractList) {
        var obj = JSON.parse(this.contractList[i].payload);
        this.parsedList.push({
          id: this.contractList[i].id,
          veiculo: obj.veiculo,
          checkin: obj.checkin,
          checkout: obj.checkout,
          diaria: obj.diaria,
          vlr_diaria: obj.vlr_diaria,
          total: obj.total,
          parceiro: obj.parceiro,
          status: obj.status,
        });
        //if (this.contractList[i].parametro == "1") {
        //  this.url1 = this.configList[i].url;
        //}
      }
      const contracts = this.parsedList; //todo truncar pra ficar 10 no max
      this.dataSource = new MatTableDataSource(contracts);
    });
  }

  ngOnInit() {
    //this.dashboardService.info().subscribe(v => this.dashboard = v);
    console.log('ngOninit');
    this.getPendingSigntures();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  signContract(element: any) {
    const dialogRef = this.dialog.open(DialogCertificationFileComponent, {
      width: '450px',
      data: { element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private getPendingSigntures(): void {
    const list: SigntureContractTableInterface[] = [
      { contract: 'Contrato #001', name: 'Mary', showAction: true, signed: false },
      { contract: 'Contrato #001', name: 'Bob', showAction: false, signed: false },
      { contract: 'Contrato #001', name: 'John', showAction: false, signed: true },
    ];
    console.log('list', list);
    this.dataSourceSigntures = new MatTableDataSource<SigntureContractTableInterface>(list);
  }
}
