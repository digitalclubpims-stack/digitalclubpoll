// js/load-events.js

import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container = document.getElementById("eventsContainer");

async function loadEvents() {

  try {

    const q = query(
      collection(db, "events"),
      where("status", "==", "active")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

      container.innerHTML = `
        <div class="empty-state">
          <h3>No Active Events</h3>
          <p>No voting events are currently available.</p>
        </div>
      `;

      return;
    }

    container.innerHTML = "";

    snapshot.forEach(docSnap => {

      const event = docSnap.data();

      const card = document.createElement("div");

      card.className = "event-card";

      card.innerHTML = `
        <h3>${event.name || "Untitled Event"}</h3>
        <p>Status: Active</p>

        <a href="vote.html?event=${docSnap.id}">
          <button class="vote-btn">
            Vote Now
          </button>
        </a>
      `;

      container.appendChild(card);

    });

  }

  catch(error) {

    console.error(error);

    container.innerHTML = `
      <div class="empty-state">
        <h3>Error Loading Events</h3>
        <p>${error.message}</p>
      </div>
    `;
  }

}

loadEvents();
