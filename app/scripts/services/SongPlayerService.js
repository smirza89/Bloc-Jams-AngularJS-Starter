(function() {
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
         
         var currentBuzzObject = null;
         var currentAlbum = Fixtures.getAlbum();

         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        SongPlayer.maxVol = 100;
        SongPlayer.currentSong = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        SongPlayer.volume = 50;
         var setSong = function(song) {
             if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
             }
         
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                    
                });
            });
            SongPlayer.currentSong = song;
         };

         var playSong =function(){
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;

         }

         var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;

         }

         SongPlayer.play =function(song){
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong();
            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            } 
        };

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            //console.log("1"+ song);
            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            //console.log(currentAlbum.songs.length);
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                console.log(volume);
                currentBuzzObject.setVolume(volume);
            }
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope','Fixtures',SongPlayer]);
})();