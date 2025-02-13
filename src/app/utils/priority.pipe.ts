import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priority',
})
export class PriorityPipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): string | null {
        switch (value) {
            case 0:
            case '0':
                return 'Low';
            case 1:
            case '1':
                return 'Medium';
            case 2:
            case '2':
                return 'High';
            default:
                return null;
        }
    }
}
