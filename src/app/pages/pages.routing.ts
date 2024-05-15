import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from "./grafica1/grafica1.component";
import { PagesComponent } from "./pages.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
          { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class pagesRoutingModule {}
