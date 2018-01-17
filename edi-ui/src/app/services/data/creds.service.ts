// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RabbitCredentials } from '../../models/RabbitCredentials';

@Injectable()
export class CredsService {

    constructor() {}

    getAPIServerEndpoint():string {
        let endpoint:string = undefined;
        if(environment.production) {
            endpoint = "${window.location.host}/api";
        }
        else {
            endpoint = environment.apiServer;
        }

        return endpoint;
    }

    getRabbitMQEndpoint():string {
        let endpoint:string = undefined;
        if(environment.production) {
            endpoint = window.location.hostname;
        }
        else {
            endpoint = environment.mbEndpoint;
        }        
        return endpoint;
    }

    getRabbitCredentials():RabbitCredentials {
        let creds:RabbitCredentials = {
            password:environment.mbPassword,
            username:environment.mbUsername
        };
        return creds;
    }
    
}
