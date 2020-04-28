/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ListComponent} from './views/list/list.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {CreateEditComponent} from './views/actions/create-edit/create-edit.component';
import {CreateWizardComponent} from './views/actions/create-edit/create-wizard.component';
import {DeleteComponent} from './views/actions/delete/delete.component';
import {DetailsViewComponent} from './views/details-view/details-view.component';
import {WelcomeComponent} from './views/welcome/welcome.component';
import {SettingsComponent} from './views/settings/settings.component';
import {VmActionModalComponent} from './views/actions/vm/vm-action-modal.component';
import {VmMonitorComponent} from './views/vm-views/vm-monitor.component';
import {VmConfigureComponent} from './views/vm-views/vm-configure.component';
import {VmPortletComponent} from './views/vm-views/vm-portlet.component';
import {HostMonitorComponent} from './views/host-views/host-monitor.component';
import {HostPortletComponent} from './views/host-views/host-portlet.component';

const routes: Routes = [
   {path: 'create', component: CreateEditComponent},
   {path: 'create-wizard', component: CreateWizardComponent},
   {path: 'edit', component: CreateEditComponent},
   {path: 'delete', component: DeleteComponent},
   {path: 'list', component: ListComponent},
   {path: 'welcome', component: WelcomeComponent},
   {path: 'settings', component: SettingsComponent},
   {path: 'vm-action-modal', component: VmActionModalComponent},
   {path: 'vm-monitor', component: VmMonitorComponent},
   {path: 'vm-configure', component: VmConfigureComponent},
   {path: 'vm-portlet', component: VmPortletComponent},
   {path: 'host-monitor', component: HostMonitorComponent},
   {path: 'host-portlet', component: HostPortletComponent},
   {path: '**', pathMatch: 'full', component: ListComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(routes, { useHash: true })],
   exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routableComponents = [
   CreateEditComponent,
   CreateWizardComponent,
   DeleteComponent,
   WelcomeComponent,
   SettingsComponent,
   VmActionModalComponent,
   ListComponent,
   DetailsViewComponent,
   PageNotFoundComponent,
   VmMonitorComponent,
   VmConfigureComponent,
   VmPortletComponent,
   HostMonitorComponent,
   HostPortletComponent
];
