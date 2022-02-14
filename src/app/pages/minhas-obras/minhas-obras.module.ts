import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasObrasComponent } from './minhas-obras.component';

import { RouterModule, Routes} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [{ component: MinhasObrasComponent, path: '' }];

@NgModule({
  declarations: [
    MinhasObrasComponent,
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
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
  ]
})
export class MinhasObrasModule { }
