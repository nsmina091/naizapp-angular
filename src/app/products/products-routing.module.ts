import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricelistComponent } from './pricelist/pricelist.component';

const routes: Routes = [
  {
    path:'',
    component:PricelistComponent
  },
  {
    path:'pricelist',
    component:PricelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
