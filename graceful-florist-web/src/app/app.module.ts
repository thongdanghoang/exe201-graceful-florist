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
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {UserService} from './mock/user.service';
import {TokenInterceptor} from './mock/token.interceptor';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    UserService,
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    {provide: MatPaginatorIntl, useValue: MatPaginatorIntlImpl()},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
