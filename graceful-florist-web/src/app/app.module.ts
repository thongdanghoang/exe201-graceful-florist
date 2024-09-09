import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {GracefulFloristDateTimePickerComponent} from './components/graceful-florist-date-time-picker/graceful-florist-date-time-picker.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, GracefulFloristDateTimePickerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule
  ],
  providers: [provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule {}
