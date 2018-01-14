// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { OnInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { KeysPipe } from '../../shared/keys.pipe';

declare var $: any;

@Component({
  selector: 'jnpr-ztp-result',
  templateUrl: './ztp-result.component.html',
  styleUrls: ['./ztp-result.component.css']
})
export class ZtpResultComponent implements OnInit  {
    @Input() finalResults:any[] = [];
    @Input() playResult:any = undefined;

    ngOnInit() {
        
    }

    onOpen(event, result) {
       
        let toOpen = `#result-${result.transactionId}`;
        let chevronId = `#chevron-${result.transactionId}`;

        let chevron = $(chevronId);
        let hasClass = chevron.hasClass('glyphicon-chevron-right');

        if(hasClass) {
            chevron.removeClass('glyphicon-chevron-right');
            chevron.addClass('glyphicon-chevron-down');
            $(toOpen).find('.result-hidden').removeClass('result-hidden');
        } 
        else {
            chevron.removeClass('glyphicon-chevron-down');
            chevron.addClass('glyphicon-chevron-right');
            $(toOpen).find('.result').addClass('result-hidden');    
        }
        
    }
  
    constructor() { 
    }


}
