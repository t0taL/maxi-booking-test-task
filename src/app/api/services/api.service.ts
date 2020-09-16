import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env';


@Injectable()
export class ApiService {
  private readonly params: HttpParams = new HttpParams();
  private readonly headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  get<T>(url: string, params: HttpParams = this.params, headers: HttpHeaders = this.headers): Observable<T> {
    return this.http.get<T>(`${env.apiUrl}${url}`, { params, headers });
  }

  getXML<T>(url: string, params: HttpParams = this.params, headers?: HttpHeaders): Observable<T> {
    headers = new HttpHeaders({
      'Content-Type': 'text/xml',
      Accept: 'text/xml'
    });
    return this.http.get<T>(`${env.apiUrl}${url}`, { params, headers, responseType: 'text' as 'json' });
  }
}
