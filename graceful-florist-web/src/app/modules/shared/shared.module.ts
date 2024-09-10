import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {AsyncPipe, CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {TabCategoryComponent} from './components/tab-category/tab-category.component';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {GracefulFloristDateTimePickerComponent} from './components/date-time-picker/graceful-florist-date-time-picker.component';

@NgModule({
  declarations: [
    TabCategoryComponent,
    AutocompleteComponent,
    GracefulFloristDateTimePickerComponent
  ],
  imports: [
    AsyncPipe,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDivider,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTabsModule
  ],
  exports: [
    AutocompleteComponent,
    TabCategoryComponent,
    GracefulFloristDateTimePickerComponent,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDivider,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class SharedModule {}
