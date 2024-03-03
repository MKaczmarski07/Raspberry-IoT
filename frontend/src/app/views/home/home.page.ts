import { Component, OnInit } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentTemperature: number | null = null;
  currentHumidity: number | null = null;
  temperatureAndHumiditySub: Subscription | undefined;
  sensorDataLoaded = false;
  weatherDataLoaded = false;
  isAllertVisible = false;

  constructor(private gpioService: GpioService, private router: Router) {}

  ngOnInit() {
    this.getTemperatureAndHumidity();
  }

  getTemperatureAndHumidity() {
    this.temperatureAndHumiditySub = this.gpioService
      .getTemperatureAndHumidity()
      .subscribe(
        (response: any) => {
          this.currentTemperature = response[0];
          this.currentHumidity = response[1];
          this.sensorDataLoaded = true;
        },
        (error) => {
          this.currentTemperature = 0;
          this.currentHumidity = 0;
          this.sensorDataLoaded = true;
          // show alert if sensor is unreachable
          this.isAllertVisible = true;
        }
      );
  }

  ngOnDestroy() {
    if (this.temperatureAndHumiditySub) {
      this.temperatureAndHumiditySub.unsubscribe();
    }
  }
}
