var bannerIdx = 0;

function initPlaylist() {

}

function initMusicPlayer() {
    var audio = document.getElementById('audioPlayer');
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('li');
    var currentTrack = 0;
    currentTrack = t;
    for (var t = 0; t < tracks.length; t++) {
        if (tracks[t].classList.contains('selected')) {
            setTrack(audio, tracks[t]);
        }
    }
    audio.volume = .30;
    audio.addEventListener('ended', function(e) {
    	currentTrack++;
    	if (currentTrack == tracks.length) {
    		currentTrack = 0;
    	}
    	playTrack(tracks[currentTrack]);
    });
    audio.addEventListener('timeupdate', function(e) {
    	updateAudioProgress();
    });
    audio.addEventListener('durationchange', function(e) {
    	updateAudioProgress();
    });
    audio.addEventListener('volumechange', function(e) {
    	updateVolume();
    });
}

function setTrack(audio, track) {
    audio.src = track.getAttribute('value');
    audio.load();
}

function togglePlay(button) {
    var audio = document.getElementById('audioPlayer');
    if (audio.paused) {
        audio.play();
        button.setAttribute("class", "fas fa-pause");
    } else {
        audio.pause();
        button.setAttribute("class", "fas fa-play");
    }
}

function progressChange(slider) {
    var audio = document.getElementById('audioPlayer');
    audio.currentTime = slider.value;
}

function updateAudioProgress() {
    var audio = document.getElementById('audioPlayer');
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    updateLabel(currentTime, duration);
    updateSlider(currentTime, duration);
}

function updateLabel(currentTime, duration) {
    var currentMinutes = Math.floor(currentTime / 60);
    var currentSeconds = Math.round(currentTime % 60);
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.round(duration % 60);
    var currentTimeDisplay = currentMinutes + ":" + ('00' + currentSeconds).substr(-2);
    var durationTimeDisplay = durationMinutes + ":" + ('00' + durationSeconds).substr(-2);
    document.getElementById("positionLabel").innerHTML = currentTimeDisplay;
    document.getElementById("totalLabel").innerHTML = durationTimeDisplay;

}

function updateSlider(currentTime, duration) {
    var slider = document.getElementById('progressSlider');
    slider.value = currentTime;
    slider.setAttribute("max", duration);
}

function volumeChange(slider) {
    var audio = document.getElementById('audioPlayer');
    audio.volume = slider.value / 100;
    if (slider.value > 0) {
        audio.muted = false;
    }
}

function toggleMute(button) {
    var audio = document.getElementById('audioPlayer');
    if (audio.muted) {
        audio.muted = false;
        button.setAttribute("class", "fas fa-volume-up");
    } else {
        audio.muted = true;
        button.setAttribute("class", "fas fa-volume-mute");
    }
    updateVolume();
}

function updateVolume() {
    var audio = document.getElementById('audioPlayer');
    var slider = document.getElementById('volumeSlider');
    var percent = 0;
    if (!audio.muted) {
        percent = (audio.volume) * 100;
    }
    slider.value = percent;
    var button = document.getElementById('volumeButton');
    if (percent == 0) {
        button.setAttribute("class", "fas fa-volume-mute");
    } else {
        button.setAttribute("class", "fas fa-volume-up");
    }
}

function playTrack(selection) {
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('li');
    for (var t = 0; t < tracks.length; t++) {
        tracks[t].classList.remove('selected');
    }
    selection.classList.add('selected');
    var audio = document.getElementById('audioPlayer');
    setTrack(audio, selection);
    document.getElementById("playButton").click();
}

function galleryScrollLeft() {
    var galTable = document.getElementById('galleryView');
    galTable.scrollLeft -= 200;
}

function galleryScrollRight() {
    var galTable = document.getElementById('galleryView');
    galTable.scrollLeft += 200;
}

function selectPhoto(imageContainer) {
    var image = imageContainer.getElementsByTagName("img")[0];
    document.getElementById("photo").src = image.src;
    document.getElementById("photoPopup").classList.add("open");
}

function closePhoto() {
    document.getElementById("photoPopup").classList.remove("open");
}

function startup() {
    initMusicPlayer();
    setTimeout(cycleBanner, 15000);
}

function cycleBanner() {
    var quotes = document.getElementsByClassName("quote");
    quotes[bannerIdx].setAttribute("class", "quote");
    bannerIdx++;
    if (bannerIdx >= quotes.length) {
        bannerIdx = 0;
    }
    quotes[bannerIdx].setAttribute("class", "quote active");
    setTimeout(cycleBanner, 15000);
}
