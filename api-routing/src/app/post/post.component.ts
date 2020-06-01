import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  id;
  comments: Post[];
  post: Post;
  isLoading = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (param: Params) => {
          this.id = param['id'];
    }); 

    this.fetchPost().subscribe( data => {
      this.post = data['fetchedPost']
      this.comments = data['fetchedComments'];

      this.isLoading = false;
      console.log("Successful!")
    });
  }

  fetchPost(): Observable<any> {
    this.isLoading = true;
    console.log('Fetching individual post with id ' + this.id + '...')

    const fetchedPostRes = this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${this.id}`)

    const fetchedCommentsRes = this.http.get(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`)

    return forkJoin({ fetchedPost: fetchedPostRes , 
                      fetchedComments: fetchedCommentsRes});
  
  }

}
