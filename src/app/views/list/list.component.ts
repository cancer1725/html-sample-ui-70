/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Component, OnInit, NgZone} from '@angular/core';

import {Chassis} from '../../model/chassis.model';
import {ChassisService} from '../../services/chassis.service';
import {ModalConfig, ModalConfigService} from '../../services/modal.service';
import {SettingsService} from '../../services/settings.service';

@Component({
   templateUrl: './list.component.html',
   styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
   public selectedChassis: Chassis[];
   public numberOfChassisPerPage: number;
   public loading: boolean = false;

   private chassisMap: Map<string, Chassis>;

   constructor(private zone: NgZone, private chassisService: ChassisService,
         private modalService: ModalConfigService) {
   }

   ngOnInit(): void {
      this.chassisMap = new Map<string, Chassis>();
      this.selectedChassis = [];

      const navData = this.chassisService.htmlClientSdk.app.getNavigationData();
      if (navData && navData.selectedChassis) {
         this.selectedChassis = navData.selectedChassis;
      }

      this.numberOfChassisPerPage = SettingsService.DEFAULT_NUMBER_CHASSIS_PER_PAGE;
      const persistedNumberOfChassisPerPage = parseInt(
            localStorage.getItem(
                  SettingsService.NUMBER_CHASSIS_PER_PAGE_PROPERTY),
            10);
      if (persistedNumberOfChassisPerPage && persistedNumberOfChassisPerPage > 0) {
         this.numberOfChassisPerPage = persistedNumberOfChassisPerPage;
      }

      this.chassisService.htmlClientSdk.event.onGlobalRefresh(() => {
         if (this.loading) {
            return;
         }

         this.zone.run(() => {
            this.refresh();
         });
      });

      this.refresh();
   }

   onAdd(): void {
      const config: ModalConfig = this.modalService.createAddConfig();
      config.onClosed = (result: Chassis | null) => {
         if (result) {
            this.zone.run(() => {
               this.chassisMap.set(result.id, result);
            });
         }
      };
      this.chassisService.htmlClientSdk.modal.open(config);
   }

   onAddWizard(): void {
      const config: ModalConfig = this.modalService.createAddWizardConfig();
      config.onClosed = (result: Chassis | null) => {
         if (result) {
            this.zone.run(() => {
               this.chassisMap.set(result.id, result);
            });
         }
      };
      this.chassisService.htmlClientSdk.modal.open(config);
   }

   onDelete(): void {
      const config: ModalConfig = this.modalService.createDeleteConfig();
      config.contextObjects = this.selectedChassis.map(value => value.id);
      config.onClosed = (result: boolean) => {
         if (result) {
            this.zone.run(() => {
               /*
                  Copy the collection so that we don't modify it while
                  traversing it, because this leads to bugs i.e. some
                  items not being removed from the collection (this is a
                  common iterator problem)
                */
               this.selectedChassis.concat().forEach((item: Chassis) => {
                  this.onChassisDeleted(item);
               });

            });
         }
      };
      this.chassisService.htmlClientSdk.modal.open(config);
   }

   onEdit(): void {
      const config: ModalConfig = this.modalService.createEditConfig();
      config.contextObjects = this.selectedChassis.map((value) => {
         return Object.assign(new Chassis(), value);
      });
      config.onClosed = (result: Chassis | null | undefined) => {
         if (result) {
            this.zone.run(() => {
               this.onChassisUpdated(result);
            });
         }
      };

      this.chassisService.htmlClientSdk.modal.open(config);
   }

   /**
    * Returns array of chassis objects.
    */
   get chassisList(): Chassis[] | null {
      if (this.chassisMap) {
         return Array.from(this.chassisMap.values());
      }
      return null;
   }

   onChassisUpdated(chassis: Chassis): void {
      this.chassisMap.set(chassis.id, chassis);

      for (let i = 0; i < this.selectedChassis.length; i++) {
         const selectedChassis = this.selectedChassis[i];
         if (selectedChassis.id !== chassis.id) {
            continue;
         }

         this.selectedChassis[i] = chassis;
         break;
      }
   }

   onChassisDeleted(chassis: Chassis): void {
      this.chassisMap.delete(chassis.id);

      for (let i = 0; i < this.selectedChassis.length; i++) {
         const selectedChassis = this.selectedChassis[i];
         if (selectedChassis.id !== chassis.id) {
            continue;
         }

         this.selectedChassis.splice(i, 1);
         break;
      }
   }

   /**
    * Refresh the list of chassis objects.
    */
   refresh(): void {
      this.loading = true;

      this.chassisService.getAllChassis().then(result => {
         this.loading = false;

         const oldSelectedChassisIds: { [key: string]: undefined } = {};
         this.selectedChassis.forEach(
               (item: Chassis) => oldSelectedChassisIds[item.id] = undefined
         );

         this.selectedChassis = [];
         this.chassisMap = new Map<string, Chassis>();

         result.forEach((item: Chassis) => {
            this.chassisMap.set(item.id, item);

            if (oldSelectedChassisIds.hasOwnProperty(item.id)) {
               this.selectedChassis.push(item);
            }
         });
      });
   }
}
