import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from './@shared/services/guard/guard.service';
import { ContractFormModule } from './pages/contract-form/contract-form.module';
import { ContractModule } from './pages/contract/contract.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { MainComponent } from './pages/main/main.component';
import { PartnerFormModule } from './pages/partner-form/partner-formmodule';
import { PartnerModule } from './pages/partner/partner.module';
import { CadastroModule } from './pages/cadastro/cadastro.module';
import { RecSenhaModule } from './pages/rec-senha/rec-senha.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => LoginModule,
  },
  {
    path: 'page',
    component: MainComponent,
    canActivateChild: [GuardService],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'home',
        loadChildren: () => HomeModule,
      },
      {
        path: 'partner',
        loadChildren: () => PartnerModule,
      },
      {
        path: 'partner/new',
        loadChildren: () => PartnerFormModule,
      },
      {
        path: 'partner/edit/:id',
        loadChildren: () => PartnerFormModule,
      },
      {
        path: 'contract',
        loadChildren: () => ContractModule,
      },
      {
        path: 'contract/new',
        loadChildren: () => ContractFormModule,
      },
      {
        path: 'contract/update/:id',
        loadChildren: () => ContractFormModule,
      },
      {
        path: 'cadastro',
        loadChildren: () => CadastroModule,
      },
      {
        path: 'recuperarSenha',
        loadChildren: () => RecSenhaModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
