import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggerAutomationComponent } from './trigger-automation/trigger-automation.component';
import { FormsModule }  from '@angular/forms';
import { VnfCreateComponent } from './vnf-create/vnf-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TriggerAutomationComponent, VnfCreateComponent]
})
export class AutomationModule { }
