import { AddressFormComponent } from './components/user-profile/address-form/address-form.component';
import { PersonalDataComponent } from './components/user-profile/personal-data/personal-data.component';
import { MyAddressComponent } from './components/user-profile/my-address/my-address.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { SingleCategoryPageComponent } from './components/single-category-page/single-category-page.component';
import { QueryProductComponent } from './components/query-product/query-product.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PurchasePageComponent } from './components/purchase-page/purchase-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/user-profile/profile/profile.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'categories', component: CategoriesPageComponent},
  {path: 'categories/:category', component: SingleCategoryPageComponent},
  {path: 'query', component: QueryProductComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'buying', component: PurchasePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'my-profile', component: ProfileComponent, ...canActivate(() => redirectUnauthorizedTo(['/home']) )},
  {path: 'my-profile/my-data', component: PersonalDataComponent, ...canActivate(() => redirectUnauthorizedTo(['/home']) )},
  {path: 'my-profile/my-address', component: MyAddressComponent, ...canActivate(() => redirectUnauthorizedTo(['/home']) )},
  {path: 'my-profile/my-address/add', component: AddressFormComponent, ...canActivate(() => redirectUnauthorizedTo(['/home']) )},
  {path: 'my-profile/my-address/edit/:id', component: AddressFormComponent, ...canActivate(() => redirectUnauthorizedTo(['/home']) )},
  {path: 'products/:id', component: ProductPageComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
