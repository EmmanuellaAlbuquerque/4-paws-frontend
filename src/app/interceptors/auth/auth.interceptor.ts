import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../../models/ErrorResponse';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessError } from '../../errors/BusinessError';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    const access_token = localStorage.getItem("access_token");
    const navigator: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    if (access_token == null && !(navigator.url === '/login')) {

      const error: ErrorResponse = {
        statusCode: 403,
        timestamp: new Date().toLocaleString(),
        errors: {
          message: 'Unauthorized: access denied',
        }
      };

      authService.logout();
      return throwError(() => new BusinessError(error));
    }

    if (access_token) {
      const cloned_req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${access_token}`)
      });

      next(cloned_req);

      return next(cloned_req);
    }
    else {
      return next(req);
    }
}
