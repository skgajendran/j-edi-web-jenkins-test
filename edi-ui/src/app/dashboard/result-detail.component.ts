// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
// import { Subject } from 'rxjs/Subject';

import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.html',
  styleUrls: []
})
export class ResultDetailComponent implements OnInit {
  playResult: any = {};
  params: any = undefined;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(parameters => {
      this.params = parameters;
    });
  }

  ngOnInit(): void {

    this.dataService.getAutomationResult(this.params['id'])
      .map((response) => response.json())
      .subscribe((ret) => {
        this.playResult = {
            results: ret.results[0]//JSON.stringify(ret.results[0], null, 2);
        }
      }, (error) => {
        console.log(error);
      });
  }
}
