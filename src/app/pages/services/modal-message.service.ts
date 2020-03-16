import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalMessageService {

  public newMessageEmit = new EventEmitter<any>();

  constructor() {
  }
}
