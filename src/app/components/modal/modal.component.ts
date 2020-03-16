import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalMessageService} from '../../pages/services/modal-message.service';
import {ApiService} from '../../pages/services/api.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalMessage: any;
  single: any = '';
  image: any;

  constructor(private modalMessageService: ModalMessageService, private api: ApiService, private sanitizer: DomSanitizer) {
  }


  ngOnInit() {
    this.modalMessageService.newMessageEmit.subscribe((dto: any) => {
      console.log('dto is ', dto);
      if (dto) {
        const identifier = dto.id;
        this.image = 'data:image/jpeg;base64,' + dto.base64_image;
        console.log(this.image);
        this.api.getFullData(identifier).subscribe(res => {
          this.convert(res);
        }, error => {
          console.log(error);
        });
      }
      // console.log(dto);
      if (dto) {
        this.show();
      }
    });

    window.onclick = (event) => {
      if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
      }
    };
  }

  convert(obj: any) {
    this.single = {
      first_name: obj.first_name || '',
      last_name: obj.last_name || '',
      patronymic: obj.patronymic || '',
      birth_place: obj.birth_place || '',
      birth_date: obj.birth_date || '',
      pass_number: obj.pass_number || '',
      pass_date: obj.pass_date || '',
      pass_limit: obj.pass_limit || '',
      pass_place: obj.pass_place || '',
      pass_type: obj.pass_type || '',
      pass_country: obj.pass_country || '',
      added_by: obj.added_by || '',
      reason: obj.reason || '',
      comment: obj.comment || '',
      date_pub: obj.date_pub || '',
      base64_image: obj.base64_image || '',
      percentage: obj.percentage || 0,
    };
  }

  public closeModal(): void {
    document.getElementById('myModal').style.display = 'none';
  }

  private show(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }
}


