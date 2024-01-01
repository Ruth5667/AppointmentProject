import { observable, action, computed, makeObservable, runInAction } from 'mobx';
class MobxData {
    isLogin = false;
    buisnessData={};
    constructor() {
        makeObservable(this, {
            serviceType: observable,
            setServiceType: action,
            isAdmin: observable,
            setIsAdmin: action,
            edit: observable,
            setEdit: action,
            buisnessData: observable,
            getBuisnessData: computed,
            setBusinessData: action,
            // description: observable,
            // setDescription: action,
            // name: observable,
            // setName: action,
            // adress: observable,
            // setAdress: action,
            // phone: observable,
            // setPhone: action,
            // owner: observable,
            // setOwner: action,
            // logo: observable,
            // setLogo: action,
        });
         this.initBuisnessData()
    }
    edit = false;
    setEdit = (val) => {
        this.edit = val;
    }
    isAdmin = false;
    setIsAdmin = (val) => {
        this.isAdmin = val;
    }
    serviceType = "";
    setServiceType = (val) => {
        this.serviceType = val;
    }
    setBusinessData = (val)=>{
        this.buisnessData = val;
    }
    initBuisnessData = async()=>{
        let data = await fetch('http://localhost:8787/businessData')
        let datajson = await data.json();
        this.buisnessData = datajson;
       
    }
    get getBuisnessData(){
        return this.buisnessData;
    }
}
export default new MobxData();



 // description = "";
    // setDescription = (val) => { this.datajson.description; }
    // name = "";
    // setName = (val) => { this.datajson.name; }
    // adress = "";
    // setAdress = (val) => { this.datajson.address }
    // phone = "";
    // setPhone = (val) => { this.datajson.phone; }
    // owner = "";
    // setOwner = (val) => { this.atajson.owner; }
    // logo = "";
    // setLogo = (val) => { this.datajson.logo; }