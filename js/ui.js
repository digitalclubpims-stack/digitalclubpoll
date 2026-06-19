// ===========================
// GLOBAL UI UTILITIES
// ===========================

// Toast Notification
export function showToast(
    message,
    type = "success"
){

    const toast =
    document.createElement("div");

    toast.className =
    `toast ${type}`;

    toast.innerText =
    message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        },300);

    },3000);

}



// ===========================
// LOADING OVERLAY
// ===========================

export function showLoader(){

    let loader =
    document.getElementById("globalLoader");

    if(loader) return;

    loader =
    document.createElement("div");

    loader.id =
    "globalLoader";

    loader.innerHTML = `

    <div class="loader-box">

        <div class="spinner"></div>

        <p>Loading...</p>

    </div>

    `;

    document.body.appendChild(loader);

}

export function hideLoader(){

    const loader =
    document.getElementById("globalLoader");

    if(loader){

        loader.remove();

    }

}



// ===========================
// CONFIRMATION DIALOG
// ===========================

export function confirmAction(message){

    return confirm(message);

}



// ===========================
// MODAL SYSTEM
// ===========================

export function openModal(id){

    const modal =
    document.getElementById(id);

    if(modal){

        modal.style.display =
        "flex";

    }

}

export function closeModal(id){

    const modal =
    document.getElementById(id);

    if(modal){

        modal.style.display =
        "none";

    }

}



// ===========================
// PAGE REDIRECT
// ===========================

export function navigate(url){

    window.location.href =
    url;

}



// ===========================
// COPY TEXT
// ===========================

export async function copyText(text){

    try{

        await navigator.clipboard
        .writeText(text);

        showToast(
            "Copied to clipboard"
        );

    }

    catch(error){

        console.error(error);

    }

}



// ===========================
// DATE FORMAT
// ===========================

export function formatDate(timestamp){

    if(!timestamp)
    return "-";

    return new Date(timestamp)
    .toLocaleDateString();

}



// ===========================
// TIME FORMAT
// ===========================

export function formatDateTime(timestamp){

    if(!timestamp)
    return "-";

    return new Date(timestamp)
    .toLocaleString();

}



// ===========================
// QUERY PARAMS
// ===========================

export function getParam(key){

    const params =
    new URLSearchParams(
        window.location.search
    );

    return params.get(key);

}



// ===========================
// EMPTY STATE
// ===========================

export function renderEmptyState(
    containerId,
    message = "No Data Found"
){

    const container =
    document.getElementById(
        containerId
    );

    if(!container)
    return;

    container.innerHTML = `

        <div class="empty-state">

            <h3>${message}</h3>

        </div>

    `;

}



// ===========================
// TABLE LOADING
// ===========================

export function renderLoading(
    containerId
){

    const container =
    document.getElementById(
        containerId
    );

    if(!container)
    return;

    container.innerHTML = `

        <div class="loading-state">

            Loading...

        </div>

    `;

}
