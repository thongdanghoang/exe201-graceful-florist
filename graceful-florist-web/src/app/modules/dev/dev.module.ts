import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolboxComponent} from './components/toolbox/toolbox.component';
import {SharedModule} from '../shared/shared.module';
import {GracefulFloristDateTimePickerComponent} from './components/graceful-florist-date-time-picker/graceful-florist-date-time-picker.component';

@NgModule({
  declarations: [ToolboxComponent, GracefulFloristDateTimePickerComponent],
  imports: [SharedModule, CommonModule]
})
export class DevModule {}
