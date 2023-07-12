import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  serviceURL: string = 'http://localhost:3000/tasks'


  constructor(private http: HttpClient) {}

  getAllItem() : Observable<Item[]> {
    return this.http.get<Item[]>(this.serviceURL)
   }
  

 addItem(item: Item) : Observable<Item> {
  return this.http.post<Item>(this.serviceURL, item)
 }
 
 deleteItem(item: Item) : Observable<Item> {
  return this.http.delete<Item>(this.serviceURL + '/' + item.id);
 }

 editItem(item: Item) : Observable<Item> {
  return this.http.put<Item>(this.serviceURL + '/' + item.id, item)
 }
}
