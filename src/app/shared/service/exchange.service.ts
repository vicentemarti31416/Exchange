import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate } from '../model/rate';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  url: string = 'https://api.vatcomply.com/rates';

  constructor(
    private http: HttpClient
  ) { }

  public findAll(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public findByRate(rate: Rate): Observable<any> {
    return this.http.get<any>(`${this.url}?base=${rate.key}`);
  }

}
