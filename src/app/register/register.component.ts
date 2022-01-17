import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //inject UserService object
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  file:File;

  selectFile(event){
    this.file=event.target.files[0]
    //console.log(this.file)
  }


  //users=[];
  //userObj/*:User*/={Username:"",Email:"",Phone:"",password:"",photo:""}
  
  onSignUp(userObj){
    //console.log(userObj)
    
    //create FormData object
    let formData=new FormData();
    //add file
    formData.append('photo',this.file,this.file.name)
    //add userObj
    formData.append("userObj",JSON.stringify(userObj))
    //console.log(formData)
    
    //let userObj=ref;
    //this.users.push(userObj)
    //ref.reset
    //console.log(this.userObj);
    this.us.createUser(formData).subscribe(
      res=>{
        if(res.message==="User created"){
          alert("User Created")
          //navigate to login component
          this.router.navigateByUrl("/login")
        }
        else{
          console.log("abcd")
          alert(res.message)
        }
      },
      err=>{
        console.log(err.message)
        alert("Something went wrong in user creation")
      }
    )

   // this.userObj={Username:"",Email:"",Phone:"",password:""}
  }

}
/*
interface User{
  Username:string;
  Email:string;
  Phone:string;
  password:string;
  photo:any;
  //profileImage:any;
}
*/

