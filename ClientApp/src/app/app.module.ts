import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { StockDashboardComponent } from './stock-dashboard/stock-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderFormComponent } from './order-form/order-form.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { FeedbackResponseComponent } from './feedback-response/feedback-response.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    
    StockDashboardComponent,
    OrderHistoryComponent,
    OrderFormComponent,
    FeedbackPageComponent,
    FeedbackResponseComponent 
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
     
      { path: 'Stocks', component: StockDashboardComponent },
      { path: 'Orders', component: OrderHistoryComponent },
      { path: 'Feedback', component: FeedbackPageComponent },
      { path: 'responses', component: FeedbackResponseComponent },
    ]),
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    ChartsModule, 

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OrderFormComponent]
})
export class AppModule { }
