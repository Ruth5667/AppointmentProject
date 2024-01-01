import { observable, action, computed, makeObservable, runInAction } from 'mobx';
class MobxData {
    isLogin = false;
    buisnessData = {
        name: "Coding Academy",
        address: "Rothschild 60 Tel Aviv",
        phone: "03-1234567",
        owner: "Yariv Katz",
        logo: "https://media.istockphoto.com/id/1460985803/photo/hand-flipping-of-2023-to-2024-on-wooden-block-cube-for-preparation-new-year-change-and-start.jpg?s=612x612&w=0&k=20&c=29THUBIis7vYKYNIKEyms6xDXbJvIHYs3litHohd5xQ=",
        description: "A successful BH ",

    };
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
    setBusinessData = (val) => {
        this.buisnessData = val;
    }
    initBuisnessData = async () => {
        let data = await fetch('http://localhost:8787/businessData')
        let datajson = await data.json();
        this.buisnessData = datajson;

    }
    get getBuisnessData() {
        return this.buisnessData;
    }
}
export default new MobxData();