import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalheObraComponent } from './detalhe-obra.component';

import { RouterModule, Routes} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ component: DetalheObraComponent, path: '' }];

@NgModule({
  declarations: [
    DetalheObraComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class DetalheObraModule { }
