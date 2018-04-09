
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
  selector: 'app-vnf-create',
  templateUrl: './vnf-create.component.html',
  styleUrls: ['./vnf-create.component.css']
})
export class VnfCreateComponent implements OnInit {

  constructor(private dataService:DataService) { }
  automation:any = undefined;

  automationData:string = `{
    "vnf_vm_uuid":"bba6655d-5397-4bef-892d-65682dc8163f",
    "mgt_network_name":"internet",
    "test_vm_image_name":"ubuntu16.04",
    "vnf_flavor":"vSRX-D100-2CPU",
    "vnf_id_seed":"5",
    "tenant_name":"J-EDI_Demo",
    "os_av_zone":"nova"
 }`;

  automationName:string = "";

  isSuccess:boolean = true;
  hide:boolean = true;
  strongMessage = "";
  description = "";

  ngOnInit() {
    this.automation = JSON.parse(this.automationData);
  }

  onClick() {
    this.hide = true;
  }

  private resetAutomationData(automationData = undefined) {
    if(automationData) {
      this.automation = automationData;
    }
    else {
      this.automation = {
        tenant_name:"",
        vnf_vm_uuid:"",
        os_av_zone:"",
        vnf_id_seed:"",
        mgt_network_name:"",
        vnf_flavor:"",
        test_vm_image_name:""
      }
    }
  }

  onSubmit() {
    let automationCopy = Object.assign({}, this.automation);
    this.resetAutomationData();
    this.dataService.postVNFCreate(automationCopy)
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
