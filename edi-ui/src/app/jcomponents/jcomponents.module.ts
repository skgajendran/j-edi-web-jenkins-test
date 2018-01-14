// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionStatusComponent } from './connection-status/connection-status.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ZtpResultComponent } from './ztp-result/ztp-result.component';
import { SharedModule } from "../shared/shared.module";
import { NgxJsonViewerComponent } from './ngx-json-viewer/ngx-json-viewer.component'
import { AnsibleResultComponent } from './ansible-result/ansible-result.component'

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ConnectionStatusComponent, UploaderComponent, ZtpResultComponent, NgxJsonViewerComponent, AnsibleResultComponent],
  exports:[ConnectionStatusComponent, UploaderComponent, ZtpResultComponent, NgxJsonViewerComponent, AnsibleResultComponent]
})
export class JcomponentsModule { }
