import React, {useEffect, useState} from 'react';
import { collection, getDocs } from "firebase/firestore";
import db from '../db';

export default function Journal() {

    const[entries, setEntries] = useState([]); 
    const[isLoading, setIsLoading] = useState(true);
    const[hasError, setHasError] = useState(false);

    useEffect( () => {

        const getData = async () => {

            try {

                const querySnapshot = await getDocs(collection(db, "entries"));
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                });    
            }
            catch {
                setHasError(true)
            }
            finally {

            }
        }

        getData()

    }, [] )


    if (isLoading) {
        return <h2>Loading data...</h2>
    }

    if (hasError) {
        return <h2>An error occurred!</h2>
    }
    

    // console.log(db)          // To test that the Firebase database was connected correctly 
    // console.log(entries)

    return (
        <div>
            <h1>Journal</h1>
            {entries.map( (entry) => {
                console.log(entry.data)
                return <div key={entry.id}>
                    { entry.data().entry }
                </div>
            } )}
        </div>
    );
}
