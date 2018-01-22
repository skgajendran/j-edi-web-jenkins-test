// Copyright 2017 Juniper Networks, Inc. All rights reserved.
// Licensed under the Juniper Networks Script Software License (the "License"). 
// You may not use this script file except in compliance with the License, which is located at 
// http://www.juniper.net/support/legal/scriptlicense/
// Unless required by applicable law or otherwise agreed to in writing by the parties, 
// software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
// either express or implied.
import {
  Directive, ElementRef, OnInit,
  AfterContentInit
} from '@angular/core';

import {Router, NavigationEnd} from "@angular/router";

declare const jQuery: any;

@Directive({
  selector: '[jnprMenu]'
})
export class MenuDirective implements OnInit, AfterContentInit {

  private $menu:any;

  constructor(
    private menu:ElementRef,
    private router: Router,
  ) {
    this.$menu = jQuery(this.menu.nativeElement);
  }

  ngOnInit() {


  }

  private togglersBinded = false;
  ngAfterContentInit() {
    if(!this.togglersBinded){
      this.$menu.find('li:has(> ul)').each((i, li)=> {
        let $menuItem = $(li);
        let $a = $menuItem.find('>a');
        let sign = $('<b class="collapse-sign expando"><em class="fa fa-plus-square-o"/></b>');

        $a.on('click', (e)=> {
          this.toggle($menuItem);
          e.stopPropagation();
          return false;
        }).append(sign);
        
      });
      this.togglersBinded = true;
    }
  }

  ngOnDestroy() {
   
  }

  private processLayout = (store)=>{
    if (store.menuOnTop) {
      this.$menu.find('li.open').each((i, li)=> {
        this.toggle($(li), false)
      })
    } else {
      this.$menu.find('li.active').each((i, li)=> {
        $(li).parents('li').each((j, parentLi)=>{
          this.toggle($(parentLi), true)
        })
      })
    }

    if(store.mobileViewActivated){
      $('body').removeClass("minified");
    }
  };

  private toggle($el, condition = !$el.data('open')) {
    $el.toggleClass('open', condition);

    if(condition){
      $el.find('>ul').slideDown();
    } else {
      $el.find('>ul').slideUp();
    }

    $el.find('>a>.collapse-sign>em')
      .toggleClass('fa-plus-square-o', !condition)
      .toggleClass('fa-minus-square-o', condition);

    $el.data('open', condition);

    if (condition) {
      $el.siblings('.open').each((i, it)=> {
        let sib = $(it);
        this.toggle(sib, false)
      })
    }
  }

}
