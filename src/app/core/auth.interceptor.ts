import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@state/auth.store';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore: AuthStore = inject(AuthStore);
  const router: Router = inject(Router);

  const accessToken: string = authStore.accessToken();

  req = req.clone({
    setHeaders: {
      Authorification: accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return next(req).pipe(
    catchError((err) => {
      if (err.status == 401) router.navigate(['/auth', 'login']);
      return throwError(() => err);
    }),
  );
};
