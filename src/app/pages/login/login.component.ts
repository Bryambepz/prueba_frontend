import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  year: number = 2023;

  ngOnInit(): void {
    this.year = new Date().getFullYear();

  }
}
