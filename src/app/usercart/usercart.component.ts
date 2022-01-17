import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  userCartObj;

  constructor(private userService:UserService) { }

  ngOnInit(): void {

    let Username=localStorage.getItem('Username')
    this.userService.getProductsFromUserCart(Username).subscribe(
      res=>{
        if(res["message"]=='Cart Empty'){
          alert("User Cart is empty");
        }
        else{
          this.userCartObj=res["message"];
        }
      },
      err=>{
        console.log("err in reading cart",err);
        alert("Something went wrong in fetching cart items..");
      }
    )
  }

}
