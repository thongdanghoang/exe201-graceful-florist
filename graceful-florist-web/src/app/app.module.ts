import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideNativeDateAdapter} from '@angular/material/core';

import {CoreModule} from './modules/core/core.module';
import {SharedModule} from './modules/shared/shared.module';
import {GracefulFloristHeaderComponent} from './graceful-florist-header/graceful-florist-header.component';
import {GracefulFloristFooterComponent} from './graceful-florist-footer/graceful-florist-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    GracefulFloristHeaderComponent,
    GracefulFloristFooterComponent
  ],
  imports: [AppRoutingModule, BrowserModule, CoreModule, SharedModule],
  providers: [provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule {}
