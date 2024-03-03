import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/data-access/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  city = '';
  country = '';
  temperature = '0';
  weather = '';
  @Output() weatherDataLoaded = new EventEmitter<boolean>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
    this.getCityName();
  }

  async getWeather() {
    const weatherObservable = await this.weatherService.getWeather();
    weatherObservable.subscribe((data: any) => {
      this.country = data.sys.country;
      this.temperature = (data.main.temp - 273.15).toFixed(0);
      this.weather = data.weather[0].main;
      this.weatherDataLoaded.emit(true);
    });
  }

  async getCityName() {
    const cityObservable = await this.weatherService.getCorrectCityName();
    cityObservable.subscribe((data: any) => {
      this.city = data[0].name;
    });
  }
}
