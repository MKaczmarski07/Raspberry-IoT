import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityPage } from './security.page';

import { SecurityPageRoutingModule } from './security-routing.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SecurityPageRoutingModule,
    AlertModule,
  ],
  declarations: [SecurityPage],
})
export class SecurityPageModule {}
