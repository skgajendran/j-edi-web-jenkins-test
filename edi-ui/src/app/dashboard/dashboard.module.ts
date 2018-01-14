// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { ResultComponent } from './result.component';
import { ResultDetailComponent } from './result-detail.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { JcomponentsModule } from "../jcomponents/jcomponents.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    JcomponentsModule,
    SharedModule
  ],
  declarations: [DashboardComponent, ResultComponent, ResultDetailComponent]
})
export class DashboardModule { }
