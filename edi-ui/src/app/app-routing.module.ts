// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ResultComponent } from './dashboard/result.component';
import { ResultDetailComponent } from './dashboard/result-detail.component'
import { TriggerAutomationComponent } from './automation/trigger-automation/trigger-automation.component';

import { AppComponent } from './app.component';
import {LayoutComponent} from "./layout/layout.component";


const routes: Routes = [
    { 
      path: '', 
      component: LayoutComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: "full" },
        { path: 'dashboard',  component: DashboardComponent },
        { path: 'results/:id',  component: ResultComponent },
        { path: 'results-detail/:id',  component: ResultDetailComponent },
        { path: 'automation/trigger-automation', component: TriggerAutomationComponent }
      ]
    }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
