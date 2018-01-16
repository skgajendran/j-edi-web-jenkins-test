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

@Injectable()
export class EventMessageService {

    constructor() { }

    private _rawMessage: Array < any > = [];
    private _rabbitMessages:RabbitMessage[] = [];

    public getRabbitMessages():RabbitMessage[] {
        return this._rabbitMessages;
    }
    
    public pushMessage(message: any) {
        console.log(message);
        this._rawMessage.push(message);

        if (message && message.body && message.body != '') {
            try {
                let rabbitMessage:RabbitMessage = JSON.parse(message.body);
                this._rabbitMessages.push(rabbitMessage);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
