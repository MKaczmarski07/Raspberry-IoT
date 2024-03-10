import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/data-access/weather.service';
import { DateService } from 'src/app/shared/date.service';

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
  iconSrc = '';
  date = '';
  @Output() weatherDataLoaded = new EventEmitter<boolean>();
  @Output() weatherDataFailed = new EventEmitter<boolean>();

  constructor(
    private weatherService: WeatherService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.getWeather();
    this.getCityName();
    this.date = this.dateService.getCurrentDate();
  }

  async getWeather() {
    const weatherObservable = await this.weatherService.getWeather();
    weatherObservable.subscribe(
      (data: any) => {
        this.country = data.sys.country;
        this.temperature = (data.main.temp - 273.15).toFixed(0);
        this.weather = data.weather[0].main;
        this.iconSrc = `../../../assets/images/weather/${data.weather[0].icon}.svg`;
        this.weatherDataLoaded.emit(true);
      },
      (error) => {
        this.weatherDataFailed.emit(true);
      }
    );
  }

  async getCityName() {
    const cityObservable = await this.weatherService.getCorrectCityName();
    cityObservable.subscribe((data: any) => {
      this.city = data[0].name;
    });
  }
}
