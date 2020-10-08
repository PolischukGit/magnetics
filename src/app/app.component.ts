import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'magnetics';
  private func(
    reallyLongArg,
    omgSoManyParameters,
    IShouldRefactorThis,
    isThereSeriouslyAnotherOne,
  ): any {
    console.log('rrrrr');
  }
}
