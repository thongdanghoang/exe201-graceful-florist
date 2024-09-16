import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideNativeDateAdapter} from '@angular/material/core';

import {CoreModule} from './modules/core/core.module';
import {SharedModule} from './modules/shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatPaginatorIntlImpl} from './modules/shared/components/mat-paginator-intl-impl/mat-paginator-intl-impl';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    FooterComponent
  ],
  imports: [
    AngularSvgIconModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {provide: MatPaginatorIntl, useValue: MatPaginatorIntlImpl()}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
