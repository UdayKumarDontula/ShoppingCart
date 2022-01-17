import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
// import { MobilesComponent } from './mobiles/mobiles.component';
// import { TelevisionsComponent } from './televisions/televisions.component';
// import { CosmeticsComponent } from './cosmetics/cosmetics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthorizationService } from './authorization.service';
//import { UserService } from './user.service'
import { SharedModule } from './shared.module';
// import { AddProductComponent } from './admin/add-product/add-product.component';
// import { AdminComponent } from './admin/admin.component';
import { UsercartComponent } from './usercart/usercart.component';
import { ProductsComponent } from './products/products.component';
//import { ViewProductsComponent } from './view-products/view-products.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ContactusComponent,
    //MobilesComponent,
    //TelevisionsComponent,
    //CosmeticsComponent,
    PageNotFoundComponent,
    UserprofileComponent,
    //AddProductComponent,
    //AdminComponent,
    UsercartComponent,
    //ViewProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
