import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginStatus=false;

  //inject http client object
  constructor(private hc:HttpClient) {
    if(localStorage.getItem('Username')!==null){
      this.userLoginStatus=true; 
    }
   }

  createUser(userObj):Observable<any>{
    return  this.hc.post("/user/createuser",userObj)
  }

  loginUser(credentials):Observable<any>{
    if(credentials.type==="admin"){
      return  this.hc.post("/admin/login",credentials)
    }
    if(credentials.type==="user"){
      return  this.hc.post("/user/login",credentials)
    }
  }




  getUser(Username):Observable<any>{
      return this.hc.get(`/user/getuser/${Username}`)
  }

  deleteUser(){

  }

  updateUser(){

  }

  sendProductTouserCart(userProductObj):Observable<any>{

    return this.hc.post("/user/add-to-cart",userProductObj)

  }

  getProductsFromUserCart(Username):Observable<any>{
    return this.hc.get(`/user/getproducts/${Username}`)
  }





}