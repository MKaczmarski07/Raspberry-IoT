import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { NetworkService } from 'src/app/data-access/network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentTemperature: number = 0;
  currentHumidity: number = 0;
  temperatureAndHumiditySub: Subscription | undefined;
  sensorDataFailed = false;
  weatherDataLoaded = false;
  weatherDataFailed = false;
  isServerAvailable = false;
  isLoaderVisible = true;
  isAllertVisible = false;
  alertMessage = '';

  constructor(
    private gpioService: GpioService,
    public network: NetworkService
  ) {}

  ionViewWillEnter() {
    this.network.checkConnection();
    this.handleLoader();
  }

  getTemperatureAndHumidity() {
    this.temperatureAndHumiditySub = this.gpioService
      .getTemperatureAndHumidity()
      .subscribe(
        (response: any) => {
          this.currentTemperature = response[0];
          this.currentHumidity = response[1];
          this.sensorDataFailed = false;
          this.isLoaderVisible = false;
        },
        (error) => {
          this.sensorDataFailed = true;
          this.isLoaderVisible = false;
          this.handleAlert();
        }
      );
  }

  handleLoader() {
    const interval = setInterval(() => {
      if (!this.network.connectionTestFailed) {
        this.isServerAvailable = true;
        this.getTemperatureAndHumidity();
        clearInterval(interval);
      }
      if (this.network.connectionTestFailed) {
        this.isLoaderVisible = false;
        this.handleAlert();
        clearInterval(interval);
      }
      if (this.weatherDataFailed) {
        this.isLoaderVisible = false;
        this.handleAlert();
        clearInterval(interval);
      }
    }, 300);
  }

  handleAlert() {
    if (this.network.connectionTestFailed) {
      this.alertMessage =
        'Cannot connect to the Server. check your connection in the network tab. ';
    }
    if (this.sensorDataFailed && !this.network.connectionTestFailed) {
      this.alertMessage =
        'Cannot connect to the temperature and humidity sensor, check wiring.';
    }
    if (this.weatherDataFailed) {
      this.alertMessage =
        'Cannot connect to the weather API, check your internet connection.';
    }
    this.isAllertVisible = true;
  }

  ngOnDestroy() {
    if (this.temperatureAndHumiditySub) {
      this.temperatureAndHumiditySub.unsubscribe();
    }
  }
}
