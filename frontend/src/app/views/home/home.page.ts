import { Component, OnInit } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentTemperature = 0;
  currentHumidity = 0;
  temperatureAndHumiditySub: Subscription | undefined;
  constructor(private gpioService: GpioService) {}

  ngOnInit() {
    this.getTemperatureAndHumidity();
  }

  getTemperatureAndHumidity() {
    this.temperatureAndHumiditySub = this.gpioService
      .getTemperatureAndHumidity()
      .subscribe((response: any) => {
        this.currentTemperature = response[0];
        this.currentHumidity = response[1];
      });
  }

  ngOnDestroy() {
    if (this.temperatureAndHumiditySub) {
      this.temperatureAndHumiditySub.unsubscribe();
    }
  }
}
