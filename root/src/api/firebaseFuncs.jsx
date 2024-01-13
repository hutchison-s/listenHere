import { storage } from "../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const uploadFileToUserDirectory = (file, userId) => {     
        return new Promise((resolve, reject) =>{
            if (!file) {
                reject('Must provide a file for upload')
            }
            const now = new Date()
            const fileName = file.name.split(".")[0]+now.getFullYear()+now.getMonth()+now.getDate()+now.getTime()+"."+file.name.split(".")[1]
            const storageRef = ref(storage, `${userId}/files/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
            (snapshot) => {
                console.log(snapshot)
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve({data: downloadURL})
                    });
            }
            );
        })
    }