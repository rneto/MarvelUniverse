import { Injectable } from '@angular/core';
import { Layout } from '../models/layout';
import { layout } from './mock-layout';
import { Observable, of } from 'rxjs';

@Injectable()
export class WelcomeService {

  constructor() { }

  getLayout(): Observable<Layout> {
    return of(layout);
  }
}
