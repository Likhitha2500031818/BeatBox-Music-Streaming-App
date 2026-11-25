const songs = [
    {
        id: 1,
        title: "Summer Vibes",
        artist: "DJ Beat",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        id: 2,
        title: "Dream Music",
        artist: "John Music",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        id: 3,
        title: "Night Party",
        artist: "DJ Night",
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },

    {
        id: 4,
        title: "Relaxing Beats",
        artist: "Calm Music",
        image: "https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },

    {
        id: 5,
        title: "Rock Star",
        artist: "Rock Band",
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },

    {
        id: 6,
        title: "Love Song",
        artist: "Melody",
        image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },

    {
        id: 7,
        title: "Morning Energy",
        artist: "Happy Beats",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },

    {
        id: 8,
        title: "Chill Mode",
        artist: "Lo-Fi",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

let playlist = JSON.parse(
    localStorage.getItem("musicPlaylist") || "[]"
);


/* SHOW SECTION */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    if (sectionId === "playlist") {
        displayPlaylist();
    }
}


/* CREATE SONG CARD */

function createSongCard(song) {

    return `
        <div class="song-card">

            <img src="${song.image}" alt="${song.title}">

            <h3>${song.title}</h3>

            <p>🎤 ${song.artist}</p>

            <button onclick="playSong(${song.id})">
                ▶ Play
            </button>

            <button onclick="addToPlaylist(${song.id})">
                ❤️ Add
            </button>

        </div>
    `;
}


/* DISPLAY SONGS */

function displaySongs(songList = songs) {

    document.getElementById("songContainer").innerHTML =
        songList.map(createSongCard).join("");

    document.getElementById("allSongs").innerHTML =
        songList.map(createSongCard).join("");
}


/* PLAY SONG */

function playSong(id) {

    const song = songs.find(song => song.id === id);

    document.getElementById("currentSong").textContent =
        song.title + " - " + song.artist;

    const audio = document.getElementById("audioPlayer");

    audio.src = song.audio;

    audio.play();
}


/* ADD PLAYLIST */

function addToPlaylist(id) {

    const song = songs.find(song => song.id === id);

    const exists = playlist.some(item => item.id === id);

    if (exists) {
        alert("Song already in playlist!");
        return;
    }

    playlist.push(song);

    localStorage.setItem(
        "musicPlaylist",
        JSON.stringify(playlist)
    );

    alert("Song added to playlist ❤️");
}


/* DISPLAY PLAYLIST */

function displayPlaylist() {

    const container =
        document.getElementById("playlistContainer");

    if (playlist.length === 0) {

        container.innerHTML =
            "<p>Your playlist is empty.</p>";

        return;
    }

    container.innerHTML =
        playlist.map(createSongCard).join("");
}


/* SEARCH */

function searchSongs() {

    const query =
        document.getElementById("search").value.toLowerCase();

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    );

    displaySongs(filteredSongs);
}


/* STOP */

function stopMusic() {

    const audio =
        document.getElementById("audioPlayer");

    audio.pause();
    audio.currentTime = 0;

    document.getElementById("currentSong").textContent =
        "Select a song";
}


/* START */

displaySongs();

/* =========================
   USER SIGN UP
========================= */

function signup() {

    const name =
        document.getElementById("signupName").value.trim();

    const email =
        document.getElementById("signupEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("signupPassword").value;

    const message =
        document.getElementById("signupMessage");

    if (!name || !email || !password) {

        message.textContent =
            "Please fill all fields.";

        message.style.color = "red";

        return;
    }

    let users =
        JSON.parse(
            localStorage.getItem("musicUsers") || "[]"
        );

    const exists =
        users.some(user => user.email === email);

    if (exists) {

        message.textContent =
            "Account already exists.";

        message.style.color = "red";

        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem(
        "musicUsers",
        JSON.stringify(users)
    );

    message.textContent =
        "Account created successfully!";

    message.style.color = "#1db954";

    setTimeout(() => {
        showSection("login");
    }, 1000);
}


/* =========================
   USER LOGIN
========================= */

function login() {

    const email =
        document.getElementById("loginEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    const users =
        JSON.parse(
            localStorage.getItem("musicUsers") || "[]"
        );

    const user =
        users.find(
            u =>
                u.email === email &&
                u.password === password
        );

    if (user) {

        localStorage.setItem(
            "musicLoggedIn",
            email
        );

        message.textContent =
            "Login successful! Welcome " + user.name;

        message.style.color = "#1db954";

        setTimeout(() => {
            showSection("home");
        }, 800);

    } else {

        message.textContent =
            "Incorrect email or password.";

        message.style.color = "red";
    }
}


/* =========================
   ADMIN LOGIN
========================= */

function adminLogin() {

    const email =
        document.getElementById("adminEmail").value
        .trim();

    const password =
        document.getElementById("adminPassword").value;

    const message =
        document.getElementById("adminMessage");

    if (
        email === "admin@beatbox.com" &&
        password === "Admin123"
    ) {

        localStorage.setItem(
            "musicAdmin",
            "true"
        );

        message.textContent =
            "Admin login successful!";

        message.style.color = "#1db954";

        setTimeout(() => {
            showSection("admin");
            displayAdminSongs();
        }, 500);

    } else {

        message.textContent =
            "Wrong admin email or password.";

        message.style.color = "red";
    }
}


/* =========================
   ADMIN ADD SONG
========================= */

function addSong() {

    if (
        localStorage.getItem("musicAdmin") !== "true"
    ) {
        alert("Please login as admin.");
        return;
    }

    const title =
        document.getElementById("songTitle").value.trim();

    const artist =
        document.getElementById("songArtist").value.trim();

    const image =
        document.getElementById("songImage").value.trim();

    const audio =
        document.getElementById("songAudio").value.trim();

    const message =
        document.getElementById("adminActionMessage");

    if (!title || !artist || !audio) {

        message.textContent =
            "Please enter title, artist and audio URL.";

        message.style.color = "red";

        return;
    }

    const newSong = {

        id: Date.now(),

        title: title,

        artist: artist,

        image:
            image ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",

        audio: audio
    };

    songs.push(newSong);

    message.textContent =
        "Song added successfully!";

    message.style.color = "#1db954";

    document.getElementById("songTitle").value = "";
    document.getElementById("songArtist").value = "";
    document.getElementById("songImage").value = "";
    document.getElementById("songAudio").value = "";

    displaySongs();

    displayAdminSongs();
}


/* =========================
   ADMIN SONG LIST
========================= */

function displayAdminSongs() {

    const container =
        document.getElementById("adminSongs");

    if (!container) return;

    container.innerHTML =
        songs.map(song => `

        <div class="song-card">

            <img
                src="${song.image}"
                alt="${song.title}"
            >

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

            <button
                onclick="deleteSong(${song.id})">
                🗑 Delete
            </button>

        </div>

    `).join("");
}


/* =========================
   DELETE SONG
========================= */

function deleteSong(id) {

    if (
        localStorage.getItem("musicAdmin") !== "true"
    ) {
        return;
    }

    const index =
        songs.findIndex(song => song.id === id);

    if (index !== -1) {

        songs.splice(index, 1);

        displaySongs();

        displayAdminSongs();
    }
}


/* =========================
   ADMIN LOGOUT
========================= */

function adminLogout() {

    localStorage.removeItem("musicAdmin");

    showSection("home");
}