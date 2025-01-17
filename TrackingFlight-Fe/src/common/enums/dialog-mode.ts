import { NzModalRef } from "ng-zorro-antd/modal";

export enum DialogMode {
    view = 'view',
    edit = 'edit',
    delete = 'delete'
}
export interface DialogModal<T> {
    id: number;
    dialog: NzModalRef<T>;
  }