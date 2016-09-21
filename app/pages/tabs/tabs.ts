import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NearbyPage} from '../nearby/nearby';
import {Modal} from 'ionic-angular';
import {PlacesPage} from '../places/places';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {SettingsPage} from '../settings/settings';
import {AngularFire} from 'angularfire2';

@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    private tabNearby: any;
    private tabPlaces: any;
    private tabContact: any;
    private tabSettings: any;


    buttonTitle = "Login";
    _authInfo: any;
    displayName: any;


    constructor(public navCtrl: NavController, private _aasdf: AngularFire) {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabNearby = NearbyPage;
        this.tabPlaces = PlacesPage;
        this.tabContact = ContactPage;
        this.tabSettings = SettingsPage;
    }

    ngOnInit() {

    }
}