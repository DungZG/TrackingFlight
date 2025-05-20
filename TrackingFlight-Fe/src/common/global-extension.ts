import { HttpErrorResponse } from "@angular/common/http";
import { ElementRef } from "@angular/core"
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms"
import { firstValueFrom, Observable } from "rxjs";

declare let $: any;

declare module 'rxjs' {
    interface Observable<T> {
        firstValueFrom(
            this: Observable<T>,
            option?: {
                myForm?: FormGroup;
                elementForm?: ElementRef;
                ignoreThrownExc?: boolean;
            }
        ): Promise<T>;
    }
}

Observable.prototype.firstValueFrom = function <T>(
    this: Observable<T>,
    option?: {
        myForm: FormGroup;
        elementForm?: ElementRef;
        ignoreThrownExc?: boolean;
    }
): Promise<T> {
    if (!option) {
        return firstValueFrom(this);
    }

    return new Promise((resove) => {
        this.subscribe({
            next: (res) => {
                resove(res);
            },
            error: (error: HttpErrorResponse) => {
                // option.myForm.bindError(error.error.errors);
                // if (option.elementForm) {
                //   option.myForm.focusError(option.elementForm);
                // }
                if (option.ignoreThrownExc) {
                    resove(error.error);
                    return;
                }
                throw error;
            },
        });
    });
}

declare module '@angular/forms' {
    interface AbstractControl {
        markAllAsDirty(this: AbstractControl): void;
        focusError(this: FormGroup, elementParent?: ElementRef): void;
        patchValueNoEvent(this: AbstractControl, value: any): void;
    }
}

AbstractControl.prototype.markAllAsDirty = function (this: AbstractControl) {
    if (this instanceof FormGroup) {
        const formGroupValue = this as FormGroup;
        for (const item in formGroupValue.controls) {
            formGroupValue.get(item)?.markAllAsDirty();
        }
        this.updateValueAndValidity({ onlySelf: true });
    } else if (this instanceof FormArray) {
        const formArrayValue = this as FormArray;
        for (let i = 0; i < formArrayValue.length; i++) {
            const formGroupValue = formArrayValue.at(i);
            (formGroupValue as AbstractControl).markAllAsDirty();
        }
    } else if (this instanceof FormControl) {
        this.markAsDirty();
        this.updateValueAndValidity({ onlySelf: true });
    }
}

AbstractControl.prototype.focusError = function (
    this: AbstractControl,
    elementParent?: ElementRef,
): void {
    setTimeout(() => {
        let body = $('body');
        if (elementParent) {
            body = $(elementParent.nativeElement);
        }
        let controlError = body.find('.ng-invalid');
        for (let index = 0; index < controlError.length; index++) {
            const element = controlError[index];
            let nameTag = element.tagName;
            switch (nameTag) {
                case 'INPUT-TEXT':
                    setTimeout(() => {
                        $(element).find('input').eq(0).focus();
                    }, 100);
                    break;
                case 'INPUT-NUMBER':
                    setTimeout(() => {
                        $(element).find('input').eq(0).focus();
                    }, 100);
                    break;
                case 'INPUT-SELECT':
                    setTimeout(() => {
                        $(element).find('input').eq(0).focus();
                        $(element).find('input').eq(0).click();
                    }, 100);
                    break;
                case 'INPUT-DATE-BASIC':
                    setTimeout(() => {
                        $(element).find('.ant-input-affix-wrapper input').eq(0).focus();
                    }, 100);
                    break;
                case 'INPUT-DATETIME-BASIC':
                    setTimeout(() => {
                        $(element).find('.ant-input-affix-wrapper input').eq(0).focus();
                    }, 100);
                    break;
                default:
                    continue;
            }
            break;
        }
    }, 50);
}

AbstractControl.prototype.patchValueNoEvent = function (this: AbstractControl, value: any): void {
    this.patchValue(value, { emitEvent: false });
}

declare global {
    interface Date {
        toNumberYYYYMMDD(this: Date): Number | null;
        toYYYYMMDD(this: Date): String | null;
        toYYYYMMDDHHMMSS(this: Date): String | null;
        toYYYYMMDDHHMM(this: Date): String | null;
        compareDate(this: Date, target: Date): Number;
    }
    interface Number {
        convertYYYYMMDDToDate(this: Number): Date | null;
    }
    interface String {
        convertYYYYMMDDToDate(this: string): Date;
    }
}
Date.prototype.toNumberYYYYMMDD = function (this: Date): Number | null {
    if (!this) return null;
    let monthValue = (this.getMonth() + 1).toString();
    if (monthValue.length == 1) {
        monthValue = `0${monthValue}`;
    }
    let dateValue = this.getDate().toString();
    if (dateValue.length == 1) {
        dateValue = `0${dateValue}`;
    }
    return +`${this.getFullYear()}${monthValue}${dateValue}`;
};

Date.prototype.toYYYYMMDD = function (this: Date): String | null {
    if (!this) return null;
    const day = String(this.getDate()).padStart(2, '0');
    const month = String(this.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
    const year = this.getFullYear();
    const date = `${year}-${month}-${day}`;
    return date;
};

Date.prototype.toYYYYMMDDHHMM = function (this: Date): String | null {
    if (!this) return null;
    const day = String(this.getDate()).padStart(2, '0');
    const month = String(this.getMonth() + 1).padStart(2, '0');
    const year = this.getFullYear();
    const hours = String(this.getHours()).padStart(2, '0');
    const minutes = String(this.getMinutes()).padStart(2, '0');
    const datetime = `${year}-${month}-${day}T${hours}:${minutes}`;
    return datetime;
};

Date.prototype.toYYYYMMDDHHMMSS = function (this: Date): String | null {
    if (!this) return null;
    const day = String(this.getDate()).padStart(2, '0');
    const month = String(this.getMonth() + 1).padStart(2, '0');
    const year = this.getFullYear();
    const hours = String(this.getHours()).padStart(2, '0');
    const minutes = String(this.getMinutes()).padStart(2, '0');
    const seconds = String(this.getSeconds()).padStart(2, '0');
    const datetime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return datetime;
};

Date.prototype.compareDate = function (this: Date, target: Date): Number {
    let diffMs;
    if (this >= target) {
        diffMs = this.getTime() - target.getTime();
    } else {
        diffMs = target.getTime() - this.getTime();
    }
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
};

Number.prototype.convertYYYYMMDDToDate = function (this: Number): Date | null {
    if (!this) return null;
    return this.toString().convertYYYYMMDDToDate();
};

String.prototype.convertYYYYMMDDToDate = function (this: string) {
    return new Date(
        parseInt(this.substring(0, 4)),
        parseInt(this.substring(4, 6)) - 1,
        parseInt(this.substring(6, 8))
    );
};

export { };

