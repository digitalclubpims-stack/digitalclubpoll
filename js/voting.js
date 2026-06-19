import { db } from "./firebase-config.js";

import {

collection,
query,
where,
getDocs,
getDoc,
doc,
addDoc

}

from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ==========================
// URL PARAMS
// ==========================

export function getEventId(){

    const params =
    new URLSearchParams(
        window.location.search
    );

    return params.get("event");

}


// ==========================
// LOAD EVENT
// ==========================

export async function loadEvent(eventId){

    try{

        const eventRef =
        doc(db,"events",eventId);

        const eventSnap =
        await getDoc(eventRef);

        if(!eventSnap.exists()){

            throw new Error(
                "Event not found"
            );

        }

        return {

            id:eventSnap.id,

            ...eventSnap.data()

        };

    }

    catch(error){

        console.error(error);

        return null;

    }

}


// ==========================
// LOAD PARTICIPANTS
// ==========================

export async function loadParticipants(
    eventId
){

    try{

        const q =
        query(
            collection(db,"participants"),
            where(
                "eventId",
                "==",
                eventId
            )
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

    catch(error){

        console.error(error);

        return [];

    }

}


// ==========================
// CHECK DUPLICATE VOTE
// ==========================

export async function hasAlreadyVoted(
    eventId,
    rollNumber
){

    try{

        const q =
        query(
            collection(db,"votes"),

            where(
                "eventId",
                "==",
                eventId
            ),

            where(
                "roll",
                "==",
                rollNumber
            )
        );

        const snapshot =
        await getDocs(q);

        return !snapshot.empty;

    }

    catch(error){

        console.error(error);

        return false;

    }

}


// ==========================
// SUBMIT VOTE
// ==========================

export async function submitVote({

    eventId,

    participantId,

    participantName,

    voterName,

    batch,

    roll

}){

    try{

        const alreadyVoted =
        await hasAlreadyVoted(
            eventId,
            roll
        );

        if(alreadyVoted){

            return {

                success:false,

                message:
                "You have already voted."

            };

        }

        await addDoc(
            collection(db,"votes"),
            {

                eventId,

                participantId,

                participantName,

                voterName,

                batch,

                roll,

                timestamp:
                Date.now()

            }
        );

        return {

            success:true,

            message:
            "Vote submitted successfully."

        };

    }

    catch(error){

        console.error(error);

        return {

            success:false,

            message:
            "Failed to submit vote."

        };

    }

}


// ==========================
// GET EVENT VOTE COUNT
// ==========================

export async function getVoteCount(
    eventId
){

    try{

        const q =
        query(
            collection(db,"votes"),
            where(
                "eventId",
                "==",
                eventId
            )
        );

        const snapshot =
        await getDocs(q);

        return snapshot.size;

    }

    catch(error){

        console.error(error);

        return 0;

    }

}


// ==========================
// PARTICIPANT LEADERBOARD
// ==========================

export async function getLeaderboard(
    eventId
){

    const participants =
    await loadParticipants(
        eventId
    );

    const votesSnapshot =
    await getDocs(
        query(
            collection(db,"votes"),
            where(
                "eventId",
                "==",
                eventId
            )
        )
    );

    const voteMap = {};

    votesSnapshot.forEach(doc=>{

        const vote =
        doc.data();

        if(
            !voteMap[
                vote.participantId
            ]
        ){

            voteMap[
                vote.participantId
            ] = 0;

        }

        voteMap[
            vote.participantId
        ]++;

    });

    return participants

    .map(participant=>({

        ...participant,

        votes:
        voteMap[
            participant.id
        ] || 0

    }))

    .sort(
        (a,b)=>
        b.votes - a.votes
    );

}
