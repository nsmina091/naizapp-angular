import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PricelistComponent } from './pricelist/pricelist.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../_shared/pagination/pagination.component';


@NgModule({
  declarations: [
    PricelistComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ]
})
export class ProductsModule { }
