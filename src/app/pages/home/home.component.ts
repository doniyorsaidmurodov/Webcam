import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';
import {WebcamComponent} from '../../components/webcam/webcam.component';
import {List} from '../../class/list';
import {FieldMaps} from '../../class/field-maps';
import {Router} from '@angular/router';

interface ListImages {
  base64_image: string;
  percentage: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  src: string = null;
  currentYear: number = null;
  currentMonth: number = null;
  currentDate: number = null;
  realSrc: string = null;
  passportImageBase64: string = null;

  list: List;
  fieldMaps: FieldMaps[];
  globalImages: ListImages[] = [];
  similarity = 0;

  @ViewChild(WebcamComponent, {static: false}) webcamComponent: WebcamComponent;

  constructor(private httpClient: HttpClient,
              private electronService: ElectronService,
              private route: Router) {
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentDate = currentDate.getDate();

    this.reset();
  }

  editRealSrc() {
    this.realSrc = String(this.src + '\\' + this.currentYear + '\\' + this.currentMonth + '\\' + this.currentDate + '\\')
      .replace(/\\\\/g, '\\')
      .replace(/\\/g, '/')
      .replace(/ /g, '%20');
  }


  check() {
    this.electronService.ipcRenderer.send('getFolder', this.realSrc);

    this.electronService.ipcRenderer.on('getFolderResponse', (event, args) => {
      const filePrefix = 'file:///' + this.realSrc + args + '/';

      this.httpClient.get<any>(filePrefix + 'RFID_Image_Data_Original.json').subscribe(next => {
        this.passportImageBase64 = next.RFID_ORIGINAL_GRAPH_DATA[0].File_Image.Data;
        (document.getElementById('img') as any).src = 'data:image/jpeg;base64,' + this.passportImageBase64;
      }, error => {
        console.error(error);
      });

      this.httpClient.get<any>(filePrefix + 'LexicalAnalyze_Data.json').subscribe(next => {
        this.list = next.ListVerifiedFields;
        next.ListVerifiedFields.pFieldMaps.forEach(arr => {
          this.fieldMaps = arr;
        });
      }, error1 => {
        console.error(error1);
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
    this.httpClient.post<any>('http://127.0.0.1:8000/api/upload_images/', {
      passport: this.passportImageBase64,
      webcam: event.imageAsBase64,
    }).subscribe(next => {
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
          console.log('base64 is ' + base64);
          console.log('percent is ' + percent);
          console.log('name is ' + name1);
          console.log('\n');
          const imgs: ListImages = {percentage: percent, name: name1, base64_image: base64};
          console.log(imgs);
          this.globalImages.push(imgs);
        }
      }
      console.log(this.globalImages);
      // this.reset();
      // console.log(next);
    }, error => console.error(error));
  }

  reset() {
    (document.getElementById('img') as any).src = '';
    this.passportImageBase64 = null;

    this.src = 'D:\\RD\\';
    this.editRealSrc();

    // this.webcamComponent.again();
  }

  goToAuth() {
    this.route.navigate(['auth']);
  }

  goToAdmin() {
    this.route.navigate(['admin']);
  }
}

