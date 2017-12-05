import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {
  CsvData: any;
  fileDetails: any;
  linkID:number;
  info:boolean=true;
  isLink=false;
  loader:boolean=false;
  generatedLink:string;
  constructor(private appService:AppService) { }

  ngOnInit() {
    this.generatedLink=`${location.protocol}//${location.host}/#/linechart/`;
  }

  fnUploadCSV(event) {
    if (event.target.files[0]) {
      this.fileDetails = event.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.CsvData = e.target.result;
        this.fnParseCSV(this.CsvData);
      }
      reader.readAsBinaryString(event.target.files[0]);
    }

  }

  fnParseCSV(csvData) {
    let parsedCSVJson = [];
    let rowDataArray = csvData.split('\n');
    for (let rowCount = 0; rowCount < rowDataArray.length; rowCount++) {
      if (rowDataArray[rowCount].length > 1) {
        console.log(rowDataArray[rowCount]);
        let seriesObj = {};
        let seriesArray = [];
        let seriesName = rowDataArray[rowCount].split(',')[0];
        rowDataArray[rowCount].split(',').map((value, index) => {
          if (index !== 0) {
            seriesArray.push({ year: parseInt(value.split('|')[0]), value: parseInt(value.split('|')[1]) });
          }
        })
        seriesObj[seriesName] = seriesArray;
        parsedCSVJson.push(seriesObj);
      }
    }
    this.generatePayload(parsedCSVJson);
  }

  generatePayload(parsedCSVJson) {
    let payload= parsedCSVJson.reduce((total, value, index) => {
      let key = Object.keys(value)[0];
      total[key] = value[key];
      return total;
    }, {})
    this.postCSVData(payload);
  }


  postCSVData(payload) {
    this.loader=true;
    this.appService.postCSVData(payload).subscribe((response)=>{
      this.info=false;
      this.loader=false;
      this.isLink=true;

      this.linkID=response._id;
    })
  }
}
