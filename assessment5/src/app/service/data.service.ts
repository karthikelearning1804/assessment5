import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( public httpClient: HttpClient ) { }
  private url = "http://127.0.0.1:6200/login/";
  public sendGetRequest(email,pwd,type) {
    return this.httpClient.get(this.url+email+"/"+pwd+"/"+type);
  }
}
