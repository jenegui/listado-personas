import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class LoginGuardian implements CanActivate{
    
    constructor(private loginService:LoginService,
                private router: Router
        ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.loginService.isAuntenticated()){
            return true;
        }
        else{
            this.router.navigate(['login']);
            return false;
        }
    }
}