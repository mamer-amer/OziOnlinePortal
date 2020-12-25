import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private toastService:ToastrService) { }
  // this prevents from getting into another url without login
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('accesstoken') != null) {
        return true;
      
    }
     else {
      this.toastService.error("YOU ARE NOT AUTHORIZED FOR THIS PAGE")
      this.router.navigate(['**']);
      return false;
    }
  }
}
