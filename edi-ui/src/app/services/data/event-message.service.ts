// Copyright 2018 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

import { Injectable } from '@angular/core';
import { RabbitMessage } from '../../models/RabbitMessage';

import * as moment from 'moment';
import * as _ from 'lodash';
import { concat } from 'rxjs/operator/concat';

@Injectable()
export class EventMessageService {

    constructor() { }

    private _rawMessage: Array < any > = [];
    private _rabbitMessages:RabbitMessage[] = [];

    private rabbitContainer:any = {
        routingKey:"",
        rabbitMessages:[] 
    };

    private containers:any[] = [];

    private rabs = new Map();

    public getRabbitMessages():any {
        return this.containers;
    }
    
    public pushMessage(message: any) {
        console.log(message);
        this._rawMessage.push(message);

        if (message && message.body && message.body != '') {
            try {
                let rabbitMessage:RabbitMessage = undefined;
                //Have to parse this twice based on the way the message is coming back from ansible
                let prMessage = JSON.parse(message.body);
                if(_.isObject(prMessage)) {
                    rabbitMessage = prMessage;
                }
                else {
                    rabbitMessage = JSON.parse(prMessage);
                }
                let destination = _.split(message.headers.destination, '/')
                let routingKey = destination[(destination.length - 1)];
                let container = _.find(this.containers, function(container) { return container.routingKey === routingKey; })

                if(!container) {
                    container = {
                        routingKey:routingKey,
                        rabbitMessages:[rabbitMessage] 
                    };
                    this.containers.unshift(container)
                }
                else {
                    container.rabbitMessages.unshift(rabbitMessage);
                }
    
            } catch (error) {
                console.log(error);
            }
        }
    }
}
