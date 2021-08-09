import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tc-app-recommendations-app',
  templateUrl: './recommendations-app.component.html',
  styleUrls: ['./recommendations-app.component.css']
})
export class RecommendationsAppComponent implements OnInit {
  @Input() recommend;
  @Input() recommendTitle;
  @Input() config;
  @Input() upcomingRecommendationsNumber;
  constructor() { }

  ngOnInit(): void {
  }
}
