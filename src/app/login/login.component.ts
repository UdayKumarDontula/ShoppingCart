import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //inject UserService object
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  //userCredentials:User={Username:"",password:""}

  onLogin(userCredentials){

    //console.log(this.userCredentials);
    this.us.loginUser(userCredentials).subscribe(
      res=>{
        if(res.message==="login success"){
          //save token to local storage
          localStorage.setItem("token",res.token)
          localStorage.setItem("Username",res.Username)
          localStorage.setItem("userObj",JSON.stringify(res.userObj))
          //update userLoginStatus
          this.us.userLoginStatus=true;
          
          if(userCredentials.type==="user"){
            //navigate to user profile
            this.router.navigateByUrl(`userprofile/${res.Username}`)
          }

          if(userCredentials.type==="admin"){
            //navigate to admin profile
            this.router.navigateByUrl(`admin/${res.Username}`)
          }


        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong while logging in")
      }
    )

    //this.userCredentials={Username:"",password:""}
  }

}

/*
interface User{
  Username:string;
  password:string;
}*/

/*
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //inject UserService obj
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(userCredentials){
   
    this.us.loginUser(userCredentials).subscribe(
      res=>{
        if(res.message==="login success"){
          //save token to localstorage
          localStorage.setItem("token",res.token)
          localStorage.setItem("username",res.username)
          localStorage.setItem("userObj",JSON.stringify(res.userObj))
          //update userloginstatus
          this.us.userLoginStatus=true;
         
          if(userCredentials.type==="user"){
          //navigate to user profile
          this.router.navigateByUrl(`userprofile/${res.username}`)
          }
          if(userCredentials.type==="admin"){
            //navigate to admin profile
            this.router.navigateByUrl(`admin/${res.username}`)
            }

        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("Something went wrong in login")
      }
    )
  }
}
*/