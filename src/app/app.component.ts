import { LoaderService } from './../services/loader.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'OzuOnlineFrontEnd';

  constructor(public demoService:LoaderService){
    
  }

  ngOnInit() {
  
  }

  ngAfterViewInit() {

    // Navigation
    $(document).ready(function() {


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

}
