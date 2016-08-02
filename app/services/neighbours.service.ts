import {Injectable} from '@angular/core'
import { AngularFire } from 'angularfire2';

@Injectable()
export class NeighboursService {
    constructor(private _af: AngularFire) {

    }
    getNeighbours() {
        return this._af.database.list('/neighbours');
    }
    registerMe() {
       var textItems = this._af.database.list('/neighbours');
        textItems.push({
            "displayName": "Hello Sailor",
            "userName": "hello@sailor.com",
            "avatarImage": "https://placekitten.com/64/64"
        }).then((_data) => {
            console.log(_data)
            alert("Item Successfully Added")
        }).catch((_error) => {
            console.log(_error)
            alert("Error Adding Item")
        })
    }
}