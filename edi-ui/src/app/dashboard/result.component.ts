// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Subject } from 'rxjs/Subject';

import { DatePipe } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { KeysPipe } from '../shared/keys.pipe';


import 'rxjs/add/operator/map';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  playResult: any = {};
  params: any = undefined;
  resultId: string = '';
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject < any > = new Subject();

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(parameters => {
      this.params = parameters;
    });
  }

  resultOpen: boolean = false;

  finalResults: any[] = [];
  someObject: any = undefined;

  onOpen(event, result) {
    this.resultOpen = !this.resultOpen;
  }

  private createFinalResults(result) {
    this.finalResults = [];
    this.formatResults(result)
    // if (result) {
    //   //for (let playResult of results) {
    //     this.finalResults.push(this.formatResults(result));
    //   //}
    //   this.finalResults = _.orderBy(this.finalResults, ['playResult.startTime'], ['desc']);
    // } else {
    //   let noResults = {
    //     playResult: {
    //       title: 'No Results',
    //       tasks: []
    //     }
    //   };
    //   this.finalResults.push(noResults);
    // }
  }

  private formatResults(result) {
    let ansibleResult = JSON.parse(result);
    this.playResult = ansibleResult[0];
    this.someObject = ansibleResult[0];
    // let transactionId = 1;
    // let transaction = {
    //   transactionId: transactionId,
    //   playResult: undefined
    // };
    // let pr = {
    //   transactionId: transactionId,
    //   title: '',
    //   verified: undefined,
    //   startTime: undefined,
    //   tasks: []
    // };
    // pr.startTime = this.playResult.play.starttime * 1000;
    // let startTime = moment(new Date(pr.startTime));
    // pr.title = `${playResult.play.name} - Start Time: ${startTime.format("MM-DD-YYYY h:mm a")}`;

    // if (playResult.play.verified != undefined && playResult.play.verified == true) {
    //   pr.verified = true;
    // } else if (playResult.play.verified != undefined && playResult.play.verified == false) {
    //   pr.verified = false;
    // }
    // transaction.playResult = pr;

    // for (let task of playResult.tasks) {
    //   let host = task.hosts[Object.keys(task.hosts)[0]]
    //   let hostname = Object.keys(task.hosts)[0];
    //   //TODO:  Create a blacklist service of messages we don't want to display
    //   if (host.invocation && host.invocation.module_name != 'notify_rabbit' && host.invocation.module_name != 'notify_redis' && (!host.ignore || host.ignore != 'yes')) {
    //     let status = "Success";
    //     let msg = `Successfully ran task ${host.invocation.module_name}`;
    //     if (host.failed) {
    //       status = "Failed";
    //       msg = "Unknown failure!";
    //       if (host.msg) {
    //         msg = host.msg;
    //       }
    //     }
    //     let taskResult = {
    //       host: hostname,
    //       status: status,
    //       msg: msg,
    //       name: task.task.name,
    //       invocation: host.invocation
    //     };
    //     pr.tasks.push(taskResult);
    //   }
    // }

    // return transaction;
  }

  ngOnInit(): void {
    this.resultId = this.params['id'];
    this.dataService.getAutomationResult(this.resultId)
      .map((response) => response.json())
      .subscribe((ret) => {
        let result = JSON.stringify(ret.results, null, 2);
        this.createFinalResults(result)
      }, (error) => {
        console.log(error);
      });
  }
}
