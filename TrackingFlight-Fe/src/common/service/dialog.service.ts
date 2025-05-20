import { EventEmitter, Injectable } from "@angular/core";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { DialogConfigModal } from "../model/dialog-model";
import { DialogModal } from "../enums/dialog-mode";
import { BehaviorSubject } from 'rxjs';
declare let $: any;

@Injectable({
    providedIn: 'root',
})
export class DialogService {

    public listDialog: DialogModal<any>[] = [];
    public loadingChange = new BehaviorSubject<number | null>(null);
    constructor(
        private modalService: NzModalService,

    ) { }

    

    public openDialog(
        options: (options: DialogConfigModal) => void,
        onEmitEvent: (eventName: string, eventValue: any) => void
    ) {
        const optionParams = {};
        const modalConfig: DialogConfigModal = {
            size: 'dialog-md',
            component: null,
            inputs: {},
            title: '',
            escClose: false,
            class: '',
            bodyClass: '',
            viewContainerRef: null,
            maskClosable: false,
            zIndex: 1000,
            ...optionParams,
        };
        if (options) {
            options(modalConfig);
        }
        const modal: NzModalRef<any> = this.modalService.create({
            nzTitle: modalConfig.title,
            nzContent: modalConfig.component,
            nzData: modalConfig.inputs,
            nzClosable: false,
            nzKeyboard: modalConfig.escClose,
            nzMaskClosable: modalConfig.maskClosable,
            nzFooter: null,
            nzClassName: `${modalConfig.size} ${modalConfig.class}`,
            nzViewContainerRef: modalConfig.viewContainerRef,
            nzZIndex: modalConfig.zIndex,
        });

        const outSide: any = modal;
    const lstSub: any[] = [];
    modal.afterOpen.subscribe(() => {
      // subscribe Event
      if (onEmitEvent) {
        const ci: any = outSide.componentInstance;
        for (const keyName in ci) {
          if (ci[keyName] instanceof EventEmitter) {
            lstSub.push(
              ci[keyName].subscribe((value: any) => {
                onEmitEvent(keyName, value);
              })
            );
          }
        }
      }
    });

        
        // if (!modalConfig.bodyClass) modalConfig.bodyClass = '';
        // modalConfig.bodyClass += modalConfig.bodyClass
        //     ? ' '
        //     : '' + 'body-dialog-tab';
        // //}

        // if (modalConfig.bodyClass) {
        //     let instan: any = modal.containerInstance;
        //     $(instan.modalElementRef.nativeElement)
        //         .parents('.cdk-overlay-container')
        //         .addClass(modalConfig.bodyClass);
        // }
        const guidId = Date.now();
        const dialogData = {
            id: guidId,
            dialog: modal,
            bodyClass: modalConfig.bodyClass,
        };
        this.listDialog.push(dialogData);
        if (onEmitEvent) {
            for (const keyName in modal.componentInstance) {
                if (modal.componentInstance[keyName] instanceof EventEmitter) {
                    modal.componentInstance[keyName].subscribe((value: any) => {
                        onEmitEvent(keyName, value);
                    })
                }
            }
        }
        return dialogData;
    }

    public closeDialogById(id: number) {
        const index = this.listDialog.findIndex((x) => x.id === id);
        if (index !== -1) {
            let dialogData: any = this.listDialog[index];
            dialogData.dialog.destroy();
            //   if (dialogData.bodyClass) {
            //     $('body').removeClass(dialogData.bodyClass);
            //   }
            this.listDialog.splice(index, 1);
        }
    }

    public openLoading(cancel: any = null) {
        let valueCurent = this.loadingChange.value;
        if (valueCurent === null) valueCurent = 0;
        valueCurent++;
        this.loadingChange.next(valueCurent);
      }
    
      public closeLoading() {
        let valueCurent = this.loadingChange.value;
        if (!valueCurent) return;
        valueCurent--;
        this.loadingChange.next(valueCurent);
      }
}

export enum DialogSize {
    small = 'dialog-ms',
    medium = 'dialog-md',
    large = 'dialog-lg',
    xlarge = 'dialog-max-lg',
    xxl_large = 'dialog-max-xxl-lg',
    full = 'dialog-full',
    tab = 'dialog-tab',
  }

  export enum DialogMode {
    view = 'view',
    add = 'add',
    edit = 'edit',
    modify = 'modify',
    apply = 'apply',
    confirm = 'dialog-full',
    next = 'next',
    accept = 'accept',
    cancel = 'cancel',
    delete = 'delete',
    destroy = 'destroy',
    print = 'print',
    dowload = 'dowload',
    viewHistory = 'viewHistory',
    quickAdd = 'quickAdd',
  }

  export enum DialogConfirmMode {
    alert = 'alert',
    delete = 'delete',
  }