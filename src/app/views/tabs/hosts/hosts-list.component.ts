/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {
   Component, OnInit
} from '@angular/core';

import {HostsService} from '../../../services/hosts.service';

@Component({
   selector: 'app-hosts-list-view',
   templateUrl: './hosts-list.component.html'
})
export class HostListComponent implements OnInit {

   private static HOST_SUMMARY_VIEW_EXTENSION_ID = 'vsphere.core.host.summary';

   public loading: boolean = false;
   public hostsList: Map<string, any>[];

   constructor(private hostsService: HostsService) {
   }

   ngOnInit(): void {
      this.retrieveHosts();
   }

   onContextMenu(): boolean {
      return false;
   }

   /**
    * Navigate To the host summary view of a given objectId
    */
   navigateToHostSummaryView(objectId: string): void {
      const navigateParams = {
         targetViewId: HostListComponent.HOST_SUMMARY_VIEW_EXTENSION_ID,
         objectId: objectId
      };
      this.hostsService.htmlClientSdk.app.navigateTo(navigateParams);
   }

   /**
    * Refresh the list of host objects.
    */
   private retrieveHosts(): void {
      this.loading = true;
      this.hostsService.getConnectedHosts().then(result => {
         this.hostsList = result;
         this.loading = false;
      });
   }
}
