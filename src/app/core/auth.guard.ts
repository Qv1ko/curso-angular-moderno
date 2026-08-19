import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@state/auth.store';

export const authGuard: CanActivateFn = (_) => {
  const authStore = inject(AuthStore);
  const router: Router = inject(Router);

  if (authStore.isAuthenticated()) return true;
  return router.createUrlTree(['/auth', 'login']);
};
