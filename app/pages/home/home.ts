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
    buttonTitle = "Login";
    _authInfo: any;
    displayName: any;

    constructor(public navCtrl: NavController, private _af: AngularFire,
        private _neighboursService: NeighboursService) {
    }

    ngOnInit() {
        this._af.auth.subscribe((data) => {
            if (data) {
                this.buttonTitle = "Logout";
                this._af.auth.unsubscribe();
                if (data.auth.providerData[0].providerId === "twitter.com") {
                    this._authInfo = data.auth.providerData[0]
                    this.displayName = data.auth.providerData[0].displayName
                } else if (data.github) {
                    this._authInfo = data.github
                } else {
                    this._authInfo = data.auth || {}
                    this.displayName = data.auth.providerData[0].email
                }
            } else {
                this._displayLoginModal();
            }
            this.neighbours = this._neighboursService.getNeighbours();
        });
    }
    
    logoutClicked() {
        if (this._authInfo && (this._authInfo.email || this._authInfo.providerId)) {
            this._af.auth.logout();
            this._authInfo = null
            this._displayLoginModal()
        } else {
            this._displayLoginModal()
        }
    }

    registerMe() {
        this._neighboursService.registerMe();
    }

    _displayLoginModal() {
        let loginPage = Modal.create(LoginPage);
        this.navCtrl.present(loginPage);
    }

}
