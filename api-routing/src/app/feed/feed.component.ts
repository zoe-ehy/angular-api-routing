import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Post } from '../post.model'
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  allPosts: Post[];
  userId;
  userPosts: Post[];
  isLoading = false;
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.userId = this.route.snapshot.queryParams['userId'];
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
          this.userId = queryParams['userId'];
          if (this.userId) {
            this.fetchUserPosts();
          } else {
            this.fetchPosts();
          }
        });
  }
  
  // Reroute to Individual Post Component
  onSelectPost(postId) {
    this.router.navigate(['feed', postId]);
  }

  // Back button from User Posts, removes userId query param
  onBackToNewsFeed() {
    this.router.navigate(['feed']);
  }

  fetchPosts() {
    this.isLoading = true;
    console.log("Fetching all posts for Newsfeed...")
    
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').subscribe(fetchedPosts => {
      this.allPosts = fetchedPosts;

      this.isLoading = false;
      console.log("Successful!")
    });
  }

  fetchUserPosts() {
    this.isLoading = true;
    console.log("Fetching user posts for User " + this.userId + "'s Wall...")

    let userParams = new HttpParams();
    userParams = userParams.append('userId', this.userId);

    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {params: userParams}).subscribe(fetchedUserPosts => {
    this.userPosts = fetchedUserPosts;

    this.isLoading = false;
    console.log("Successful!")
  });
  }


}
