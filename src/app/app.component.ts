import { Component } from '@angular/core';

import { Observable , Subscriber, Subscription, interval , take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'rxjs';

  letter: string = '';
  
  constructor() {

    // notre observable avec sa subscriber
    const helloWorld$ = new Observable<number>((subscriber: Subscriber<number>) => {

      for (let i=0; i<5;i++){
        setTimeout(() => {
          subscriber.next(i)
        },(i+1) * 1000)

      }

      setTimeout(() => {
        subscriber.complete();
      }, 6000)

    });

    // notre observer
    const helloObserver = {
      next: (value: number): void => {
        this.letter = value+''
      },
      complete: () =>{
        this.letter = 'message réçu';
        console.log('Observable completed!');
        
      }
    }
    
    // la subscription
    const helloSubscription: Subscription = helloWorld$.subscribe(helloObserver); 
  }
}
