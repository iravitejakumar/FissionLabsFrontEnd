import { Route } from '@angular/router';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';
import { LineChartComponent } from './line-chart/line-chart.component';
export const routes: Route[] = [
    {
        path: 'uploadcsv',
        component: UploadCsvComponent,
    },
    {
        path: 'linechart/:id',
        component: LineChartComponent
    },
    { path: '**', redirectTo: 'uploadcsv' }

];


