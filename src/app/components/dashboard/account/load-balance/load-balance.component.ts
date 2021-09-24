import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-load-balance',
  templateUrl: './load-balance.component.html',
  styleUrls: ['./load-balance.component.css']
})
export class LoadBalanceComponent implements OnInit {

  public loadBalanceForm: FormGroup;
  public preLoader: boolean = false;
  public errors;
  public displayErrors: boolean = false;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loadBalanceForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]]
    });
  }

  public loadBalance(): void {
    console.log(this.loadBalanceForm.value)
    this.accountService.loadBalance(this.loadBalanceForm.value).subscribe(
      () => {
        const amount =  this.loadBalanceForm.controls['amount'].value;
        this.toastr.success('Se ha cargado $' + amount + ' a su cuenta!', 'Éxito');
        this.loadBalanceForm.controls['amount'].setValue("");
      },
      error => {
        this.preLoader = false;
        this.toastr.error('Se ha producido un error al cargar saldo!', 'Fallo');
        if (error.status === 422) {
          this.errors = Array.of(error.error.msg);
        } else {
          this.errors = Array.of({"error": "Se ha producido un error al cargar saldo."});
        }
        this.displayErrors = true;
      }
    )
  }
}
