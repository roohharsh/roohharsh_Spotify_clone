console.log("welcome to spotify");


//initialize the variables
let songIndex = 0;    // which song play
let audioElement = new Audio('songs/1.mp3');   // make a new audio
let masterPlay = document.getElementById('masterPlay');   // it is for master play button

let myProgress = document.getElementById('myProgress');   // progress bar
let gif = document.getElementById('gif');    // playing gif ( applying opacity property on it )
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));    // to get the name of songs when they play
let songs = [
    { songName: "Raabta", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Teri Hogaiyaan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Jaan Ban Gaye", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Hasdi Rehya Kar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Hosanna", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Ranjha", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Kabhii Tumhhe", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Khoya Khoya", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Teri Aankhon Mein", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Gone", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]

songItem.forEach((Element, i) => {   // it will show all song as per they called 
    // console.log(Element, i);
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {     // if someone click master button
    if (audioElement.paused || audioElement.currentTime <= 0) {   // either pause or not start yet
        audioElement.play();   // now if we clock on play button it will play
        masterSongName.innerText = songs[songIndex].songName;

        masterPlay.classList.remove('fa-play-circle-o');    // remove play icon & add pause icon
        masterPlay.classList.add('fa-pause-circle-o');
        gif.style.opacity = 1;    // our playing gif will show now

        let studentPlay = document.getElementById(songIndex);
        studentPlay.classList.remove('fa-play-circle-o');
        studentPlay.classList.add('fa-pause-circle-o');

    }
    else {    // when song play
        audioElement.pause();    // we want to pause
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle-o');   // remove pause icon & add play icon
        masterPlay.classList.add('fa-play-circle-o');
        gif.style.opacity = 0;    // our playing gif hides

    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {    // timeupdate is our event & we listen it in audioElement
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);   // it will give us the % of song played
    myProgress.value = progress;
    if(audioElement.currentTime == audioElement.duration)
{
    makeAllPlays();
    if (songIndex >= 9) {
        songIndex = 0;

    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;

    let studentPlay = document.getElementById(songIndex);
    studentPlay.classList.remove('fa-play-circle-o');
    studentPlay.classList.add('fa-pause-circle-o');

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o');
}

// when we want to listen song at any other instant or change progress bar
})
myProgress.addEventListener('change', () => {
    audioElement.currentTime = (myProgress.value) * audioElement.duration / 100;

})
const makeAllPlays = () => {   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle-o');
        element.classList.add('fa-play-circle-o');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {    // this is for playing sonsg from their respective minor play button
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            
            e.target.classList.remove('fa-play-circle-o');   // remove play & add pause
            e.target.classList.add('fa-pause-circle-o');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle-o');
            masterPlay.classList.add('fa-pause-circle-o');
        }
        else if(audioElement.src != `songs/${songIndex + 1}.mp3` )
        {
            makeAllPlays();
            audioElement.pause();
            audioElement.src=`songs/${songIndex + 1}.mp3`;
            audioElement.play();
            e.target.classList.remove('fa-play-circle-o');
            e.target.classList.add('fa-pause-circle-o');
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle-o');
            masterPlay.classList.add('fa-pause-circle-o');

        }
        else {

            audioElement.pause();
            e.target.classList.remove('fa-pause-circle-o');
            e.target.classList.add('fa-play-circle-o');
            masterPlay.classList.remove('fa-pause-circle-o');
            masterPlay.classList.add('fa-play-circle-o');
            gif.style.opacity = 0;

        }

    })
})
document.getElementById('next').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex >= 9) {
        songIndex = 0;

    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;

    let studentPlay = document.getElementById(songIndex);
    studentPlay.classList.remove('fa-play-circle-o');
    studentPlay.classList.add('fa-pause-circle-o');

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o');

})
document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays();
    if (songIndex <= 0) {
        songIndex = 9;

    }
    else {
        songIndex -= 1;
    }
    
    let studentPlay = document.getElementById(songIndex);
    studentPlay.classList.remove('fa-play-circle-o');
    studentPlay.classList.add('fa-pause-circle-o');

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-play-circle-o');
    masterPlay.classList.add('fa-pause-circle-o');

})
