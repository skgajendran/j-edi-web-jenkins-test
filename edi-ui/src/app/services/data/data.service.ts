// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from "rxjs/Rx";
import { environment } from '../../../environments/environment';
import { serializePath } from '@angular/router/src/url_tree';
import { hostname } from 'os';

import { CredsService } from './creds.service';

const OPEN = 1

@Injectable()
export class DataService {

    webSocketClient: any = undefined;

    constructor(private http: Http, private credsService:CredsService) {
        
    }

    getDCHPStatus(): Observable < boolean > {
        return Observable.of < boolean > (false);
    }

    getSyslogStatus(): Observable < boolean > {
        return Observable.of < boolean > (false);
    }

    getMBStatus(): Observable < boolean > {
        if (this.webSocketClient && this.webSocketClient.ws.readyState === OPEN)
            return Observable.of < boolean > (true);
        else
            return Observable.of < boolean > (false);
    }

    postAutomationProvisioning(provisionData:any): Observable<Response> {
        let serviceName = this.credsService.getAPIServerEndpoint();
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let serviceUrl = `http://${serviceName}/automation/stacks/provision`;
        return this.http
            .post(serviceUrl, provisionData)
            .catch(err => {
                console.log('Error kicking off automation provisioning.');
                return Observable.throw(err);
            });  
    }

    getAutomationResults(): Observable < Response > {
        let serviceName = this.credsService.getAPIServerEndpoint();
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let serviceUrl = `http://${serviceName}/automation-results/results`;
        return this.http
            .get(serviceUrl)
            .catch(err => {
                console.log('Could not get transactions');
                return Observable.throw(err);
            });  
    }

    getAutomationResult(id:string): Observable < Response > {
        let serviceName = this.credsService.getAPIServerEndpoint();
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });
        let serviceUrl = `http://${serviceName}/automation-results/results/${id}`;
        return this.http
            .get(serviceUrl)
            .catch(err => {
                console.log('Could not get transaction');
                return Observable.throw(err);
            });  
    }
}
