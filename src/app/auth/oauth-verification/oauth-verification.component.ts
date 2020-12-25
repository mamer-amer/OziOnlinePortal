import { Router } from '@angular/router';
import { Verify } from './../../../models/verify';
import { OAuthService } from './../../../services/oauth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-oauth-verification',
  templateUrl: './oauth-verification.component.html',
  styleUrls: ['./oauth-verification.component.css']
})
export class OAuthVerificationComponent implements OnInit{

  verifyDto : Verify = new Verify();
  constructor(private OAuthService:OAuthService,private router:Router,private toastService:ToastrService) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('accesstoken');
    if(token!=null){
      this.goToMainPage();
    }
  }


  isResponse = false;
  verify(){

    this.isResponse = true;
    this.verifyDto.PhoneNumber = localStorage.getItem('phoneNumber');

    this.OAuthService.verify(this.verifyDto).subscribe(response=>{
        
        if(response){
          this.isResponse = false;
          console.log(response);
          this.toastService.success('Successfully Verified')
          sessionStorage.setItem('expires_in',response.expires_in)
          sessionStorage.setItem('userType',response.userType);
          sessionStorage.setItem('userId',response.user_id)
          sessionStorage.setItem('accesstoken','Bearer '+response.access_token)
          sessionStorage.setItem('InstituteId',response.instituteId)
          sessionStorage.setItem('username',response.name);

          //subject here
          this.router.navigate(['layout']);
          
        }
        else{
          this.toastService.error('Verification Failed')
        }
       

    }),error=>{
        this.toastService.error('Verification Failed')
    };
  }
   
  goToMainPage(){
    this.router.navigate(['layout'])
  }
}
