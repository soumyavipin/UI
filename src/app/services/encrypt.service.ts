import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  private key: string = "COCM7ATIABF7NGA0B4EA8V1DADSFTYUP";

  constructor() { }
  genIV() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  encrypt(data: any, iv: any) {
    const Sec_Key = localStorage.getItem('secureKey');
    if (Sec_Key !== '' && Sec_Key !== undefined && Sec_Key !== null && Sec_Key.length === 32){
      this.key = Sec_Key;
    }
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.toString();
  }
  decrypt(data: any, iv: any) {
    //const EncDataRes = JSON.parse(JSON.parse(JSON.stringify(data)));
    const decryptedRes = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(this.key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let res = decryptedRes.toString(CryptoJS.enc.Utf8);
    return res;
  }

  setKey(val: string) {
    if (val.length == 32) {
      this.key = val;
      if (this.key == val) {
        return "sucess";
      }
      else {
        return "fail";
      }
    }
    else{
      return "fail"
    }
  }
}