// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { OnInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'jnpr-ansible-result',
  templateUrl: './ansible-result.component.html',
  styleUrls: ['./ansible-result.component.css']
})
export class AnsibleResultComponent implements OnInit  {
    @Input() playResult:any = {};

    ngOnInit() {
        
    }
    constructor() { 
    }


}
