import { NzModalRef } from "ng-zorro-antd/modal";

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
export interface DialogModal<T> {
    id: number;
    dialog: NzModalRef<T>;
  }