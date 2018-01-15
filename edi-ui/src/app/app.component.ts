// Copyright 2018 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Component, OnInit } from '@angular/core';

import { MqService } from './services/mq.service';
import { environment } from '../environments/environment';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Juniper Automation Platform';

  constructor(private dataService:DataService) { }
  private mqService: MqService = new MqService();
  
  
  ngOnInit() {

        this.mqService.connect(environment.mbEndpoint, environment.mbUsername, environment.mbPassword, "/exchange/jnpr.events/*");

        this.mqService.onConnect((connectedClient) => {
            this.dataService.webSocketClient = connectedClient.webSocketClient;
            console.log('connected to /exchange/jnpr.events/*');
        },
        (error) => {
            console.log('there is an error: ');
            console.log(error); 
        });
        this.mqService.onMessage((message) => console.log(message), (error) => console.log(error));

  }

}
