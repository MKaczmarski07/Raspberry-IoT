import { Injectable } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Injectable({
  providedIn: 'root',
})
export class RgbService {
  constructor(private gpioService: GpioService) {}

  turnOnRGB(diodeID: number, color?: number[]) {
    this.gpioService.handleRGB(diodeID, 'on', color).subscribe();
  }

  turnOffRGB(diodeID: number) {
    this.gpioService.handleRGB(diodeID, 'off').subscribe();
  }
}
