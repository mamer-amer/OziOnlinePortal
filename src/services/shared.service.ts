import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }

  

}
