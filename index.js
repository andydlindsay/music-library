const uuidv4 = require('uuid/v4');

// Library - name and creator (strings), playlists []
class Library {

    constructor(props) {
        const { name, creator } = props;
        this.name = name;
        this.creator = creator;
        this.playlists = [];
        this.id = uuidv4();
    }

    addPlaylist(playlist) {
        this.playlists.push(playlist);
    }

    removePlaylist(playlistId) {
        this.playlists = this.playlists.filter((playlist) => {
            return playlist.id !== playlistId;
        });
    }

    logLibrary() {
        console.log(`Library: ${this.name} was created by ${this.creator} and contains ${this.playlists.length} playlist(s)`);
    }

}

const newLib = new Library({ name: 'my library', creator: 'Barry' });
newLib.logLibrary();

// Playlist - name, tracks [], overallRating (avg track ratings), totalDuration (total track seconds)
class Playlist {

    constructor(props) {
        const { name } = props;
        this.name = name;
        this.tracks = [];
        this.overallRating = 0;
        this.totalDuration = 0;
        this.id = uuidv4();
    }

    addTrack(track) {
        this.tracks.push(track);
        this.totalDuration += track.length;
        if (this.tracks.length === 1) {

        }
        this.overallRating += (this.tracks.length === 1) ? track.rating : (track.rating - this.overallRating) / this.tracks.length;
    }

    removeTrack(trackId) {
        this.tracks = this.tracks.filter((track) => {
            if (track.id === trackId) {
                this.totalDuration -= track.length;
                this.overallRating -= (this.tracks.length === 1) ? track.rating : (track.rating - this.overallRating) / (this.tracks.length - 1);
            }
            return track.id !== trackId;
        });
    }

    logPlaylist() {
        console.log(`Playlist: ${this.name} contains ${this.tracks.length} track(s) and has an average rating of ${this.overallRating} with a total running time of ${this.totalDuration} seconds`);;
    }

}

const newPlaylist = new Playlist({ name: 'my playlist' });
newPlaylist.logPlaylist();

newLib.addPlaylist(newPlaylist);
newLib.logLibrary();

// Track - title, rating, length (seconds)
class Track {

    constructor(props) {
        const { title, rating, length } = props;
        this.title = title;
        this.rating = rating;
        this.length = length;
        this.id = uuidv4();
    }

    logTrack() {
        console.log(`Track: ${this.title} has a rating of ${this.rating}/5 and a running time of ${this.length} seconds`);
    }

}

const newTrack = new Track({ title: 'my track', rating: 3, length: 300 });
newTrack.logTrack();
const anotherTrack = new Track({ title: 'another track', rating: 2, length: 250});


newPlaylist.addTrack(newTrack);
newPlaylist.logPlaylist();
newPlaylist.addTrack(anotherTrack);
newPlaylist.logPlaylist();
newPlaylist.removeTrack(anotherTrack.id);
newPlaylist.logPlaylist();
