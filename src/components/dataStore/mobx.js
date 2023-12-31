import {observable, action, computed, makeObservable, runInAction} from 'mobx';
class MobxData {
    flag =false;
    serviceType="";
    baseUrl;
    constructor(){
        makeObservable(this, {
            flag: observable, // משתנה שניתן להשגיח על השינויים בו
            serviceType: observable
        }); }
        
   
    }
   

export default new MobxData();