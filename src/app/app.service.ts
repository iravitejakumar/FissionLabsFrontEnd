import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { environment } from '../environments/environment';
import { urlConstants } from './shared/constants/urlConstants';
@Injectable()
export class AppService {

  apiUrl=environment.API_URL;
  constructor(private http:Http) { }

   /**
   * METHOD GET
   * to Get all Loans List
   */
  
  getLineChartDataById(id) {
    const url = this.apiUrl + urlConstants.lineChartDataurl+id;
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * METHOD GET
   * to Get all Loans List
   */
  postCSVData(payload) {
    const url = this.apiUrl + urlConstants.lineChartDataurl;
    return this.http.post(url,payload)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

   /**
   * Error Handler Function to handle api response errors
   * Should be movied to common service based on further approach
   */
  private handleError(error: any) {
    try {
      return Observable.throw(error.json());
    } catch (e) {
      return Observable.throw(error);
    }
  }

}
