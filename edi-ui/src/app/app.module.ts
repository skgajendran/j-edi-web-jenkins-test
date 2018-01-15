// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {LayoutModule} from "./layout/layout.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from "./app-routing.module";
import { AutomationModule } from './automation/automation.module';
import { NotificationsModule } from './notifications/notifications.module'

import { ServicesModule } from './services/services.module';
import { JcomponentsModule } from './jcomponents/jcomponents.module';
import { SharedModule } from './shared/shared.module';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    LayoutModule,
    AppRoutingModule,
    ServicesModule,
    JcomponentsModule,
    SharedModule,
    HttpModule,
    AutomationModule,
    NotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
