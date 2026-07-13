// ============================================================
// PIMS DIGITAL CLUB POLL SYSTEM
// manager.js
// Version 2.0 (Production Ready)
// PART 1 / 2
// ============================================================

import { db } from "./firebase.js";

import {

    collection,
    doc,
    query,
    where,
    orderBy,
    limit,

    getDoc,
    getDocs,

    addDoc,
    updateDoc,
    deleteDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ============================================================
// COLLECTIONS
// ============================================================

export const EVENTS = "events";
export const PARTICIPANTS = "participants";
export const JUDGES = "judges";
export const VOTES = "votes";
export const USERS = "users";


// ============================================================
// TIMESTAMP
// ============================================================

export function now(){

    return Date.now();

}


// ============================================================
// RANDOM ID
// ============================================================

export function randomId(length = 6){

    return Math.random()

        .toString(36)

        .substring(2,2+length)

        .toUpperCase();

}


// ============================================================
// GENERATE JUDGE ID
// Example : JUDGE-X8KD29
// ============================================================

export function generateJudgeId(){

    return `JUDGE-${randomId(6)}`;

}


// ============================================================
// GENERATE PARTICIPANT NUMBER
// Example : P001
// ============================================================

export function generateParticipantNumber(number){

    return `P${String(number).padStart(3,"0")}`;

}


// ============================================================
// ============================================================
// EVENTS
// ============================================================
// ============================================================



// ------------------------------------------------------------
// GET ALL EVENTS
// ------------------------------------------------------------

export async function getAllEvents(){

    const snapshot = await getDocs(

        query(

            collection(db,EVENTS),

            orderBy("createdAt","desc")

        )

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



// ------------------------------------------------------------
// GET SINGLE EVENT
// ------------------------------------------------------------

export async function getEvent(eventId){

    const snapshot = await getDoc(

        doc(db,EVENTS,eventId)

    );

    if(!snapshot.exists()){

        return null;

    }

    return{

        id:snapshot.id,

        ...snapshot.data()

    };

}



// ------------------------------------------------------------
// CREATE EVENT
// ------------------------------------------------------------

export async function createEvent(event){

    return await addDoc(

        collection(db,EVENTS),

        {

            name:event.name,

            club:event.club,

            type:event.type,

            rules:event.rules,

            startDate:event.startDate,

            endDate:event.endDate,

            status:event.status,

            createdAt:serverTimestamp(),

            updatedAt:serverTimestamp()

        }

    );

}



// ------------------------------------------------------------
// UPDATE EVENT
// ------------------------------------------------------------

export async function updateEvent(eventId,data){

    await updateDoc(

        doc(db,EVENTS,eventId),

        {

            ...data,

            updatedAt:serverTimestamp()

        }

    );

}



// ------------------------------------------------------------
// DELETE EVENT
// ------------------------------------------------------------

export async function deleteEvent(eventId){

    await deleteDoc(

        doc(db,EVENTS,eventId)

    );

}



// ------------------------------------------------------------
// ACTIVE EVENTS
// ------------------------------------------------------------

export async function getActiveEvents(){

    const snapshot = await getDocs(

        query(

            collection(db,EVENTS),

            where("status","==","active")

        )

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



// ============================================================
// ============================================================
// PARTICIPANTS
// ============================================================
// ============================================================



// ------------------------------------------------------------
// GET PARTICIPANTS OF EVENT
// ------------------------------------------------------------

export async function getParticipants(eventId){

    const snapshot = await getDocs(

        query(

            collection(db,PARTICIPANTS),

            where("eventId","==",eventId),

            orderBy("participantNumber","asc")

        )

    );

    const participants = [];

    snapshot.forEach(docSnap=>{

        participants.push({

            id:docSnap.id,

            ...docSnap.data()

        });

    });
    
console.log("Participants", participants);
    return participants;

}



// ------------------------------------------------------------
// GET SINGLE PARTICIPANT
// ------------------------------------------------------------

export async function getParticipant(participantId){

    const snapshot = await getDoc(

        doc(db,PARTICIPANTS,participantId)

    );

    if(!snapshot.exists()){

        return null;

    }

    return{

        id:snapshot.id,

        ...snapshot.data()

    };

}



// ------------------------------------------------------------
// ADD PARTICIPANT
// ------------------------------------------------------------

export async function addParticipant(data){

    return await addDoc(

        collection(db,PARTICIPANTS),

        {

            eventId:data.eventId,

            participantNumber:data.participantNumber,

            name:data.name,

            category:data.category || "",

            createdAt:serverTimestamp(),

            updatedAt:serverTimestamp()

        }

    );

}



// ------------------------------------------------------------
// UPDATE PARTICIPANT
// ------------------------------------------------------------

export async function updateParticipant(id,data){

    await updateDoc(

        doc(db,PARTICIPANTS,id),

        {

            ...data,

            updatedAt:serverTimestamp()

        }

    );

}



// ------------------------------------------------------------
// DELETE PARTICIPANT
// ------------------------------------------------------------

export async function deleteParticipant(id){

    await deleteDoc(

        doc(db,PARTICIPANTS,id)

    );

}

// ============================================================
// ============================================================
// JUDGES
// ============================================================
// ============================================================



// ------------------------------------------------------------
// GET ALL JUDGES
// ------------------------------------------------------------

export async function getJudges(){

    const snapshot = await getDocs(

        query(

            collection(db,JUDGES),

            orderBy("createdAt","desc")

        )

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



// ------------------------------------------------------------
// GET JUDGE
// ------------------------------------------------------------

export async function getJudge(id){

    const snapshot = await getDoc(

        doc(db,JUDGES,id)

    );

    if(!snapshot.exists()){

        return null;

    }

    return{

        id:snapshot.id,

        ...snapshot.data()

    };

}



// ------------------------------------------------------------
// CREATE JUDGE
// ------------------------------------------------------------

export async function createJudge(data){

    return await addDoc(

        collection(db,JUDGES),

        {

            judgeId:data.judgeId || generateJudgeId(),

            name:data.name,

            email:data.email,

            eventId:data.eventId,

            createdAt:serverTimestamp(),

            updatedAt:serverTimestamp()

        }

    );

}



// ------------------------------------------------------------
// DELETE JUDGE
// ------------------------------------------------------------

export async function deleteJudge(id){

    await deleteDoc(

        doc(db,JUDGES,id)

    );

}



// ============================================================
// ============================================================
// VOTES
// ============================================================
// ============================================================



// ------------------------------------------------------------
// GET ALL VOTES OF EVENT
// ------------------------------------------------------------

export async function getVotes(eventId){

    const snapshot = await getDocs(

        query(

            collection(db,VOTES),

            where("eventId","==",eventId)

        )

    );

    const votes = [];

    snapshot.forEach(docSnap=>{

        votes.push({

            id:docSnap.id,

            ...docSnap.data()

        });

    });
console.log("Votes", votes);
    return votes;

}



// ------------------------------------------------------------
// TOTAL VOTES OF EVENT
// ------------------------------------------------------------

export async function getVoteCount(eventId){

    const snapshot = await getDocs(

        query(

            collection(db,VOTES),

            where("eventId","==",eventId)

        )

    );

    return snapshot.size;

}



// ------------------------------------------------------------
// DASHBOARD STATS
// ------------------------------------------------------------

export async function getDashboardStats(){

    const [

        events,

        participants,

        judges,

        votes

    ] = await Promise.all([

        getDocs(collection(db,EVENTS)),

        getDocs(collection(db,PARTICIPANTS)),

        getDocs(collection(db,JUDGES)),

        getDocs(collection(db,VOTES))

    ]);

    let activeEvents = 0;

    events.forEach(docSnap=>{

        if(docSnap.data().status === "active"){

            activeEvents++;

        }

    });

    return{

        totalEvents:events.size,

        totalParticipants:participants.size,

        totalJudges:judges.size,

        totalVotes:votes.size,

        activeEvents

    };

}



// ------------------------------------------------------------
// TOP EVENTS
// ------------------------------------------------------------

export async function getTopEvents(limitCount = 5){

    const events = await getAllEvents();

    const results = [];

    for(const event of events){

        const votes = await getVoteCount(event.id);

        results.push({

            ...event,

            votes

        });

    }

    results.sort(

        (a,b)=>b.votes-a.votes

    );

    return results.slice(0,limitCount);

}



// ------------------------------------------------------------
// LEADERBOARD
// ------------------------------------------------------------

export async function getLeaderboard(eventId){

    const participants = await getParticipants(eventId);

    const votes = await getVotes(eventId);

    const map = {};

    votes.forEach(vote=>{

        if(!map[vote.participantId]){

            map[vote.participantId]=0;

        }

        map[vote.participantId]++;

    });

    const leaderboard = participants.map(participant=>({

        ...participant,

        votes:map[participant.id] || 0

    }));

    leaderboard.sort(

        (a,b)=>b.votes-a.votes

    );

    leaderboard.forEach((participant,index)=>{

        participant.rank = index+1;

    });

    return leaderboard;

}



// ------------------------------------------------------------
// RECENT EVENTS
// ------------------------------------------------------------

export async function getRecentEvents(count = 5){

    const snapshot = await getDocs(

        query(

            collection(db,EVENTS),

            orderBy("createdAt","desc"),

            limit(count)

        )

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



// ------------------------------------------------------------
// SEARCH EVENTS
// ------------------------------------------------------------

export async function searchEvents(keyword){

    const events = await getAllEvents();

    if(!keyword){

        return events;

    }

    const term = keyword.toLowerCase();

    return events.filter(event=>

        (event.name || "")

        .toLowerCase()

        .includes(term)

    );

}



// ------------------------------------------------------------
// CHECK EVENT STATUS
// ------------------------------------------------------------

export function isVotingOpen(event){

    if(!event){

        return false;

    }

    return event.status === "active";

}



// ------------------------------------------------------------
// FORMAT DATE
// ------------------------------------------------------------

export function formatFirestoreDate(timestamp){

    if(!timestamp){

        return "-";

    }

    if(timestamp.seconds){

        return new Date(

            timestamp.seconds*1000

        ).toLocaleDateString();

    }

    return new Date(timestamp)

    .toLocaleDateString();

}



// ============================================================
// DEFAULT EXPORT
// ============================================================

export default{

    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,

    getParticipants,
    getParticipant,
    addParticipant,
    updateParticipant,
    deleteParticipant,

    getJudges,
    getJudge,
    createJudge,
    deleteJudge,

    getVotes,
    getVoteCount,

    getDashboardStats,
    getTopEvents,
    getLeaderboard,
    getRecentEvents,
    searchEvents,

    generateJudgeId,
    generateParticipantNumber,

    isVotingOpen,
    formatFirestoreDate

};
