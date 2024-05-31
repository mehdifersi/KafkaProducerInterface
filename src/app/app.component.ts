import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient) {
  }

  title = 'kafka-producer-frontend';
  types: string[] = [];
  addNumber: number = 1;
  files: File[] = [];
  raison_sociale: string = "";
  increment() {
    this.addNumber+=1;
    console.log(this.addNumber)
  }

  onFileSelected(event: any, index: number) {
    this.files[index] = event.target.files[0];
  }
  decrement() {
    if(this.addNumber > 1)this.addNumber-=1;
    console.log(this.addNumber)
    this.files.pop();
    this.types.pop();
  }
  sendBilans(files: File[], types: string[], raison_sociale: string) {
    for (let i = 0; i < this.addNumber; i++) {
      const formData = new FormData();

      formData.append('raison_sociale', raison_sociale);
      formData.append('type', types[i]);
      formData.append('file', files[i]);

      this.http.post('http://localhost:8082/api/produce/file', formData).subscribe(
        res => {
          console.log(res)
        }
      )
    }
  }
}
