const searchSong = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    
    //fetching the data
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displaySongs(data.data))
    toggleSpinner()
    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch(error){
        displayErrorMessage("Sorry, Something went wrong!");
    }   
}

var searchButton = document.getElementById("search-button");
document.getElementById("search-field")
    .addEventListener("keypress", function(event){
        if(event.key == 'Enter'){
            searchButton.click();
        }
    });


const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        console.log(song);
        
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-3">
            <img src="${song.album.cover}"/>
        </div> 
        <div class="col-md-9">
            <div>
                <div class="row-md-10">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                </div>
                <div class="row-md-3 text-md-right text-center">
                    <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
            <div>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner()
    });
}

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    // fetch(url)
    // .then(res => res.json())
    // .then(data => console.log(data))
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch(error) {
        displayErrorMessage("No Lyrics found for this song!")
    }
}

const displayLyrics = lyrics => {
    const lyricDiv = document.getElementById('lyric');
    lyricDiv.innerText = lyrics;
}

const displayErrorMessage = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none')
}