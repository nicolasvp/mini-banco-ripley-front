import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadBalanceComponent} from "./load-balance/load-balance.component";
import {TransferComponent} from "./transfer/transfer.component";
import {WithdrawalsComponent} from "./withdrawals/withdrawals.component";
import {AccountComponent} from "./account.component";

const routes: Routes = [
  {
    path: '', component: AccountComponent,
    children: [
      {path: 'load-balance', component: LoadBalanceComponent},
      {path: 'transfer', component: TransferComponent},
      {path: 'withdrawals', component: WithdrawalsComponent},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
