import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginError: boolean = false;
  public loginErrorMessage: string | undefined;
  public loginForm!: FormGroup;
  public preLoader: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();

    // Verifica si ya está autenticado el Usuario, si lo está no muestra el login sino que redirige hacia el home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard/home']);
    }
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]]
    })
  }

  login(): void {
    this.preLoader = true;
    this.loginError = false;

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        this.preLoader = false;
        console.log(response);
        this.authService.storeToken(response.token);
        this.authService.storeUserInfo(response.user);
        this.router.navigate(['/dashboard/home']);
      },
      error => {
        this.preLoader = false;
        if (error.status == 400) {
          console.log(error);
          this.loginError = true;
          this.loginErrorMessage = error.error.msg;
        }
      }
    )
  }
}
