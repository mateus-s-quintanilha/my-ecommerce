import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { SingleCategoryPageComponent } from './components/single-category-page/single-category-page.component';
import { QueryProductComponent } from './components/query-product/query-product.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PurchasePageComponent } from './components/purchase-page/purchase-page.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'categories', component: CategoriesPageComponent},
  {path: 'categories/:category', component: SingleCategoryPageComponent},
  {path: 'query', component: QueryProductComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'buying', component: PurchasePageComponent},
  {path: 'products/:id', component: ProductPageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
