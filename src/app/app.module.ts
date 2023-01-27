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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //CarouselModule needs this to work correctly
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SingleCategoryPageComponent } from './components/single-category-page/single-category-page.component';
import { QueryProductComponent } from './components/query-product/query-product.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PurchasePageComponent } from './components/purchase-page/purchase-page.component';
import { FooterComponent } from './components/footer/footer.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/user-profile/profile/profile.component'; 

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { PersonalDataComponent } from './components/user-profile/personal-data/personal-data.component';
import { MyAddressComponent } from './components/user-profile/my-address/my-address.component';
import { AddressFormComponent } from './components/user-profile/address-form/address-form.component';
import { SimpleFooterComponent } from './components/templates/simple-footer/simple-footer.component';


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
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PersonalDataComponent,
    MyAddressComponent,
    AddressFormComponent,
    SimpleFooterComponent
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
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
