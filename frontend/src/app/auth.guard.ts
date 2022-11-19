import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSevice : AuthService,
    private router : Router 
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const autheticated = this.authSevice.isAuthenticated();
      if(autheticated){
        console.log('autenticado')
        return true;
      }else{
        console.log('nao autenticado')
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
