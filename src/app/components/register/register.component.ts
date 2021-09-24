import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loginError: boolean = false;
  public loginErrorMessage: string | undefined;
  public registerForm: FormGroup;
  public preLoader: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();

    // Verifica si ya está autenticado el Usuario, si lo está no muestra el login sino que redirige hacia el home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard/home']);
    }
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      rut: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]]
    })
  }

  register(): void {
    this.preLoader = true;
    this.loginError = false;

    this.authService.register(this.registerForm.value).subscribe(
      response => {
        const credentials = {
          "email": this.registerForm.controls["email"].value,
          "password": this.registerForm.controls["password"].value
        };
        this.authService.login(credentials).subscribe(
          response => {
            this.preLoader = false;
            this.authService.storeToken(response.token);
            this.authService.storeUserInfo(response.user);
            this.toastr.success("Bienvenido a mini banco ripley!", "Bienvenido");
            this.router.navigate(['/dashboard/home']);
          }
        )
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
