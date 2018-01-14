// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { UUID } from 'angular2-uuid';

interface SubscriptionList {
    [id: string]: {
        subscription: Subscription
    };
}

@Injectable()
export class TimerService {

    subscription: Subscription = undefined;
    subscriptionList: SubscriptionList = {};

    constructor() {}

    create(interval: number, callback: any): string {
        let uid = UUID.UUID();
        this.subscriptionList[uid] = {
            subscription: Observable.interval(interval)
            .subscribe(() => {
                callback();
            })
        };
        return uid;
    }

    cancel(uid:string):boolean {
		if (!uid || !this.subscriptionList[uid]) {
			return false;
		}
		this.subscriptionList[uid].subscription.unsubscribe();
        return true;
    }

}
