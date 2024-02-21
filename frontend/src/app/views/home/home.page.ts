import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentTemperature = 20;
  currentHumidity = 50;
  diodeSubscription: Subscription | undefined;
  constructor(private gpioService: GpioService) {}

  blinkDiode() {
    console.log('Blinking diode');
    this.diodeSubscription = this.gpioService.blinkDiode().subscribe();
  }

  ngOnDestroy() {
    if (this.diodeSubscription) {
      this.diodeSubscription.unsubscribe();
    }
  }
}
