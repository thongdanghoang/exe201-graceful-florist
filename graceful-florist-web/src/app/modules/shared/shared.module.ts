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
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {TabCategoryComponent} from './components/tab-category/tab-category.component';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {GracefulFloristDateTimePickerComponent} from './components/date-time-picker/graceful-florist-date-time-picker.component';
import {ImageCardComponent} from './components/image-card/image-card.component';
import {ImageCardHorizontalComponent} from './components/image-card-horizontal/image-card-horizontal.component';
import {CommentCardComponent} from './components/comment-card/comment-card.component';
import {VndCurrencyPipe} from './pipes/vnd-currency.pipe';
import {SvgIconComponent} from 'angular-svg-icon';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {PaginatorLabelDirective} from './directives/paginator-label.directive';
import {CounterComponent} from './components/counter/counter.component';
import {MatBadgeModule} from '@angular/material/badge';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorMessagesDirective} from './directives/error-messages.directive';
import {TranslateParamsPipe} from './pipes/translate-params.pipe';
import {MatErrorDirective} from './directives/mat-error.directive';

@NgModule({
  declarations: [
    TabCategoryComponent,
    AutocompleteComponent,
    GracefulFloristDateTimePickerComponent,
    ImageCardComponent,
    ImageCardHorizontalComponent,
    CommentCardComponent,
    VndCurrencyPipe,
    BreadcrumbComponent,
    PaginatorLabelDirective,
    CounterComponent,
    ErrorMessagesDirective,
    TranslateParamsPipe,
    MatErrorDirective
  ],
  imports: [
    AsyncPipe,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SvgIconComponent,
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
    MatTabsModule,
    NgOptimizedImage,
    MatButtonToggleModule,
    MatMenuModule,
    MatBadgeModule
  ],
  exports: [
    ErrorMessagesDirective,
    TranslateParamsPipe,
    MatErrorDirective,
    AutocompleteComponent,
    TabCategoryComponent,
    GracefulFloristDateTimePickerComponent,
    ImageCardComponent,
    ImageCardHorizontalComponent,
    VndCurrencyPipe,
    BreadcrumbComponent,
    CommentCardComponent,
    PaginatorLabelDirective,
    CounterComponent,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
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
    MatTabsModule,
    NgOptimizedImage,
    MatButtonToggleModule,
    MatMenuModule,
    MatBadgeModule
  ]
})
export class SharedModule {}
