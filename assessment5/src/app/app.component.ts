import { DataService } from './service/data.service';
import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email:string;
  password:string;
  type:string;
  res;
  constructor(private http:HttpClient,private router:Router, private dataService: DataService) { }

  loginform=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required),
    type: new FormControl('',Validators.required)
  })
  get Type() {
    return this.loginform.get('type')
  }
  onSubmit(){
    if (this.loginform.get('email').value != "" && this.loginform.get('password').value!=""){
      this.dataService
        .sendGetRequest(this.loginform.get('email').value,this.loginform.get('password').value, this.loginform.get('type').value)
        .subscribe(response=>{
          console.log(response);
          
          if (this.loginform.get('type').value==='user'){
            alert("User Login Success");
            this.router.navigate(['/user']);
          }
          else {
            alert("Admin Login Success");
            this.router.navigate(['/admin']);
          }
          let jsonObj = JSON.parse(JSON.stringify(response));
          this.res = jsonObj.pwd + ' - ' + jsonObj.type;
    });
    }else {
      alert("Enter valid details");
    }
}
}
