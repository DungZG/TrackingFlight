import { ElementRef } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { firstValueFrom, Observable } from "rxjs";

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
    return firstValueFrom(this);
}
export {};