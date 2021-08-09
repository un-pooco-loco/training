import { Component, OnInit, Input } from '@angular/core';
import { RecommendationDataService } from '../recommendation-data.service';

@Component({
  selector: 'tc-app-recommendations-modal',
  templateUrl: './recommendations-modal.component.html',
  styleUrls: ['./recommendations-modal.component.css']
})
export class RecommendationsModalComponent implements OnInit {
  @Input() recommend;
  @Input() title;
  @Input() config;
  @Input() upcomingPeriod;
  
  constructor(private recommDataSvc: RecommendationDataService) {
    this.upcomingPeriod ={
      "place" : "",
      "from" : "",
      "to" : "",
      "recommendations" : {
        "FITNESS" : [],
        "CLOTHING" : [],
        "DIET" : []
      }
    };
  
  }

  ngOnInit(): void {
    
  }

  convertCodesToText(code){
    return this.recommDataSvc.RECOM_CODES[code];
  }

}
