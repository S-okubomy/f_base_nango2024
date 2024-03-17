import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";


function TestDb() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        // console.log(first);

        try {
            const top_info_Ref = await addDoc(collection(db, "top_info"), {
                title,
                content,
                created_time: new Date(),
                is_del: false,
            });
            


            console.log("Document TE written with ID: ", docRef.id);
        } catch (error) {
            console.log("err!!: " + error);
        }

        const citiesRef = collection(db, "cities");

        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"] });
        await setDoc(doc(citiesRef, "LA"), {
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"] });


        const docRef = doc(db, "cities", "SF");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

    
    }
        

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="first">Input here</label>
                <input
                    type="text"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default TestDb;