//import 'es6-shim';
import {Component, ViewChild} from '@angular/core';
import {Nav, ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {NearbyPage} from './pages/nearby/nearby';
import {TabsPage} from './pages/tabs/tabs';
import {OnInit} from '@angular/core';
import {AuthProvider} from './providers/auth/auth'
import {LoginPage} from './pages/login/login'

import {
    FIREBASE_PROVIDERS, defaultFirebase,
    AngularFire, firebaseAuthConfig, AuthProviders,
    AuthMethods
} from 'angularfire2';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    providers: [
        AuthProvider,
        FIREBASE_PROVIDERS,
        // Initialize Firebase app  
        defaultFirebase({
            apiKey: "AIzaSyBltKr00N9-KPzkGYut2tkZSk_TIiydZm8",
            authDomain: "icebreaker-f5f20.firebaseapp.com",
            databaseURL: "https://icebreaker-f5f20.firebaseio.com",
            storageBucket: "icebreaker-f5f20.appspot.com",
        }),
        firebaseAuthConfig({
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
            remember: 'default',
            scope: ['email']
        })
    ]
})
export class MyApp implements OnInit {
    @ViewChild(Nav) nav: Nav;
    private rootPage: any;
    isAppInitialized: boolean;

    constructor(private platform: Platform, protected auth: AuthProvider) {
        this.isAppInitialized = false;
    }

    ngOnInit() {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();

            this.auth.getUserData().subscribe(data => {
                if (!this.isAppInitialized) {
                    this.nav.setRoot(TabsPage);
                    this.isAppInitialized = true;
                }
            }, err => {
                this.nav.setRoot(LoginPage);
            });
        });
    }
}

ionicBootstrap(MyApp);
