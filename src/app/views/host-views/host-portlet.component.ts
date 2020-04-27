/* Copyright (c) 2019 VMware, Inc. All rights reserved. */

import {Component, NgZone, OnInit} from '@angular/core';
import {ChassisService} from '../../services/chassis.service';
import {Chassis} from '../../model/chassis.model';

@Component({
   templateUrl: './host-portlet.component.html'
})
export class HostPortletComponent implements OnInit {
   activeChassis: Chassis[] = [];
   inactiveChassis: Chassis[] = [];
   loading: boolean = false;

   constructor(private chassisService: ChassisService,
         private zone: NgZone) {
   }

   ngOnInit(): void {
      this.activeChassis = [];
      this.inactiveChassis = [];

      this.chassisService.htmlClientSdk.event.onGlobalRefresh(() => {
         this.zone.run(() => {
            this.refresh();
         });
      });

      this.refresh();
   }

   onContextMenu(): boolean {
      return false;
   }

   refresh(): void {
      this.loading = true;
      this.activeChassis = [];
      this.inactiveChassis = [];

      this.chassisService.getAllChassis().then(result => {
         result.forEach((chassis: Chassis) => {
            if (chassis.isActive) {
               this.activeChassis.push(chassis);
            } else {
               this.inactiveChassis.push(chassis);
            }
         });
         this.loading = false;
      });
   }

   navigateToChassis(selectedChassis: Chassis[]): void {
      this.chassisService.htmlClientSdk.app.navigateTo(
            {
               targetViewId: 'com.vmware.samples.htmlsample.host.monitorView',
               objectId: this.chassisService.htmlClientSdk.app.getContextObjects()[0].id,
               customData: { selectedChassis: selectedChassis }
            }
      );
   }
}
