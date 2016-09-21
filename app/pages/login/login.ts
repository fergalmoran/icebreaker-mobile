import {Modal, NavController, Page, ViewController} from 'ionic-angular';
import {Component, OnInit, Inject} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {AuthProvider} from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs"

@Page({
    templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

    error: any

    constructor(
        private navCtrl: NavController, 
        public af: AngularFire, 
        public viewCtrl: ViewController, 
        private auth: AuthProvider) {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    registerUser(_credentials, _event) {
        _event.preventDefault();
        this.af.auth.createUser(_credentials)
            .then((user) => {
                console.log(`Create User Success:`, user);
                _credentials.created = true;

                return this.login(_credentials, _event);
            })
            .catch(e => console.error(`Create User Failure:`, e));
    }

    login(credentials, _event) {
        _event.preventDefault();

        // if this was called from the register user,  the check if we 
        // need to create the user object or not
        let addUser = credentials.created
        credentials.created = null;

        // login usig the email/password auth provider
        this.af.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
            console.log(authData)

            if (addUser) {
                const itemObservable = this.af.database.object('/users/' + authData.uid);
                itemObservable.set({
                    "provider": authData.auth.providerData[0].providerId,
                    "avatar": authData.auth.photoURL || "MISSING",
                    "displayName": authData.auth.providerData[0].displayName || authData.auth.email,
                })
            } else {
                this.dismiss()
            }
        }).then((value) => {
            this.dismiss()
        }).catch((error) => {
            this.error = error
            console.log(error)
        });
    }

    registerUserWithGoogleUsingPopupFirebase() {
        this.auth.loginWithGoogleUsingPopupFirebase().subscribe(data => {
            this.navCtrl.setRoot(TabsPage);
        }, err => {
            this.error = err;
        });
    }
}