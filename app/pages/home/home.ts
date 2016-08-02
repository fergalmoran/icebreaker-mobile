import {Modal, NavController, Page} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {MomentDate} from '../../lib/MomentDate'
import {Observable} from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

import {LoginPage} from '../login/login'
import {NeighboursService} from '../../services/neighbours.service';


@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [NeighboursService]
})
export class HomePage implements OnInit {

    neighbours: Observable<any[]>;

    constructor(public navCtrl: NavController, private _af: AngularFire,
        private _neighboursService: NeighboursService) {
    }

    ngOnInit() {
        this._af.auth.subscribe((data) => {
            if (data) {
                this._af.auth.unsubscribe();
            } else {
                this._displayLoginModal();
            }
            this.neighbours = this._neighboursService.getNeighbours();
        });
    }

    registerMe() {
        this._neighboursService.registerMe();
    }

    _displayLoginModal() {
        let loginPage = Modal.create(LoginPage);
        this.navCtrl.present(loginPage);
    }

}
