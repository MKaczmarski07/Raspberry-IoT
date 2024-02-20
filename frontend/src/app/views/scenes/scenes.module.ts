import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScenesPage } from './scenes.page';

import { ScenesPageRoutingModule } from './scenes-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ScenesPageRoutingModule],
  declarations: [ScenesPage],
})
export class ScenesPageModule {}
