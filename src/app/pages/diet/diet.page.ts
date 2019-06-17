import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as tips from "../../../models/dietTips.json";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
})
export class DietPage implements OnInit {

  slideOpts = {
    slidesPerView: 1.1,
    spaceBetween: 10,
    centeredSlides: true,
    initialSlide: 1,
    speed: 400
  };

  tipArray = [];

  constructor(
    private router: Router
  ) {

    this.tipArray = tips.tips;

  }

  ngOnInit() {
  }

  abort() {
    this.router.navigateByUrl('tabs/profile')
  }
}
