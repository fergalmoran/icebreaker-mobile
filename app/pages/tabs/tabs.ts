import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {SettingsPage} from '../settings/settings';

@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

    private tabHome: any;
    private tabAbout: any;
    private tabContact: any;
    private tabSettings: any;

    constructor() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tabHome = HomePage;
        this.tabAbout = AboutPage;
        this.tabContact = ContactPage;
        this.tabSettings = SettingsPage;
    }
}