import { Component, OnInit } from '@angular/core';
import { RecommendationDataService } from './../recommendation-data.service';
import { Subscription } from 'rxjs';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';

@Component({
  selector: 'tc-app-home',
  templateUrl: './take-care-home.component.html',
  styleUrls: ['./take-care-home.component.css']
})
export class TakeCareHomeComponent implements OnInit {
  forecastWeather: any = <any>{};
  openModalVar: boolean = false;
  modalRecommend: any = <any>{};
  modalTitle: any;
  modalConfig: any = <any>{};

  singleSpaProps: SingleSpaProps;
  subscription: Subscription;

  private paramsForRecommendation: any = {
    "default":{

    },
    "health":{

    },
    "weather":{

    },
    "forecastWeather":[

    ]
};

  upcomingPeriod = {
    "place" : "",
    "from" : "",
    "to" : "",
    "recommendations" : {
      "FITNESS" : [],
      "CLOTHING" : [],
      "DIET" : []
    }
  };

  newRecommendations:any = {
    "FITNESS": [],
    "DIET": [],
    "CLOTHING": []
  };

  paramsForRecomm:any=[];
  tileConfig:any=[];
  defaultParams:{};

  constructor(private recommDataSvc: RecommendationDataService) {
    this.paramsForRecomm = this.recommDataSvc.parametersForRecommendation;
    this.tileConfig = this.recommDataSvc.recommendationsTilesConfig;
    
    this.defaultParams = {
      "MONTH": 1 + new Date().getMonth()
    }

  }

  ngOnInit(): void {

      //Recieving props from root
      this.subscription = singleSpaPropsSubject.subscribe(
        props => {
          console.log('props subscribe call back');
          this.singleSpaProps = props;
          
          this.utiliseWeatherAppForecastData(this.singleSpaProps["weatherParams"]);
          this.utiliseHealthAppData(this.singleSpaProps["healthParams"]);
          
        }
        
      );

      this.updateParams("default",this.defaultParams);
      console.log('--default params--',this.paramsForRecommendation["default"]);
      let newlyFetchedRecommendations = this.recommDataSvc.getRecomCodesByParams(this.paramsForRecommendation["default"], this.recommDataSvc.defaultParametersForEvaluation);
      this.updateRecommendations(newlyFetchedRecommendations);
      console.log('--after default params--',this.newRecommendations);
  }

  updateRecommendations(newlyFetchedRecommendations){
    console.log('reecoms before update', this.newRecommendations);
    this.paramsForRecomm.forEach(paramForRecomm => {
      newlyFetchedRecommendations[paramForRecomm].forEach(recommendation=>{
        if(!this.newRecommendations[paramForRecomm].includes(recommendation)){
          this.newRecommendations[paramForRecomm].push(recommendation);
        }
      });
    });
    console.log('reecoms after update', this.newRecommendations);
  }

  updateParams(paramCategory,newParams){

    Object.keys(newParams).forEach(paramKey=>{
      this.paramsForRecommendation[paramCategory][paramKey] = newParams[paramKey];
    });

  }

  utiliseWeatherAppForecastData(weather_detail){
    if(Object.keys(weather_detail).length){
        
        //current
        this.updateParams("weather",weather_detail.localPlaceWeather);
        console.log('--adding weather params--',this.paramsForRecommendation);
        let newlyFetchedRecommendations = this.recommDataSvc.getRecomCodesByParams(this.paramsForRecommendation["weather"],this.recommDataSvc.weatherParametersForEvaluation);
        this.updateRecommendations(newlyFetchedRecommendations);

        //upcoming
        this.upcomingPeriod["place"] = weather_detail.forecastWeather["PLACE"],
        this.upcomingPeriod["from"] = weather_detail.forecastWeather["FROM"],
        this.upcomingPeriod["to"] = weather_detail.forecastWeather["TO"];

        this.updateParams("forecastWeather",weather_detail.forecastWeather.weatherData);
        console.log('--adding upcoming weather params--',this.paramsForRecommendation["forecastWeather"]);
        this.upcomingPeriod["recommendations"] = this.recommDataSvc.getRecomCodesForWeatherForecast(this.paramsForRecommendation["forecastWeather"]);
        
        console.log('--Recoms Based on Weather--',this.newRecommendations,this.upcomingPeriod.recommendations);
        //this.notifyNavBarForNewRecommendations();
    }
  }

  utiliseHealthAppData(health_detail){
    if(Object.keys(health_detail).length){

      this.updateParams("health",health_detail);
      console.log('--adding health params--',this.paramsForRecommendation["health"]);

      let newlyFetchedRecommendations = this.recommDataSvc.getRecomCodesByParams(this.paramsForRecommendation["health"],this.recommDataSvc.healthParametersForEvaluation);
      this.updateRecommendations(newlyFetchedRecommendations);

      console.log('--Recoms Based on Health--',this.newRecommendations, this.upcomingPeriod.recommendations);
      //this.notifyNavBarForNewRecommendations();
    }
  }

  openModal(recommend, config, title){
    this.openModalVar = true;
    this.modalConfig = config;
    this.modalRecommend = recommend;
    this.modalTitle = title;
  }

  notifyNavBarForNewRecommendations(){
    document.dispatchEvent(new CustomEvent('newNotificationFromTakecare', {
      detail: {
        notification: true
      }
    }));
  }

}
