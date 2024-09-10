import {NgModule} from '@angular/core';
import {ToolboxComponent} from './components/toolbox/toolbox.component';
import {SharedModule} from '../shared/shared.module';
import {DevRoutingModule} from './dev-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [ToolboxComponent],
  imports: [CommonModule, DevRoutingModule, SharedModule]
})
export class DevModule {}
