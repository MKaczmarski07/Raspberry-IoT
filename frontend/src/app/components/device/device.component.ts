import { Component, OnInit, Input } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input() canToggle = false;
  @Input() name: any;
  @Input() localization: any;
  @Input() diodeNumber = 0;

  isOn = false;

  constructor(private gpioService: GpioService) {}

  ngOnInit() {}

  toggleDevice() {
    this.isOn = !this.isOn;

    this.isOn
      ? this.turnOnRGB(this.diodeNumber, [255, 255, 255])
      : this.turnOffRGB(this.diodeNumber);
  }

  turnOnRGB(diodeNumber: number, color?: number[]) {
    this.gpioService.handleRGB(diodeNumber, true, color).subscribe();
  }

  turnOffRGB(diodeNumber: number) {
    this.gpioService.handleRGB(diodeNumber, false).subscribe();
  }
}
