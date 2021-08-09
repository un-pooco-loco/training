import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TakeCareHomeComponent } from './take-care-home/take-care-home.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecommendationsAppComponent } from './recommendations-app/recommendations-app.component';
import { RecommendationDataService } from './recommendation-data.service';
import { RecommendationsModalComponent } from './recommendations-modal/recommendations-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TakeCareHomeComponent,
    EmptyRouteComponent,
    RecommendationsAppComponent,
    RecommendationsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecommendationDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
