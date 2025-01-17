import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { error } from 'node:console';
import { subscribe } from 'node:diagnostics_channel';

import { Observable , Subscriber, Subscription, interval , take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'rxjs';
  
  constructor() {

    // notre observable avec sa subscriber
    const helloWorld$ = new Observable<string>((subscriber: Subscriber<string>) => {
      const text = "Hello Tsitohaina";

      for (let i=0; i<text.length;i++){
        setTimeout(() => {
          subscriber.next(text[i])
        },(i+1) * 1000)

        setTimeout(() => {
          subscriber.complete();
        }, (text.length +1 ) * 1000)

        setTimeout(() =>{
          subscriber.error();
        },5000)
      }
    });

    // notre observer
    const helloObserver = {
      next: (value: string): void => {
        console.log(value)
      },
      complete: () =>{
        console.log('Observation completed!');
      },
      error: () => {
        console.log('error');
        
      }
    }
    
    // la subscription
    const helloSubscription: Subscription = helloWorld$.subscribe(helloObserver); 

    setTimeout(() => {
      helloSubscription.unsubscribe()
    },3000)
  }
}
