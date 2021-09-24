import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  public transferForm: FormGroup;
  public preLoader: boolean = false;
  public errors;
  public displayErrors: boolean = false;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.transferForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(1000000)]],
      rut: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]],
    });
  }

  public transferBalance(): void {
    this.accountService.transferBalance(this.transferForm.value).subscribe(
      () => {
        const amount = this.transferForm.controls['amount'].value;
        this.toastr.success('Se ha transferido $' + amount + ' desde su cuenta!', 'Éxito');
        this.transferForm.controls['amount'].setValue("");
        this.transferForm.controls['rut'].setValue("");
      },
      error => {
        this.preLoader = false;
        this.toastr.error('Se ha producido un error al transferir saldo!', 'Fallo');

        if (error.status === 422) {
          this.errors = Array.of(error.error.msg);
        } else {
          this.errors = Array.of({"error": "Se ha producido un error al transferir saldo."});
        }
        this.displayErrors = true;
      }
    )
  }
}
