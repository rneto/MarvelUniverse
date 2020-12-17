import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  defaultDuration = 3;

  constructor(private snackBar: MatSnackBar) { }

  open(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: this.defaultDuration * 1000,
    });
  }
}
