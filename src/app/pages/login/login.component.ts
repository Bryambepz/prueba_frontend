import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  year: number = 2023;
  username: string = '';
  password: string = '';


  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.year = new Date().getFullYear();

  }

  login(){
    this.loginService.getLogin(this.username, this.password).subscribe(
      response => {
        if ( response.statusCode == 200 ){
          console.log("se inicio",response.message);
          this.router.navigate(['home'])
        }
      },
      error => {
        console.error("Credenciales invalidas");
        
      }
    )
  }

}
