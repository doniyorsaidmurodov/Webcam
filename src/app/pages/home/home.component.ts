import {Component, EventEmitter, NgZone, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';
import {WebcamComponent} from '../../components/webcam/webcam.component';
import {List} from '../../class/list';
import {FieldMaps} from '../../class/field-maps';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ModalMessageService} from '../services/modal-message.service';
import {ApiService} from '../services/api.service';
import {Subscription} from 'rxjs';

interface ListImages {
  base64_image: string;
  percentage: number;
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  src: string = null;
  currentYear: number = null;
  currentMonth: number = null;
  currentDate: number = null;
  realSrc: string = null;
  passportImageBase64: string = null;

  pFieldMaps: FieldMaps[] = [];
  globalImages: ListImages[] = [];
  similarity = 0;
  testerTool: boolean = null;
  loading: boolean = null;
  dataLoading: boolean = null;
  counter = 0;

  uploadSubs: Subscription;
  @ViewChild(WebcamComponent, {static: false}) webcamComponent: WebcamComponent;

  constructor(private httpClient: HttpClient,
              private electronService: ElectronService,
              private router: Router, private authService: AuthService,
              private modalMessageService: ModalMessageService, private api: ApiService,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentDate = currentDate.getDate();
    this.testerTool = false;
    this.dataLoading = false;
    this.clearAll();
    this.reset();
  }

  ngOnDestroy(): void {
    if (this.uploadSubs) {
      this.uploadSubs.unsubscribe();
    }
  }

  modal(image) {
    if (image) {
      this.modalMessageService.newMessageEmit.emit(image);
    }
    console.log('modal opened');
  }


  clearAll() {
    this.pFieldMaps = [];
    this.globalImages = [];
    this.similarity = null;
    this.reset();
  }

  showHide() {
    this.testerTool = !this.testerTool;
  }

  editRealSrc() {
    this.realSrc = String(this.src + '\\' + this.currentYear + '\\' + this.currentMonth + '\\' + this.currentDate + '\\')
      .replace(/\\\\/g, '\\')
      .replace(/\\/g, '/')
      .replace(/ /g, '%20');
  }


  check() {
    this.dataLoading = true;
    this.electronService.ipcRenderer.send('getFolder', this.realSrc);
    this.electronService.ipcRenderer.once('getFolderResponse', (event, args) => {
      const filePrefix = 'file:///' + this.realSrc + args + '/';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + this.authService.getToken()
        })
      };

      this.counter = 0;
      this.httpClient.get<any>(filePrefix + 'LexicalAnalyze_Data.json', httpOptions).subscribe(next => {
        this.zone.run(() => {
          this.pFieldMaps = (next as any).ListVerifiedFields.pFieldMaps;
          console.log(this.pFieldMaps);
        });
      }, error1 => {
        this.dataLoading = false;
        console.error(error1);
      }, () => {
        this.httpClient.get<any>(filePrefix + 'RFID_Image_Data_Original.json', httpOptions).subscribe(next => {
          this.zone.run(() => {
            this.dataLoading = false;
            this.passportImageBase64 = (next as any).RFID_ORIGINAL_GRAPH_DATA[0].File_Image.Data;
            (document.getElementById('img') as any).src = 'data:image/jpeg;base64,' + this.passportImageBase64;
          });
        }, error => {
          this.dataLoading = false;
          console.error(error);
        }, () => {
          this.dataLoading = false;
        });
      });
    });
  }

  clearList(event) {
    if (event) {
      this.globalImages = [];
      this.similarity = null;
    }
  }

  ready(event) {

    this.loading = true;
    const tmp = {
      passport: this.passportImageBase64,
      webcam: event.imageAsBase64,
      full_name: (this.pFieldMaps)[8].Field_MRZ + ' ' + (this.pFieldMaps)[9].Field_MRZ,
      citizen: (this.pFieldMaps)[10].Field_MRZ,
      place_of_birth: (this.pFieldMaps)[6].Field_RFID,
      date_of_birth: (this.pFieldMaps)[5].Field_MRZ,
      passport_number: (this.pFieldMaps)[2].Field_MRZ,
      passport_given_at: (this.pFieldMaps)[4].Field_RFID,
      passport_expired_date: (this.pFieldMaps)[3].Field_MRZ,
      sex: (this.pFieldMaps)[11].Field_MRZ,
      type: (this.pFieldMaps)[0].Field_MRZ,
      country_code: (this.pFieldMaps)[1].Field_MRZ
    };
    this.uploadSubs = this.api.uploadImage(tmp).subscribe(next => {
      this.loading = false;
      this.globalImages = [];
      this.similarity = 0;
      console.log('next is ' + next);
      if (next.percentage_passp_vs_cam) {
        this.similarity = Number(next.percentage_passp_vs_cam);
      }
      for (let i = 0; i < 10; i++) {
        if (next[String(i)].base64_image) {
          const base64: any = next[String(i)].base64_image;
          const percent: any = next[String(i)].percentage;
          const name1: any = next[String(i)].name;
          const id: any = next[String(i)].id;
          console.log('base64 is ' + base64);
          console.log('percent is ' + percent);
          console.log('name is ' + name1);
          console.log('\n');
          const imgs: ListImages = {percentage: percent, name: name1, base64_image: base64, id};
          console.log(imgs);
          this.globalImages.push(imgs);
        }
      }
      console.log(this.globalImages);
      // this.reset();
      // console.log(next);
    }, error => {
      this.loading = false;
      console.error(error);
    });
  }

  reset() {
    (document.getElementById('img') as any).src = '';
    this.passportImageBase64 = null;

    this.src = 'D:\\RD\\';
    this.editRealSrc();

    // this.webcamComponent.again();
  }

}
