import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject, Injectable} from "@angular/core";
import { StorageService } from "../../services/storage.service";

//Forma antigua deprecada de AuthGuard...
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private storageService: StorageService, private router: Router) {
//   }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (!this.storageService.isLoggedIn()) {
//       this.router.navigateByUrl('/login').then();
//       return false;
//     } else {
//       return true;
//     }
//   }
//
// }
export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  if (!storageService.isLoggedIn()) {
    router.navigateByUrl('/login').then();
    return false;
  } else {
    return true;
  }
}
