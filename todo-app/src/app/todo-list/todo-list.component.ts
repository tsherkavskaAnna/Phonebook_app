import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Item } from '../item';
import {UUID} from 'uuid-generator-ts';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  newItem: string = '';
  itemsAr: Item[] = [];
  idUnique = crypto.randomUUID()
  isCheckboxDisabled = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.todoService.getAllItem()
    .subscribe(items => this.itemsAr = items)
  }

  addNewTodo(): void {
      const newItem: Item = {
        id: this.idUnique,
        description: this.newItem,
        done: false,
        selected: false
    }
    this.todoService.addItem(newItem).subscribe(response => {
      console.log("TODO added successfully!");
      this.itemsAr.push(response);
      this.newItem = '';
      this.getAllItems();
    }, error => console.log("POST failed with error")
    )
  }

  deleteTodo() {
    const selectedItem = this.itemsAr.filter(item => item.selected);
    selectedItem.forEach(item => {
      this.itemsAr = this.itemsAr.filter(i => i !== item);
      this.todoService.deleteItem(item).subscribe(response => {
        console.log('TODO deleted!');
        this.getAllItems()
      }, error => console.log('Something wrong')
      )
    }) 
  }

}
