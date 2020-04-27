/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Component} from '@angular/core';
import {ChassisService} from '../../../services/chassis.service';

@Component({
   templateUrl: './vm-action-modal.component.html'
})
export class VmActionModalComponent {
   constructor(private chassisService: ChassisService) {
   }

   private closeModal(): void {
      this.chassisService.htmlClientSdk.modal.close();
   }

   onClose(): void {
      this.closeModal();
   }

   onSubmit(): void {
      this.closeModal();
   }
}
