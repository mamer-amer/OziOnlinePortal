import { Injectable } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  config:NgxUiLoaderConfig;
 

  tblLoaderConfig = {
    "bgsColor": "rgba(51,52,182,0.86)",
    "bgsOpacity": 0.8,
    "bgsPosition": "center-center",
    "bgsSize": 80,
    "bgsType": "three-bounce",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "rgba(51,40,40,0.5)",
    "fgsPosition": "center-center",
    "fgsSize": 70,
    "fgsType": "ball-spin-clockwise",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40,40,40,0.4)",
    "pbColor": "rgba(51,52,182,0.86)",
    "pbDirection": "ltr",
    "pbThickness": 8,
    "hasProgressBar": false,
    "text": "",
    "textColor": "#5c3232",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
  }
  
  constructor(private ngxLoaderService:NgxUiLoaderService) {
    this.config = this.ngxLoaderService.getDefaultConfig();
    
   }


   stopLoader(id){
     this.ngxLoaderService.stopBackgroundLoader(id)
   }

   startLoader(id){
     this.ngxLoaderService.startBackgroundLoader(id);
   }

   startFullPageLoader(){
     this.ngxLoaderService.start();
   }

   stopFullPageLoader(){
     this.ngxLoaderService.stop();
   }
}
