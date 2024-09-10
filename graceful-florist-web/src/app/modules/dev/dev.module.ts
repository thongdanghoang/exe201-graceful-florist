import {NgModule} from '@angular/core';
import {ToolboxComponent} from './components/toolbox/toolbox.component';
import {SharedModule} from '../shared/shared.module';
import {GracefulFloristDateTimePickerComponent} from './components/date-time-picker/graceful-florist-date-time-picker.component';
import {DevRoutingModule} from './dev-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ToolboxComponent, GracefulFloristDateTimePickerComponent],
  imports: [CommonModule, DevRoutingModule, SharedModule]
})
export class DevModule {}
