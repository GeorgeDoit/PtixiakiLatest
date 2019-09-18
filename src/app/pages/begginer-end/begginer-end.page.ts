import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WeightValidator } from "../../validators/weight";
import { DataService } from "src/app/services/data.service.js";
import { formatDate } from "@angular/common";


@Component({
  selector: 'app-begginer-end',
  templateUrl: './begginer-end.page.html',
  styleUrls: ['./begginer-end.page.scss'],
})

export class BegginerEndPage implements OnInit {

  lessonId: any;
  dynamicText: any;
  calories: any;
  Uid: any;
  UidBegginer: any;
  UidWeight: any;
  storedData: any;
  submitted: boolean = false;

  today = new Date();
  jstoday = "";

  public weightForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public dataService: DataService

  ) {

  }

  ngOnInit() {

    this.weightForm = this.formBuilder.group({

      weight: [
        "",
        Validators.compose([Validators.required, WeightValidator.isValid])
      ]
    });

    this.lessonId = this.route.snapshot.paramMap.get("id");
    this.dynamicText = "Lesson " + this.lessonId;

    this.jstoday = formatDate(this.today, "dd-MM", "en-US", "+0530");

    this.afAuth.authState.subscribe(user => {

      if (user) {

        this.Uid = user.uid;

        this.UidBegginer = this.Uid + '/begginer';

        this.UidWeight = this.Uid + '/weight';

        this.storage.get(this.UidBegginer).then((val) => {

          this.storedData = val;

          this.storedData = JSON.parse(this.storedData);

          for (let i = 0; i < this.storedData.length; i++) {

            if (this.storedData[i].lessonId == this.lessonId) {

              this.calories = this.storedData[i].calories;
            }
          }

        });
      }
    });
  }

  close() {

    this.router.navigateByUrl("tabs/profile");

  }

  saveWeight() {


    if (!this.weightForm.valid) {

      console.log(
        `Form is not valid yet, current value: ${this.weightForm.value}`
      );

    } else {
      this.submitted = true;

      const weight = this.weightForm.value.weight;
      // var weightStr = weight.toString();

      const weightData = {
        lessonId: this.lessonId,
        weight: weight,
        date: this.jstoday

      }

      this.dataService.setData(this.UidWeight, weightData);

    }
  }
}
