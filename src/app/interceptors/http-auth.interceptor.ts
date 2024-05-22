// src/app/interceptors/http-auth.interceptor.ts
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ProductServiceService } from '../_services/product-service.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private ps: ProductServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ps.show();
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Do nothing for now
        }
        return event;
      }),
      finalize(() => this.ps.hide())
    );
  }
}
