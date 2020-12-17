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
export class MockedMarvelApiService {
  private baseUrl = environment.marvelApi.baseUrl;
  private apiKey = environment.marvelApi.key;

  constructor(private router: Router, private http: HttpClient) {
  }

  comics(title: string, character: number, onSaleStartDate: Date, onSaleEndDate: Date): Observable<Comic[]> {

    return this.http.get<Comic[]>(`/assets/comics.json`).pipe(
      tap(res => this.log(`Fetched mocked comics!`)),
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

    return this.http.get<Character[]>(`/assets/characters.json`).pipe(
      tap(res => this.log(`Fetched mocked characters!`)),
      map((res: any) => {
        if (!res.data || !res.data.results) {
          throw new Error('Expected mocked characters!');
        }
        return <Character[]>res.data.results;
      }),
      catchError(this.handleError<Character[]>('characters', []))
    );
  }

  comic(id: number): Observable<Comic> {

    return this.http.get<Comic>(`/assets/comic.json`).pipe(
      tap(res => this.log(`Fetched mocked comic!`)),
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

}
