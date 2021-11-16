import { Component, OnInit } from '@angular/core';
import { ForecastData } from 'src/app/models/forecast.model';
import { ForecastDetails } from 'src/app/models/forecastDetail.model';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  showForecast: boolean = false;
  showCurrent: boolean = false;
  zipError: boolean = false;
  error: string = "";
  zip?: number;
  weatherData: any = {};
  forecastData: ForecastData = new ForecastData();

  constructor(private wfc: WeatherForecastService) { }

  ngOnInit(): void {
  }

  /*
   This is to show the forecasted weather information
  */
  forecastDataLoaded(res: any) {
    this.forecastData.name = res.city.name;
    this.showCurrent = false;
    this.showForecast = true;
    var j = 0;
    for (var i = 8; j < 3; i = i + 8)//Since we need 3 days, we need to Jumps 8 times to get to next day.(A day contains 8 list of details)
    {
      j = j + 1;
      var details = new ForecastDetails();
      details.date = res.list[i].dt_txt;
      details.maxTemperature = res.list[i].main.temp_max;
      details.minTemperature = res.list[i].main.temp_min;
      details.description = res.list[i].weather[0].description;
      details.icon = res.list[i].weather[0].icon;
      this.forecastData.details.push(details);
    }

  }

  wetherDataLoaded(res: any) {
    this.error = "";
    this.weatherData = res;
    this.showCurrent = true;
    this.showForecast = false;
  }

  loadWeatherForeCast(e: any, type: string) {
    e.preventDefault();
    if (!!this.zip) {
      this.zipError = false;
      this.wfc.LoadForecastWeather(this.zip, type, this);
    } else {
      this.zipError = true;
      this.error = "Please Enter zip code";
    }
  }


}


//Client ID
// bwsM5g9O6gndZ-8YS1hysQ

// API Key
// 9ejLORKsQnr8xFJrWV8rQmRx0HQV_G443_wXMtTxy9NAYsBsgvxe6zMUwIQFfOdhNafiYX23Nyelv3PhRaNWnht2ETt8rzlCXoEHL9s38J8MoLMfJ2YcTAaHqAxuYXYx
