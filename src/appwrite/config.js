import { Client, Storage,Query, ID, Databases ,Permission, Role} from "appwrite";
import conf from "../conf/conf";


export class Database{
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("appwrite error::database error:: createPost::",error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        
        try {
            
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("appwrite error::database error:: updatePost::",error);

        }
        
    }

    async deletePost(slug) {
        try {
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            return true;

        } catch (error) {
            console.log("appwrite error::database error:: deletePost::", error);
            return false;

        }
    }

    async getPost(slug) {
        try {
            
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );

        } catch (error) {
            console.log("appwrite error::database error:: getPost::",error);

        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("appwrite error::database error:: getPosts::",error);
            return false
        }
    }

    //file related service

    async uploadFile(file,userId) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
                [
                    Permission.read(Role.any()) // 👈 Grants public read access
                ]
            );
        } catch (error) {
            console.log("appwrite error::Storage error:: uploadFile::", error);
            return null;
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID,
            );
            return true;
        } catch (error) {
            console.log("appwrite error::Storage error:: deleteFile::",error);
            return false;
        }
    }

    getFilePreview(fileID) {
        try {
            return this.bucket.getFileView(conf.appwriteBucketId, fileID);
        } catch (error) {
            console.log("appwrite error:: getFileView::", error);
            return null;
        }
    }
    
    

}

const service = new Database()
export default service