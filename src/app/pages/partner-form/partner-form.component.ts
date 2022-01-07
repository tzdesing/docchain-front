import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfig } from '@app/@shared/model';
import { ParnerService } from '@app/@shared/services/partner/partner.service';

@Component({
  selector: 'app-contractNew',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss'],
})
export class PartnerFormComponent implements OnInit {
  config: IConfig;
  configList: IConfig[] = [];
  public pageTitle: string = 'Novo parceiro';
  public pageForm: FormGroup = this.formBulder.group({
    nome: new FormControl(''),
    cnpj: new FormControl(''),
    comissao: new FormControl(''),
    email: new FormControl(''),
    url: new FormControl(''),
    parametro: new FormControl('')
  });

  constructor(
    private formBulder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private parnerService: ParnerService
  ) { }

  ngOnInit() {
    this.parnerService.partnerList().subscribe((data: any) => {
      this.configList = data;
      this.route.params.subscribe(({ id }: { id: string }) => {
        if (id) {
          this.pageTitle = 'Alterar parceiro';
          const item = this.configList[id]
          this.pageForm.setValue({
            nome: item.nome,
            cnpj: item.cnpj,
            comissao: item.comissao,
            email: item.email,
            url: item.url,
            parametro: item.parametro || ''
          });
        }
      });
    });
  }

  onSubmit() {
    this.config = this.pageForm.value;

    this.route.params.subscribe(({ id }: { id: string }) => {
      if (id) {
        this.configList[id] = this.config;
      } else {
        this.configList.push(this.config);
      }
      this.parnerService.setConfig(this.configList).subscribe(() => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/page/partner']));
      });
    });
  }
}
