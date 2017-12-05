import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from '../app.service';
import * as c3 from 'c3';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  chartId: number;
  constructor(private activatedRoute: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.chartId = params['id'];
      this.getChartData(this.chartId);
    })

    



  }

  getChartData(chartId) {
    this.appService.getLineChartDataById(chartId).subscribe((response) => {
      this.generateChartInfo(response);
    })
  }

  generateChartInfo(response) {
    let xsObject = Object.keys(response).reduce((total, value, index) => {
      total[value] = value + 'year';
      return total;
    }, {});


    let columnsArray = [];
    Object.keys(response).map(value => {
      let values = response[value].map(responseValue => responseValue.value)
      let years = response[value].map(responseValue => responseValue.year)
      values.unshift(value)
      years.unshift(value + 'year');
      columnsArray.push(years, values);
    })
    this.generateChart(xsObject, columnsArray);

  }


  generateChart(xsObject, columnsArray) {
    var chart = c3.generate({
      bindto: '#chart1',
      data: {
        xs: xsObject,
        columns: columnsArray
      }
    })
  }

}