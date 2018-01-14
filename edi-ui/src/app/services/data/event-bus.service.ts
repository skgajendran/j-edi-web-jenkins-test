// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable, Subject } from "rxjs/Rx";
import { environment } from '../../../environments/environment';

import { WebSocketService } from './websocket.service';


@Injectable()
export class EventBusService {
    
    public eventbus: Subject<MessageEvent>;

    constructor(private websocket:WebSocketService) {}

    public create(authToken:string):void {
        console.log('creating the websocket in the EventBusService');
    }

    public status():number {
        return this.websocket.status();
    }

}