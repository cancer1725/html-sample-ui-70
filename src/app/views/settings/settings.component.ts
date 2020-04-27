/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Component, NgZone, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {ChassisService} from '../../services/chassis.service';

@Component({
   templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
   public numberOfChassisPerPage: number =
         SettingsService.DEFAULT_NUMBER_CHASSIS_PER_PAGE;
   public showSuccessMessage: boolean = false;
   public loading: boolean = false;
   public serverNames: string[];
   public selectedServerInfo: { name: string, guid: string };

   private serverInfos: Map<string, string>;

   constructor(private settingsService: SettingsService,
         private zone: NgZone,
         private chassisService: ChassisService) {
   }

   ngOnInit(): void {
      const value = parseInt(
            localStorage.getItem(
                  SettingsService.NUMBER_CHASSIS_PER_PAGE_PROPERTY),
            10);
      if (value && value > 0) {
         this.numberOfChassisPerPage = value;
      }

      this.chassisService.htmlClientSdk.event.onGlobalRefresh(() => {
         this.zone.run(() => {
            this.setServerInfos();
         });
      });

      this.setServerInfos();
   }

   /**
    * Sets the new value in the local storage.
    * @param numberChassisPerPage -
    * number of chassis displayed in the chassis list per page.
    */
   setNumberChassisPerPageInLocalStorage(numberChassisPerPage: number) {
      localStorage.setItem(
            SettingsService.NUMBER_CHASSIS_PER_PAGE_PROPERTY,
            numberChassisPerPage.toString());
   }

   /**
    * Triggered when user clicks on 'Update' button.
    */
   onUpdate() {
      let value: number = parseInt(this.numberOfChassisPerPage.toString(), 10);
      if (value === Number.NaN || value <= 0) {
         value = SettingsService.DEFAULT_NUMBER_CHASSIS_PER_PAGE;
      }

      this.numberOfChassisPerPage = value;
      this.setNumberChassisPerPageInLocalStorage(value);
      this.showSuccessMessage = true;
   }

   setServerInfos(): void {
      this.loading = true;
      this.settingsService.getServerInfos()
            .then((result: Map<string, string>) => {
               this.serverInfos = result;
               this.serverNames = Object.keys(this.serverInfos).sort();
               this.loading = false;
            });
   }

   showVcInfo(serverName: string): void {
      this.selectedServerInfo = {
         name: serverName,
         guid: this.serverInfos[serverName]
      };
   }
}
