import { Injectable } from "@angular/core";

export const ACCESS_TOKEN = 'access_token';
export const ROLE = 'role';
export const USERID = 'userId'

export class LocalStorageUtil {

    static setItem(key: string, value: any){
        localStorage.setItem(key, value);
    }

    static getItem(key: string){
        return localStorage.getItem(key) ?? null as any;
    }

    static removeItem(key: string){
        localStorage.removeItem(key);
    }
}