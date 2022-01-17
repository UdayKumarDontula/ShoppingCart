import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { CosmeticsComponent } from './cosmetics/cosmetics.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { TelevisionsComponent } from './televisions/televisions.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewProductsComponent } from './view-products/view-products.component';


const routes: Routes = [
  {path:'home' ,component:HomeComponent },
  {path:'register' ,component:RegisterComponent},
  {path:'login' ,component:LoginComponent},
  {path:'contactus' ,component:ContactusComponent},
  {path:'userprofile/:Username' ,component:UserprofileComponent,children:[
    {path:"view-products",component:ViewProductsComponent},
    {path:"view-cart",component:UsercartComponent}
  ]},
  { path: 'admin/:username', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path:'products' ,component:ProductsComponent,children:[
    {path:'mobiles',component:MobilesComponent},
    {path:'televisions',component:TelevisionsComponent},
    {path:'cosmetics',component:CosmeticsComponent},
    {path:'', redirectTo:'/products/mobiles',pathMatch:'full'}
  ]},

  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
