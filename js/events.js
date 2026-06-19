import { db } from "./firebase.js";

import {
addDoc,
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const btn =
document.getElementById("createEventBtn");

const list =
document.getElementById("eventsList");

if(btn){

btn.addEventListener("click", async ()=>{

const eventName =
document.getElementById("eventName").value;

await addDoc(
collection(db,"events"),
{
name:eventName,
status:"draft",
createdAt:new Date()
}
);

alert("Event Created");

location.reload();

});

}

async function loadEvents(){

if(!list) return;

const snapshot =
await getDocs(collection(db,"events"));

snapshot.forEach(doc=>{

list.innerHTML +=
`<p>${doc.data().name}</p>`;

});

}

loadEvents();
