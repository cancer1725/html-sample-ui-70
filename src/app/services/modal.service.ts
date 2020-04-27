/* Copyright (c) 2018-2019 VMware, Inc. All rights reserved. */

import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';

export interface ModalConfig {
   url: string;
   title?: string;
   size?: {
      width: number,
      height: number
   };
   closable?: boolean;
   onClosed?: (result?: any) => void;
   contextObjects?: any[];
   customData?: any;
}

@Injectable()
export class ModalConfigService {

   constructor(private resources: ResourceService) {
   }

   public createAddConfig() {
      const addAction: ModalConfig = {
         url: 'html-sample/index.html#/create',
         title: this.resources.getString('shared.modal.createChassis'),
         size: {width: 700, height: 400}
      };
      return addAction;
   }

   public createAddWizardConfig() {
      const addWizardAction: ModalConfig = {
         url: 'html-sample/index.html#/create-wizard',
         closable: false,
         size: {width: 800, height: 500}
      };
      return addWizardAction;
   }

   public createDeleteConfig() {
      const deleteAction: ModalConfig = {
         url: 'html-sample/index.html#/delete',
         size: {width: 400, height: 120},
         closable: false
      };
      return deleteAction;
   }

   public createEditConfig() {
      const editAction: ModalConfig = {
         url: 'html-sample/index.html#/edit',
         title:  this.resources.getString('shared.modal.editChassis'),
         size: {width: 700, height: 400}
      };
      return editAction;
   }
}
