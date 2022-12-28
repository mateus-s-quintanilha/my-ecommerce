import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeComponent } from './components/home/home.component';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CardTemplateComponent } from './components/templates/card-template/card-template.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SingleCategoryPageComponent } from './components/single-category-page/single-category-page.component';
import { QueryProductComponent } from './components/query-product/query-product.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PurchasePageComponent } from './components/purchase-page/purchase-page.component';
import { FooterComponent } from './components/footer/footer.component'; //CarouselModule needs this to work correctly

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CardTemplateComponent,
    ProductPageComponent,
    CategoriesPageComponent,
    SearchPageComponent,
    SingleCategoryPageComponent,
    QueryProductComponent,
    CartPageComponent,
    PurchasePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    NgbCarouselModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
