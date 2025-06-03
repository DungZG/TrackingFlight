import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Đường dẫn tùy dự án của bạn
import { Observable } from 'rxjs';
import { LocalStorageUtil, ROLE } from '../../../common/utils/local-storage.util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    
    const currentPath = route.pathFromRoot[1].routeConfig?.path
    if(currentPath == 'admin' && LocalStorageUtil.getItem(ROLE) === 'USER'){
      location.href = '/error/403';
      return false;
    }
    
    if (this.loginService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
