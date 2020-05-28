import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../post.model'

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: Post[] = [{id: 0, userId: 0, title: "Test title", body: "Test body"}];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }
  

  fetchPosts() {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').subscribe(fetchedPosts => {
      console.log(fetchedPosts);
      this.posts = fetchedPosts;
      
    });
  }

}
