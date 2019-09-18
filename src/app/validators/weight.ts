import { FormControl } from '@angular/forms';


export class WeightValidator {

    static isValid(control: FormControl) {

        const re = /^[0-9]\d{1,2}$/
            .test(
                control.value
            );

        if (re) {
            return null;
        }

        return {
            invalidWeight: true
        };
    }

}

