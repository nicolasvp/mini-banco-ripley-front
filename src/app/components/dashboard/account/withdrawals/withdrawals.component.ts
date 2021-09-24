import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../../../services/account.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.css']
})
export class WithdrawalsComponent implements OnInit {

  public withdrawalsForm: FormGroup;
  public preLoader: boolean = false;
  public errors;
  public displayErrors: boolean = false;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.withdrawalsForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]]
    });
  }

  public withdrawals(): void {
    this.accountService.withdrawals(this.withdrawalsForm.value).subscribe(
      () => {
        const amount = this.withdrawalsForm.controls['amount'].value;
        this.toastr.success('Se ha retirado $' + amount + ' desde su cuenta!', 'Éxito');
        this.withdrawalsForm.controls['amount'].setValue("");
      },
      error => {
        this.preLoader = false;
        this.toastr.error('Se ha producido un error al retirar saldo!', 'Fallo');

        if (error.status === 422) {
          this.errors = Array.of(error.error.msg);
        } else {
          this.errors = Array.of({"error": "Se ha producido un error al retirar saldo."});
        }
        this.displayErrors = true;
      }
    )
  }
}
