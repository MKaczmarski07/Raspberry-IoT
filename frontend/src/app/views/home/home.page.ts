import { Component } from '@angular/core';
import { GpioService } from 'src/app/data-access/gpio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentTemperature: number | null = null;
  currentHumidity: number | null = null;
  temperatureAndHumiditySub: Subscription | undefined;
  sensorDataLoaded = false;
  sensorDataFailed = false;
  weatherDataLoaded = false;
  weatherDataFailed = false;
  connectionTestFailed = false;
  isLoaderVisible = true;
  isAllertVisible = false;
  alertMessage = '';

  constructor(private gpioService: GpioService) {}

  ionViewWillEnter() {
    this.checkConnection();
    this.getTemperatureAndHumidity();
    this.handleLoader();
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
          this.sensorDataFailed = true;
        }
      );
  }

  checkConnection() {
    this.gpioService.checkConnection().subscribe(
      (response) => {
        this.connectionTestFailed = false;
      },
      (error) => {
        this.connectionTestFailed = true;
      }
    );
  }

  handleLoader() {
    const interval = setInterval(() => {
      if (this.connectionTestFailed) {
        this.isLoaderVisible = false;
        this.handleAlert();
        clearInterval(interval);
      }
      if (this.sensorDataLoaded && this.weatherDataLoaded) {
        this.isLoaderVisible = false;
        clearInterval(interval);
      }
      if (this.sensorDataFailed && !this.connectionTestFailed) {
        console.log('sensorDataFailed');
        this.isLoaderVisible = false;
        this.handleAlert();
        clearInterval(interval);
      }
      if (this.weatherDataFailed) {
        this.isLoaderVisible = false;
        this.handleAlert();
        clearInterval(interval);
      }
    }, 100);
  }

  handleAlert() {
    if (this.connectionTestFailed) {
      this.alertMessage =
        'Cannot connect to the Server. check your connection in the network tab. ';
    }
    if (this.sensorDataFailed && !this.connectionTestFailed) {
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
