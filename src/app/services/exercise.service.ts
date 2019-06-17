import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {


  private data = [];

  constructor() { }

  setData(id, data) {
    console.log(data, id);
    this.data[id] = data;
  }

  getData(id) {
    return this.data[id];

  }

}

