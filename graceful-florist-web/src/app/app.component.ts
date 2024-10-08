import {AfterViewInit, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang('vi');
  }

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = (): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.voiceflow.chat.load({
        verify: {projectID: '66f235185b495ead28f3c9b3'},
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
