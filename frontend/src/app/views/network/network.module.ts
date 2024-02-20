import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NetworkPage } from './network.page';

import { NetworkPageRoutingModule } from './network-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, NetworkPageRoutingModule],
  declarations: [NetworkPage],
})
export class NetworkPageModule {}
