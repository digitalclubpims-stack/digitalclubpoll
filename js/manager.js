// ======================
// MANAGER UTILITIES
// ======================

import {
initializeApp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {

getFirestore,
collection,
getDocs,
doc,
getDoc,
addDoc,
updateDoc,
deleteDoc,
query,
where

}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================
// FIREBASE CONFIG
// ======================

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain:
"YOUR_PROJECT.firebaseapp.com",

projectId:
"YOUR_PROJECT_ID",

storageBucket:
"YOUR_PROJECT.firebasestorage.app",

messagingSenderId:
"XXXX",

appId:
"XXXX"

};

const app =
initializeApp(firebaseConfig);

export const db =
getFirestore(app);


// ======================
// EVENTS
// ======================

export async function getAllEvents(){

const snapshot =
await getDocs(
collection(db,"events")
);

const events = [];

snapshot.forEach(docSnap=>{

events.push({

id:docSnap.id,

...docSnap.data()

});

});

return events;

}

export async function getEvent(id){

const snapshot =
await getDoc(
doc(db,"events",id)
);

if(snapshot.exists()){

return {

id:snapshot.id,

...snapshot.data()

};

}

return null;

}

export async function createEvent(data){

return await addDoc(
collection(db,"events"),
data
);

}

export async function updateEvent(id,data){

return await updateDoc(
doc(db,"events",id),
data
);

}

export async function deleteEvent(id){

return await deleteDoc(
doc(db,"events",id)
);

}


// ======================
// PARTICIPANTS
// ======================

export async function getParticipants(eventId){

const q =
query(
collection(db,"participants"),
where("eventId","==",eventId)
);

const snapshot =
await getDocs(q);

const participants = [];

snapshot.forEach(docSnap=>{

participants.push({

id:docSnap.id,

...docSnap.data()

});

});

return participants;

}

export async function addParticipant(data){

return await addDoc(
collection(db,"participants"),
data
);

}

export async function removeParticipant(id){

return await deleteDoc(
doc(db,"participants",id)
);

}


// ======================
// JUDGES
// ======================

export async function getJudges(){

const snapshot =
await getDocs(
collection(db,"judges")
);

const judges = [];

snapshot.forEach(docSnap=>{

judges.push({

id:docSnap.id,

...docSnap.data()

});

});

return judges;

}

export async function createJudge(data){

return await addDoc(
collection(db,"judges"),
data
);

}

export async function deleteJudge(id){

return await deleteDoc(
doc(db,"judges",id)
);

}


// ======================
// VOTES
// ======================

export async function getVotes(eventId){

const q =
query(
collection(db,"votes"),
where("eventId","==",eventId)
);

const snapshot =
await getDocs(q);

const votes = [];

snapshot.forEach(docSnap=>{

votes.push({

id:docSnap.id,

...docSnap.data()

});

});

return votes;

}


// ======================
// DASHBOARD STATS
// ======================

export async function getStats(){

const events =
await getDocs(
collection(db,"events")
);

const participants =
await getDocs(
collection(db,"participants")
);

const judges =
await getDocs(
collection(db,"judges")
);

const votes =
await getDocs(
collection(db,"votes")
);

return {

events:events.size,

participants:participants.size,

judges:judges.size,

votes:votes.size

};

}


// ======================
// RANDOM JUDGE ID
// ======================

export function generateJudgeId(){

return (

"JUDGE-" +

Math.random()
.toString(36)
.substring(2,8)
.toUpperCase()

);

}


// ======================
// PARTICIPANT NUMBER
// ======================

export function generateParticipantNumber(
prefix="P"
){

return (

prefix +

Date.now()
.toString()
.slice(-6)

);

}
