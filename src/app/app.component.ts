import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webcam_with_angular';

  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
  }

  checkPermissions() {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 500,
          height: 500,
        },
      })
      .then((res) => {
        console.log(res);
        this.stream = res;
        this.status = 'My camera is accessing';
      })
      .catch((err) => {
        console.log(err);
        if (err?.meesage == 'Permission denied') {
          this.status =
            'Permission denied please try again by approving the access';
        } else {
          this.status = 'You may not having camera system, Please try again';
        }
      });
  }

  captureImage() {
    this.trigger.next();
  }
}
