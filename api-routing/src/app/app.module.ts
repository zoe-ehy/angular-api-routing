import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ShortenPipe } from './shorten.pipe';
import { PostComponent } from './post/post.component';

const appRoutes: Routes = [
  { path:'', redirectTo: '/feed', pathMatch:'full' },
  { path:'feed', component: FeedComponent },
  { path: 'feed/:id', component: PostComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ShortenPipe,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
