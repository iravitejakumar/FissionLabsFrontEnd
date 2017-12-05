import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';
import { routes } from './app.routes';
import { LineChartComponent } from './line-chart/line-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadCsvComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
