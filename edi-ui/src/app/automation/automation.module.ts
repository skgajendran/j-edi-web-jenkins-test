import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggerAutomationComponent } from './trigger-automation/trigger-automation.component';
import { FormsModule }  from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [TriggerAutomationComponent]
})
export class AutomationModule { }
