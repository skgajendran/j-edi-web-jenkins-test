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
import { Routes } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  results: any[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  constructor(private dataService:DataService) { }

  ngOnInit():void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.dataService.getAutomationResults()
    .map((response) => response.json())
    .subscribe((ret) => {
      this.results = ret.results;
      console.log(this.results);
      this.dtTrigger.next();
    },(error) => {
        console.log(error);
    });
  }

  onViewResult(result:string):void {
    this.dataService.getAutomationResult(result)
    .map((response) => response.json())
    .subscribe((ret) => {
      result = ret.results;
      console.log(result)
    },(error) => {
        console.log(error);
    });
  }

}
