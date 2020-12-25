import { ModuleAction } from './../../../models/moduleActions';
import { Modules } from './../../../models/Modules';
import { CommonService } from './../../Shared/shared-libs/Common.service';
import { EnumService } from './../../../services/enum.service';
import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as _ from 'lodash';

declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {

  toggle: any = false;
  username: any;
  userId = sessionStorage.getItem('userId');
  modules: Modules[];
  licensedPerson: any = false;

  constructor(private router: Router, private enumService: EnumService, private commonService: CommonService) { }
  userType = Number(sessionStorage.getItem("userType"));
  ngOnInit(): void {


  

    this.username = sessionStorage.getItem('username');
    if (this.checkLicensedPerson()) {
      this.licensedPerson = true;
      localStorage.setItem('licensedPerson','true')
      
    }
    //admin
    

   
        this.getSideNavMenuItems();
    
  }


  ngAfterViewInit() {

    // Navigation
    $(document).ready(function () {



      $('.sidebar-toggle').click(function () {
        this.toggle = !this.toggle;
        if (this.toggle) {
          $("html").addClass("fixed js flexbox flexboxlegacy no-touch csstransforms csstransforms3d no-overflowscrolling no-mobile-device custom-scroll sidebar-left-collapsed");
        }
        else {
          $("html").removeClass("sidebar-left-collapsed");
        }



      });
      //sidebar
      var $items = $('.nav-main li.nav-parent');

      function expand($li) {
        $li.children('ul.nav-children').slideDown('fast', function () {
          $li.addClass('nav-expanded');
          $(this).css('display', '');
          ensureVisible($li);
        });
      }

      function collapse($li) {
        $li.children('ul.nav-children').slideUp('fast', function () {
          $(this).css('display', '');
          $li.removeClass('nav-expanded');
        });
      }

      function ensureVisible($li) {
        var scroller = $li.offsetParent();
        if (!scroller.get(0)) {
          return false;
        }

        var top = $li.position().top;
        if (top < 0) {
          scroller.animate({
            scrollTop: scroller.scrollTop() + top
          }, 'fast');
        }
      }

      $items.find('> a').on('click', function (ev) {

        var $anchor = $(this),
          $prev = $anchor.closest('ul.nav').find('> li.nav-expanded'),
          $next = $anchor.closest('li');

        if ($anchor.prop('href')) {
          var arrowWidth = parseInt(window.getComputedStyle($anchor.get(0), ':after').width, 10) || 0;
          if (ev.offsetX > $anchor.get(0).offsetWidth - arrowWidth) {
            ev.preventDefault();
          }
        }

        if ($prev.get(0) !== $next.get(0)) {
          collapse($prev);
          setTimeout(function () {
            expand($next);
          })

        } else {
          setTimeout(function () {
            collapse($prev);
          })

        }
      });


    });

  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['']);
  }

  checkLicensedPerson() {

    return  Number(sessionStorage.getItem('userType'))==0?true:false;
  }

  getSideNavMenuItems() {


   let userType = Number(sessionStorage.getItem('userType'));

    let type = this.enumService.userTypes.find(type => type.id == userType);
    this.getAllModules();
    

    

  }

  getAllModules() {
    //show loading inside the sideNav
    this.commonService.getModules().subscribe(res => {
      if (res != null) {
        this.modules = res;
        localStorage.setItem("allModules",JSON.stringify(this.modules))
        localStorage.setItem("modules",JSON.stringify(this.modules))
        if(this.userType==1){
          this.getAllowdMoulesToStaff()
        }
      
       
      }
    })
  }

  getAllowdMoulesToStaff() {
    
    this.commonService.getAllowdMoulesToStaff().subscribe(res => {
      this.modules = this.intersect(this.modules, res.moduleActions);
      localStorage.setItem("modules",JSON.stringify(res.moduleActions));
      console.log("INTERSECTION OF Modules", this.modules);

    });
  }

  intersectArray = [];
  intersect(arr1, arr2) {

    _.each(arr1, (a) => {
      _.each(arr2, (b) => {

        if (this.allowedMoules(a, b))
          this.intersectArray.push(a);
      });
    });

    return this.intersectArray;
  };


  allowedMoules(a, b) {
    let isPresent = this.intersectArray.find(module => module.moduleId == b.moduleId);
    if (isPresent == undefined) {
      if (a.moduleId === b.moduleId)
        return true;
      else return false;
    }
  }


}
