import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Character } from '../models';
import { Comic } from '../models/comic';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  private baseUrl = environment.marvelApi.baseUrl;
  private apiKey = environment.marvelApi.key;

  constructor(private router: Router, private http: HttpClient) {
  }

  comics(title: string, character: number, onSaleStartDate: Date, onSaleEndDate: Date): Observable<Comic[]> {
    const minDateLimit = -9999999999999;
    const maxDateLimit = 99999999999999;
    let titleStartsWith = title ? `titleStartsWith=${title}&` : '';

    let characters = character ? `characters=${character}&` : '';

    let onSale = '';
    if (onSaleStartDate !== null || onSaleEndDate !== null){
      onSale = `dateRange=`;
      onSale += this.formatDate(onSaleStartDate ?? new Date(minDateLimit * -1));
      onSale += `,`;
      onSale += this.formatDate(onSaleEndDate ?? new Date(maxDateLimit));
      onSale += `&`;
    }

    return this.http.get<Comic[]>(`${this.baseUrl}/comics?${titleStartsWith}${characters}${onSale}limit=100&apikey=${this.apiKey}`).pipe(
      tap(res => this.log(`Fetched comics!`)),
      map((res: any) => {
        if (!res.data || !res.data.results) {
          throw new Error('Expected comics!');
        }
        return <Comic[]>res.data.results;
      }),
      catchError(this.handleError<Comic[]>('comics', []))
    );
  }

  characters(name: string): Observable<Character[]> {
    let nameStartsWith = name ? `nameStartsWith=${name}&` : '';

    return this.http.get<Character[]>(`${this.baseUrl}/characters?${nameStartsWith}limit=100&apikey=${this.apiKey}`).pipe(
      tap(res => this.log(`Fetched characters!`)),
      map((res: any) => {
        if (!res.data || !res.data.results) {
          throw new Error('Expected characters!');
        }
        return <Character[]>res.data.results;
      }),
      catchError(this.handleError<Character[]>('characters', []))
    );
  }

  comic(id: number): Observable<Comic> {
    return this.http.get<Comic>(`${this.baseUrl}/comics/${id}?apikey=${this.apiKey}`).pipe(
      tap(res => this.log(`Fetched comic!`)),
      map((res: any) => {
        if (!res.data || !res.data.results) {
          throw new Error('Expected comic!');
        }
        return <Comic>res.data.results[0];
      }),
      catchError(this.handleError<Comic>('comic', null))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Log message.
   * @param message  - message to log
   */
  private log(message: string) {
    console.log(`MarvelApiService: ${message}`);
  }

  private formatDate(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
  }

}
