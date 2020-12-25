import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
// import { NgxSpinnerService } from 'ngx-spinner';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
// import { nextContext } from "@angular/core/src/render3";

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    // private spinner: NgxSpinnerService
    private toastSerivce: ToastrService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if(!req.url.includes("notification") && !req.url.includes("chat"))
    // this.spinner.show();

    if (!window.navigator.onLine) {
      // if there is no internet, throw a HttpErrorResponse error
      // since an error is thrown, the function will terminate here
      this.router.navigate(['**'])
      sessionStorage.clear();
      // return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));

    }
    else {
      if (sessionStorage.length > 0) {

        req = req.clone({
          headers: req.headers
            .set('Authorization', sessionStorage.getItem('accesstoken'))
            .set('InstituteId', sessionStorage.getItem('InstituteId'))

        });


        return next.handle(req).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (event.status == 200) {
                this.toastSerivce.info('Data is present')
              }
            }
            return event;
          }), catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {

              if (error.status == 503) {

                this.toastSerivce.error('Session Expired');
                this.router.navigate(['']);
              }
              if (error.status == 401) {
                sessionStorage.clear();
                this.router.navigate(['']);
              }
              else if(error?.error?.title!=undefined){
                console.log("THIS IS MY ERROR", error)
                this.toastSerivce.error(error.error ? error.error.title : 'REQUEST FAILED');
              }
              else if(error?.error?.code!=undefined){
                console.log("THIS IS MY ERROR", error)
                this.toastSerivce.error(error.error ? error.error.message : 'REQUEST FAILED',error.error.code);
              }
              else{
                this.toastSerivce.error("Request Failed");
              }

            }
            return of(error);
          })


        );
      }
       else {

        const changedReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json') })

        return next.handle(changedReq).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }

            // this.spinner.hide();
            return event;
          }));
      }
    }




  }
}
