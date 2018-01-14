// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

const FILE_NAME = 'Select a Document for Upload...';

@Component({
    selector: 'jnpr-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
    @Input() multiple: boolean = false;
    @Input() accept: string = '.xlsx';
    @ViewChild('fileInput') inputEl: ElementRef;

    fileName:string = FILE_NAME;
    disableUpload:boolean = false;

    private file:any = undefined;
    private apiUrl: string = "URL GOES HERE";

    constructor(private http: Http) {}

    onUpload(event) {
        let formData = new FormData();
        formData.append('file', this.file, this.fileName);
        this.disableUpload = true;
        this.fileName = `Uploading ${this.fileName}...Please Wait`;
        this.http
            .post(this.apiUrl + 'upload', formData)
                .map(response => response.json())
                .subscribe((data) => {
                    console.log(data);
                    this.fileName = `Uploaded ${data.fileName} successfully!`;
                    this.disableUpload = false;
                });  
    }

    onClear(event) {
        this.file = undefined;
        this.fileName = FILE_NAME;
    }

    upload() {
        let inputEl: HTMLInputElement = this.inputEl.nativeElement;
        let fileCount: number = inputEl.files.length;
        this.file = inputEl.files[0];
        this.fileName = this.file.name;
    }
}
