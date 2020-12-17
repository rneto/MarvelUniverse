import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';

import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';


import { NavigationComponent } from './components';
import { FindPipe } from './pipes/find.pipe';
import { JoinPipe } from './pipes/join.pipe';

const materialModules = [
  MatNativeDateModule,
  MatRippleModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    NavigationComponent,
    FindPipe,
    JoinPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,

    LayoutModule,
    ...materialModules
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,

    LayoutModule,
    ...materialModules,

    NavigationComponent,
    FindPipe,
    JoinPipe
  ],
})
export class CoreModule { }
