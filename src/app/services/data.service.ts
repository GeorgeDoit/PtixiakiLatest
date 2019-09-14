import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];
  public ChartTableB = [];
  public ChartTableI = [];
  public ChartTableA = [];
  public WeightTable = [];
  public TrainingTable = [];
  public Trainings = [];
  public RemindersTable = [];
  public StoredData: any;
  public TrainingData: any;

  public storageSub = new Subject<string>();
  public storageSub2 = new Subject<string>();
  public storageSub3 = new Subject<string>();
  public storageSub4 = new Subject<string>();

  constructor(private storage: Storage) { }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  watchStorageNo2(): Observable<any> {
    return this.storageSub2.asObservable();
  }

  watchStorageNo3(): Observable<any> {
    return this.storageSub3.asObservable();
  }

  watchStorageNo4(): Observable<any> {
    return this.storageSub4.asObservable();
  }

  async setData(Uid, data) {

    this.data[Uid] = data;
    var weightString = 'weight';
    var myTrainingString = 'Training';
    var PlanString = 'Plan';
    var ReminderString = 'Reminder';

    if (Uid.includes(weightString)) {

      this.saveWeightChartData(Uid, this.data[Uid]);

    } else if (Uid.includes(myTrainingString)) {

      this.saveTrainingData(Uid, this.data[Uid]);

    } else if (Uid.includes(PlanString)) {

      this.saveTrainingPlan(Uid, this.data[Uid]);

    } else if (Uid.includes(ReminderString)) {

      this.saveReminder(Uid, this.data[Uid]);

    } else {

      this.saveCaloriesChartData(Uid, this.data[Uid]);
    }
  }

  setCustomPlanData(Uid, data) {
    this.storage.set(Uid, JSON.stringify(data));
    // this.storageSub.next('changed');
  }

  getData(id) {

    return this.data[id] == null ? [] : this.data[id];

  }

  saveCaloriesChartData(Uid, data) {

    var intermediate = 'intermediate'
    var begginer = 'begginer'
    var advanced = 'advanced'

    this.storage.get(Uid).then((val) => {
      if (val != null) {
        this.StoredData = val;
        this.StoredData = JSON.parse(this.StoredData);
        this.StoredData.push(data);
        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.StoredData));
        this.storageSub.next('changed');
        this.storageSub3.next('profile');
      } else if (Uid.includes(begginer)) {
        this.ChartTableB.push(data);
        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.ChartTableB));
        this.storageSub.next('changed');
        this.storageSub3.next('profile');
      } else if (Uid.includes(intermediate)) {
        this.ChartTableI.push(data);
        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.ChartTableI));
        this.storageSub.next('changed');
        this.storageSub3.next('profile');
      } else if (Uid.includes(advanced)) {
        this.ChartTableA.push(data);
        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.ChartTableA));
        this.storageSub.next('changed');
        this.storageSub3.next('profile');
      } else {
        this.ChartTableB.push(data);
        this.storageSub.next('changed');
        this.storageSub3.next('profile');
      }
    });
  }

  saveWeightChartData(Uid, data) {

    this.storage.get(Uid).then((val) => {

      if (val != null) {

        this.StoredData = val;

        this.StoredData = JSON.parse(this.StoredData);

        this.StoredData.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.StoredData));
        this.storageSub.next('changed');
        this.storageSub3.next('profile');

      } else {

        this.WeightTable.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.WeightTable));
        this.storageSub.next('changed');
        this.storageSub3.next('profile');

      }

    });


  }

  saveTrainingData(Uid, data) {

    this.storage.get(Uid).then((val) => {

      if (val != null) {

        this.StoredData = val;

        this.StoredData = JSON.parse(this.StoredData);

        this.StoredData.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.StoredData));
        this.storageSub2.next('test');


      } else {

        this.TrainingTable.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.TrainingTable));
        this.storageSub2.next('test');

      }

    });
  }

  saveTrainingPlan(Uid, data) {

    this.storage.set(Uid, JSON.stringify(data));
    // this.storageSub.next('changed');

  }

  saveTrainings(Uid, data) {

    this.storage.get(Uid).then((val) => {

      if (val != null) {

        this.StoredData = val;

        this.StoredData = JSON.parse(this.StoredData);

        this.StoredData.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.StoredData));
        // this.storageSub.next('changed');


      } else {

        this.Trainings.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.Trainings));
        // this.storageSub.next('changed');

      }

    });

  }

  async setTrainingsData(Uid, data) {

    this.storage.set(Uid, JSON.stringify(data));

    await this.storageSub.next('changed');
  }

  async saveReminder(Uid, data) {

    this.storage.get(Uid).then((val) => {

      if (val != null) {

        this.StoredData = val;

        this.StoredData = JSON.parse(this.StoredData);

        this.StoredData.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.StoredData));
        this.storageSub4.next('reminder');


      } else {

        this.RemindersTable.push(data);

        // // Need to stringify to work
        this.storage.set(Uid, JSON.stringify(this.RemindersTable));
        this.storageSub4.next('reminder');

      }

    });
  }

  async deleteData(key) {

    this.storage.remove(key);
    await this.storageSub.next('changed');
  }

  async deleteTestData(key) {
    this.storage.remove(key);
    await this.storageSub.next('changed');
  }

  async deleteTrainingId(key) {
    this.storage.remove(key);
  }

  deleteTrainingEx(key, item) {

    this.storage.get(key).then((val) => {

      if (val != null) {

        this.TrainingData = val;

        this.TrainingData = JSON.parse(this.TrainingData);

        this.TrainingData = this.TrainingData.filter(x => x.title !== item.title);

        this.storage.set(key, JSON.stringify(this.TrainingData));

        this.storageSub2.next('test');

      }

    });
  }

  async deletePlan(Uid, data) {

    this.storage.set(Uid, data);
    await this.storageSub.next('changed');

  }

  async deleteReminder(Uid, data) {

    this.storage.set(Uid, JSON.stringify(data));

    await this.storageSub4.next('reminder');

  }

}
