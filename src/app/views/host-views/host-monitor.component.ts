/* Copyright (c) 2019 VMware, Inc. All rights reserved. */

import {Component, NgZone, OnInit} from '@angular/core';
import {ChassisService} from '../../services/chassis.service';
import {Chassis} from '../../model/chassis.model';

@Component({
   templateUrl: './host-monitor.component.html'
})
export class HostMonitorComponent implements OnInit {
   public loading: boolean = false;
   public selectedChassis: Chassis[];

   private chassisMap: Map<string, Chassis>;

   constructor(private chassisService: ChassisService,
         private zone: NgZone) {
   }

   ngOnInit(): void {
      this.selectedChassis = [];
      this.chassisMap = new Map<string, Chassis>();

      const navData = this.chassisService.htmlClientSdk.app.getNavigationData();
      if (navData && navData.selectedChassis) {
         this.selectedChassis = navData.selectedChassis;
      }

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

   get chassisList(): Chassis[] | null {
      if (this.chassisMap) {
         return Array.from(this.chassisMap.values());
      }
      return null;
   }

   refresh(): void {
      this.loading = true;
      this.chassisService.getAllChassis().then(result => {
         const oldSelectedChassisIds: { [key: string]: undefined } = {};
         this.selectedChassis.forEach(
               (chassis: Chassis) => oldSelectedChassisIds[chassis.id] = undefined
         );
         this.selectedChassis = [];
         this.chassisMap = new Map<string, Chassis>();

         result.forEach((chassis: Chassis) => {
            this.chassisMap.set(chassis.id, chassis);
            if (oldSelectedChassisIds.hasOwnProperty(chassis.id)) {
               this.selectedChassis.push(chassis);
            }
         });

         this.loading = false;
      });
   }

   navigateToChassis(selectedChassis: Chassis): void {
      this.chassisService.htmlClientSdk.app.navigateTo(
            {
               targetViewId: 'com.vmware.samples.htmlsample.objectsListView',
               customData: { selectedChassis: [selectedChassis] }
            }
      );
   }

   activate(): void {
      this.changeState('active');
   }

   deactivate(): void {
      this.changeState('standby');
   }

   changeState(state: string): void {
      this.loading = true;
      const changeStatePromises: Promise<boolean>[] =
            this.selectedChassis.map((chassis: Chassis, index: number) => {
               if ((state === 'active' && chassis.isActive)
                     || (state === 'standby' && !chassis.isActive)) {
                  return Promise.resolve(true);
               }

               const newChassis = Object.assign(new Chassis(), chassis);
               newChassis.isActive = state === 'active';

               return this.chassisService.edit(newChassis)
                     .then(() => {
                        chassis = newChassis;
                        this.chassisMap.set(chassis.id, chassis);
                        return true;
                     })
                     .catch(() => {
                        return false;
                     });
            });

      Promise.all(changeStatePromises).then(() => {
         this.selectedChassis = [];
         this.loading = false;
      });
   }

   shouldDisableActivateButton(): boolean {
      if (this.selectedChassis.length <= 0) {
         return true;
      }
      return !this.selectedChassis.find((chassis: Chassis) => {
         return !chassis.isActive;
      });
   }

   shouldDisableDeactivateButton(): boolean {
      if (this.selectedChassis.length <= 0) {
         return true;
      }
      return !this.selectedChassis.find((chassis: Chassis) => {
         return chassis.isActive;
      });
   }
}
