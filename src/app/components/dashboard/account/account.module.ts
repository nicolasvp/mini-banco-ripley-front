import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadBalanceComponent} from "./load-balance/load-balance.component";
import {TransferComponent} from "./transfer/transfer.component";
import {WithdrawalsComponent} from "./withdrawals/withdrawals.component";
import {AccountRoutingModule} from "./account-routing.module";
import {DashboardModule} from "../dashboard.module";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    LoadBalanceComponent,
    TransferComponent,
    WithdrawalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AccountRoutingModule,
    DashboardModule,
    NgbToastModule
  ],
  exports: []
})
export class AccountModule {
}
