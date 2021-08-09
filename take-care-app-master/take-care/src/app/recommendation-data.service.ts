import { Injectable } from '@angular/core';

import * as RECOM_CODES from './data/recomCodes.json';
import * as RECOM_BY_AGE from './data/recomByAge.json';
import * as RECOM_BY_BMI from './data/recomByBMI.json';
import * as RECOM_BY_MONTH from './data/recomByMonth.json';
import * as RECOM_BY_UVI from './data/recomByUVI.json';
import * as RECOM_BY_WEATHER_STATE from './data/recomByWeather.json';
import * as RECOM_BY_TEMP from './data/recomByTemp.json';

@Injectable({
  providedIn: 'root'
})


export class RecommendationDataService {
  recommendationsTilesConfig = {
    "FITNESS" : {
      "icon" : 'fa-dumbbell',
      "styleClass" : 'default-icon-bg'
    },
    "DIET" : {
      "icon" : 'fa-utensils',
      "styleClass" : 'default-icon-bg'
    },
    "CLOTHING" : {
      "icon" : 'fa-tshirt',
      "styleClass" : 'default-icon-bg'
    }
  };

  defaultParametersForEvaluation = [
    "MONTH"
  ]
  
  healthParametersForEvaluation = [
    "AGE", "BMI", "SEX"
  ];

  weatherParametersForEvaluation = [
    "UVI", "WEATHER_STATE", "TEMP"
  ]
  
  parametersForRecommendation = [
    "FITNESS", "DIET", "CLOTHING"
  ];

  constructor() {
    this.RECOM_CODES = RECOM_CODES["default"];
    this.RECOM_BY_AGE = RECOM_BY_AGE["default"];
    this.RECOM_BY_BMI = RECOM_BY_BMI["default"];
    this.RECOM_BY_MONTH = RECOM_BY_MONTH["default"];
    this.RECOM_BY_UVI = RECOM_BY_UVI["default"];
    this.RECOM_BY_WEATHER_STATE = RECOM_BY_WEATHER_STATE["default"];
    this.RECOM_BY_TEMP = RECOM_BY_TEMP["default"];
  }

  RECOM_CODES;
  RECOM_BY_AGE;
  RECOM_BY_BMI;
  RECOM_BY_MONTH;
  RECOM_BY_UVI;
  RECOM_BY_WEATHER_STATE;
  RECOM_BY_TEMP;

  weRecommend = {
    "FITNESS": [],
    "DIET": [],
    "CLOTHING": []
  };

  resetRecommendations(){
    this.weRecommend = {
      "FITNESS": [],
      "DIET": [],
      "CLOTHING": []
    };
  };

  getRecomCodesByParams(params, evaluationSet) {
    //this.resetRecommendations();
    let weRecommend = {
      "FITNESS": [],
      "DIET": [],
      "CLOTHING": []
    };

    evaluationSet.forEach(paramKey => {
      if (paramKey !== "SEX") { // TO DO: add specific recomms based on gender to the list when applicable (DIET_F, DIET_M etc)
        let recoms = this["RECOM_BY_" + paramKey];

        recoms.forEach(recom => {
          if ( this.matchParamUsingTypeOf(params[paramKey],recom) ) {
            this.parametersForRecommendation.forEach(paramKeyRecommend => {
              if (Object.keys(recom).includes(paramKeyRecommend)) {
                let recomCodeList = recom[paramKeyRecommend];
                recomCodeList.split('.').forEach(recomCode=>{
                  if( !weRecommend[paramKeyRecommend].includes(recomCode) ){
                    weRecommend[paramKeyRecommend].push(recomCode);
                  }
                });
              }
            });
            return; // as per current scenario only one recom will match for each parametersForEvaluation
          }
        });
      }
    });

    return weRecommend;
  }

  getRecomCodesForWeatherForecast(weatherForecastData){
    let weatherRecom = {
      "FITNESS": [],
      "DIET": [],
      "CLOTHING": []
    };

    weatherForecastData.forEach(dataOfTheDay => {
      let recommendationForThisDay = this.getRecomCodesByParams(dataOfTheDay,this.weatherParametersForEvaluation);
      console.log('recommendationForThisDay',recommendationForThisDay);
      this.parametersForRecommendation.forEach(paramForRecom=>{
        recommendationForThisDay[paramForRecom].forEach(itemOfRecom => {
            if(!weatherRecom[paramForRecom].includes(itemOfRecom)){
              weatherRecom[paramForRecom].push(itemOfRecom);
            }      
        });
        console.log(paramForRecom+' ForThisDay', weatherRecom[paramForRecom]);
      });
    });

    return weatherRecom;
  }


  //this method determines whether to check the parameter against a number value or a string value and then returns true if the matching type fits the condition
  matchParamUsingTypeOf(paramKey,recomObj){
    if(typeof(paramKey)=="number"){
      return (recomObj["MIN"] <= paramKey && recomObj["MAX"] >= paramKey);
    }else if(typeof(paramKey)=="string"){
      let condition = recomObj["CONDITION"].toLowerCase(), param = paramKey.toLowerCase();
      return (condition.includes(param) || param.includes(condition));
    }else{
      return false;
    }
  }

}
