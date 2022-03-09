import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DndModule } from '@ng-dnd/core';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppComponent } from './app.component';
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [	
    AppComponent,
    PlaceComponent
   ],
  imports: [
    BrowserModule,
    DndModule.forRoot({ backend: HTML5Backend }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
