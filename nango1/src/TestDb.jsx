import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";


function TestDb() {
    const [first, setFrist] = useState("");
    const [user, setUser] = useState("");


    // useEffect(() => {

    //     try {
    //         const docRef = addDoc(collection(db, "users"), {
    //                 first,
    //                 user,
    //                 born: 1815
    //         });
    //         console.log("Document TE written with ID: ", docRef.id);
    //     } catch (error) {
    //         console.log("err!!: " + error);
    //     }

    //     const usersCollectionRef = collection(db, 'users');
    //     getDocs(usersCollectionRef).then((querySnapshot) => {
    //     console.log(querySnapshot);
    //     });
    // }, []);

    // useEffect(() => {
    //     const usersCollectionRef = collection(db, 'users');
    //     getDocs(usersCollectionRef).then((querySnapshot) => {
    //       querySnapshot.docs.forEach((doc) => console.log(doc));
    //     });
    //   }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(first);

        try {
            const docRef = await addDoc(collection(db, "users"), {
                    first,
                    user,
                    born: 1815
            });

            console.log("Document TE written with ID: ", docRef.id);
        } catch (error) {
            console.log("err!!: " + error);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="first">Input here</label>
                <input
                    type="text"
                    id="first"
                    onChange={(e) => setFrist(e.target.value)}
                />
                <input
                    type="text"
                    id="user"
                    onChange={(e) => setUser(e.target.value)}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default TestDb;