// Copyright 2018 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-trigger-automation',
  templateUrl: './trigger-automation.component.html',
  styleUrls: ['./trigger-automation.component.css']
})
export class TriggerAutomationComponent implements OnInit {

  constructor(private dataService:DataService) { }
  automation:any = {
    tenant_name:"jedi-fwvnfmgr",
    stack_name:"STACK_201801132127_ZRDM3FRWL95OAM"
  }

  automationName:string = "";

  isSuccess:boolean = true;
  hide:boolean = true;
  strongMessage = "";
  description = "";

  ngOnInit() {
  }

  onClick() {
    this.hide = true;
  }

  onSubmit() {
    console.log(this.automation);
    this.dataService.postAutomationProvisioning(this.automation, this.automationName)
    .map(response => response.json())
    .subscribe((result) => {
        this.strongMessage = "Success";
        this.description = result.results;
        this.hide = false;
        this.isSuccess = true;
        console.log(result);
    },
    (error) => {
      this.strongMessage = "Error";
      this.isSuccess = false;
      this.description = "Could not start Provisioning.";
      this.hide = false;
    }
  );
  }

}
