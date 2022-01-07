import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDetailsDialog, TimelineComponent } from './timeline.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule],
  declarations: [TimelineComponent, ContractDetailsDialog],
  entryComponents: [ContractDetailsDialog],
  exports: [TimelineComponent],
})
export class TimelineModule {}
