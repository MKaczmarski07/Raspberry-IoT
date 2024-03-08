import { Injectable } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Injectable({
  providedIn: 'root',
})
export class RgbService {
  constructor(private gpioService: GpioService) {}

  turnOnRGB(uniqueDeviceAdress: string, color?: number[]) {
    this.gpioService.handleRGB(uniqueDeviceAdress, 'on', color).subscribe();
  }

  turnOffRGB(uniqueDeviceAdress: string) {
    this.gpioService.handleRGB(uniqueDeviceAdress, 'off').subscribe();
  }

  getColor(uniqueDeviceAdress: string) {
    return this.gpioService.getAttributes(uniqueDeviceAdress);
  }

  transformColorResponse(response: Array<Array<number>>) {
    return JSON.parse('{' + response[0][0] + '}').color;
  }

  transformSceneColorResponse(response: any) {
    return JSON.parse('{' + response[0] + '}').colors;
  }
}
