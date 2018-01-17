// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataService } from './data/data.service';
import { EventBusService } from './data/event-bus.service';
import { WebSocketService } from './data/websocket.service';
import { TimerService } from './timer.service';
import { MqService } from './mq.service';
import { EventMessageService } from './data/event-message.service';
import { CredsService } from './data/creds.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[DataService, WebSocketService, EventBusService, TimerService, MqService, EventMessageService, CredsService]
})
export class ServicesModule { 
  constructor( @Optional() @SkipSelf() parentModule: ServicesModule) {}
}
