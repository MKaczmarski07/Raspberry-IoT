import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, IonicModule],
  exports: [AlertComponent],
})
export class AlertModule {}
