import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';

@Component({
  selector: 'app-security',
  templateUrl: 'security.page.html',
  styleUrls: ['security.page.scss'],
})
export class SecurityPage {
  isArmed = false;

  constructor(private gpioService: GpioService) {}

  armHome() {
    this.isArmed = !this.isArmed;
    this.gpioService.detectMotion(this.isArmed).subscribe();
  }
}
