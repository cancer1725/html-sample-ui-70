/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ClrWizard, ClrWizardPage} from '@clr/angular';
import {CreateEditChassis} from './create-edit';

@Component({
   templateUrl: './create-wizard.component.html',
   styles: [`
      .appContent {
         padding: 0 0 0 0 !important;
      }
   `],
   encapsulation: ViewEncapsulation.None
})
export class CreateWizardComponent extends CreateEditChassis {
   @ViewChild('wizard') wizard: ClrWizard;
   @ViewChild('myFinishPage') finishPage: ClrWizardPage;

   public readyToCompleteData: any = {};

   private formatEmptyOrNullValue(value: string): string {
      if (typeof value !== 'string' || value.trim() === '') {
         return '--';
      }
      return value;
   }

   loadReadyToCompletePageData(): void {
      this.readyToCompleteData = {
         name: this.chassis.name,
         serverType: this.formatEmptyOrNullValue(this.chassis.serverType),
         dimensions: this.formatEmptyOrNullValue(this.chassis.dimensions),
         state: this.chassis.isActive
      };
   }

   onCreateChassisFailed(): void {
      super.onCreateChassisFailed();
      this.finishPage.completed = false;
   }

   public onSubmit(): void {
      this.finishPage.completed = true;
      this.create();
   }

   onGoBack(): void {
      this.wizard.previous();
   }
}
