import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductsModule } from './products/products.module';
import { PaginationComponent } from './_shared/pagination/pagination.component';
import { LoadingComponent } from './_shared/loading/loading.component';
import { ProductServiceService } from './_services/product-service.service';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ProductsModule,
    FormsModule
  ],
  providers: [
    ProductServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
