import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = async (route, state) => {
 
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const isLoggedIn = await authService.isLoggedIn();

  if(isLoggedIn){
    return true;
  }else{
    toast.showError("Debes iniciar sesión para acceder.");
    router.navigate(['/login']);
    return false
  }
};
