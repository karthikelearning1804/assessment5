import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }
  email;
  logintime;
  url = "http://127.0.0.1:6500/usertime";
  final;
  ngOnInit(): void {

    this.http.get(this.url).subscribe((resp) => {
     console.log(resp);
     this.final=JSON.stringify(resp);
  }

}
