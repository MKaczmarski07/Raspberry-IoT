import { Component, OnInit, Input } from '@angular/core';
import { RgbService } from 'src/app/shared/rgb.service';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input() canToggle = false;
  @Input() displayedName: string = '';
  @Input() uniqueDeviceAdress: string = '';
  @Input() localization: string = '';
  @Input() type: '' | 'lamp' | 'blinds' = '';
  @Input() id = 0;

  state: 'on' | 'off' = 'off';
  isOn = false;

  constructor(
    private rgbService: RgbService,
    private gpioService: GpioService,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.url === '/tabs/home') {
        this.getState();
      }
    });
  }

  ngOnInit() {
    this.getState();
  }

  getState() {
    if (this.canToggle) {
      this.gpioService
        .getDeviceState(this.uniqueDeviceAdress)
        .subscribe((state: any) => {
          this.state = state[0][0];
          this.handleDeviceStateChange();
        });
    }
  }

  toggleDevice() {
    this.state = this.state === 'on' ? 'off' : 'on';
    this.handleDeviceStateChange();
  }

  handleLamp() {
    if (this.state === 'on') {
      this.rgbService
        .getColor(this.uniqueDeviceAdress)
        .subscribe((response: any) => {
          const color = this.rgbService.transformColorResponse(response);
          this.rgbService.turnOnRGB(this.uniqueDeviceAdress, color);
        });
    }
    if (this.state === 'off') {
      this.rgbService.turnOffRGB(this.uniqueDeviceAdress);
    }
  }

  handleDeviceStateChange() {
    if (this.type === 'lamp') {
      this.handleLamp();
    }
  }
}
