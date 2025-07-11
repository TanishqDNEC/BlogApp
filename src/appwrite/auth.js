import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        console.log("Test");
        
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // return the login fucntion
                return this.login({ email, password });
            } else {
                return userAccount;
            }
            
        } catch (error) {
            console.log("appwrite error::service error::create account::",error);
            
        }
    }

    async login({ email, password }) {
        try {

            return this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            console.log("appwrite error::service error::login::",error);

        }
    }

    async logout() {
        try {
             await this.account.deleteSessions();
            
        } catch (error) {
            console.log("appwrite error::service error::logout::",error);

        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite error::service error::getCurrentUser::",error);

        }
    }
}


const authService = new AuthService;
export default authService;