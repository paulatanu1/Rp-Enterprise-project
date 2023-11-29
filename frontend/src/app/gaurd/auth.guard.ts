import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  login_token: string | null | undefined;
  constructor(private toastr: ToastrService, private router: Router) {
    this.login_token = localStorage.getItem('login_token');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.login_token) {
      return true;
    } else {
      this.toastr.error(
        `Access Denied: You do not have permission to view this page`,
        'OOOPS !',
        {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        }
      );
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
