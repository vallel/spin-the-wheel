import {bootstrap}    from '@angular/platform-browser-dynamic'
import {AppComponent} from './app.component'
import {ColorPickerService} from 'angular2-color-picker/app/color-picker/color-picker.service'

bootstrap(AppComponent, [ColorPickerService]);