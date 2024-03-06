import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { WeatherComponent } from 'src/app/components/weather/weather.component';
import { DeviceComponent } from 'src/app/components/device/device.component';
import { ColorPickerComponent } from 'src/app/components/color-picker/color-picker.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    WeatherComponent,
    DeviceComponent,
    ColorPickerComponent,
    DeviceDetailsComponent,
    AlertComponent,
  ],
})
export class HomePageModule {}
