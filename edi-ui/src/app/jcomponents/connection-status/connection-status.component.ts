// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";

import { DataService } from '../../services/data/data.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'jnpr-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.css']
})
export class ConnectionStatusComponent implements OnInit {

    syslogStatus: string = "connecting";
    mbStatus: string = "connecting";
    dhcpStatus: string = "connecting";

    dhcpClass: any = {
        connecting: true,
        connected: false,
        disconnected: false
    };

    mbClass: any = {
        connecting: true,
        connected: false,
        disconnected: false
    };

    syslogClass: any = {
        connecting: true,
        connected: false,
        disconnected: false
    };

    subscriptionId: string = undefined;

    constructor(private dataService: DataService, private timerService: TimerService) { }

    // The setTimeout should be removed as it's not necessary.
    // It's only used to demo server lag determining connection status
    public updateStatus() {
        setTimeout(() => {
            this.dataService.getDCHPStatus()
                .subscribe((result) => {
                    if(result) {
                        this.dhcpStatus = "connected";
                        this.dhcpClass.connected = true;
                    }
                    else {
                        this.dhcpStatus = "disconnected";
                        this.dhcpClass.disconnected = true;
                    }
                    this.dhcpClass.connecting = false;
                });
        }, 2000);
        this.dataService.getMBStatus()
            .subscribe((result) => {
                if(result) {
                    this.mbStatus = "connected";
                    this.mbClass.connected = true;
                    this.mbClass.disconnected = false;
                }
                else {
                    this.mbStatus = "disconnected";
                    this.mbClass.connected = false
                    this.mbClass.disconnected = true;
                }
                // console.log(`Message Broker Status: ${this.mbStatus}`);
                this.mbClass.connecting = false;
            });
        setTimeout(() => {
            this.dataService.getSyslogStatus()
                .subscribe((result) => {
                    if(result) {
                        this.syslogStatus = "connected";
                        this.syslogClass.connected = true;
                    }
                    else {
                        this.syslogStatus = "disconnected";
                        this.syslogClass.disconnected = true;
                    }
                    this.syslogClass.connecting = false;
                });
        }, 1500);
    }

    ngOnInit() {
        this.subscriptionId = this.timerService.create(1000, e => this.updateStatus());
    }

}
