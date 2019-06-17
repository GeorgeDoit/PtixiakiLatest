import { ExerciseService } from './../services/exercise.service'
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ExerciseResolverService implements Resolve<any> {

  constructor(private exerciseService: ExerciseService) { }

  resolve(route: ActivatedRouteSnapshot) {
    //Get the id from the route
    let id = route.paramMap.get('id');
    //Get the data from service
    return this.exerciseService.getData(id);
  }
}