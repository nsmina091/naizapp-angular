import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from './products/products.module';


const routes: Routes = [
  {
    path:'',
    redirectTo:'products/pricelist',
    pathMatch:'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(module => module.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
