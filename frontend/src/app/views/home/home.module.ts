import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { WeatherComponent } from 'src/app/components/weather/weather.component';
import { DeviceComponent } from 'src/app/components/device/device.component';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomePageRoutingModule],
  declarations: [HomePage, WeatherComponent, DeviceComponent],
})
export class HomePageModule {}
