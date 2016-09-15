import { Injectable } from '@angular/core'
declare var swal: any;

@Injectable()
export class AlertService {

    public success(title: string, text: string) {
        swal(title, text, 'success');
    }

    public input(title: string, onResolve) {
        swal({
            title: title,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false,
            preConfirm: function(input) {
                return new Promise(function(resolve, reject) {
                    if (input != '') {
                        resolve();
                    }
                });
            }
        }).then(onResolve)
    }

}

