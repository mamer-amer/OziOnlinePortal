import { ToastrService } from 'ngx-toastr';
import { OAuthService } from './../../../services/oauth.service';
import { login } from './../../../models/login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private OAuthService:OAuthService,private router:Router,private toastSerivce:ToastrService) { }
  loginDTO : login = new login();

  ngOnInit(): void {
    const token = sessionStorage.getItem('accesstoken');
    if(token!=null){
      this.goToMainPage();
    }
  }

  login(){
    if(this.loginDTO.PhoneNumber!=null && this.loginDTO.PhoneNumber!=""){

      this.loginDTO.PhoneNumber = this.loginDTO.PhoneNumber.trim();

      localStorage.setItem('phoneNumber',this.loginDTO.PhoneNumber);
      
      this.goToOtpPage();
      this.OAuthService.login(this.loginDTO).subscribe((res)=>{
        if(res!=null){
            this.toastSerivce.success('A code has been send to your mobile phone number');
            this.goToOtpPage();
        }
        else{
          this.toastSerivce.error(res);
          this.goToOtpPage();
        }
       
      }),error=>{
        this.toastSerivce.error(error);
      } 
    }
  }


  goToOtpPage(){
    this.router.navigate(['/OAuthVerification'])
  }
  
  goToMainPage(){
    this.router.navigate(['layout'])
  }

}
