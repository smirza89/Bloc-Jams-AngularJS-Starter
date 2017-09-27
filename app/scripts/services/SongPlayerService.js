(function() {
    function SongPlayer() {
         var SongPlayer = {};
         var currentSong = null;
         var currentBuzzObject = null;

         var setSong = function(song) {
             if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
             }
         
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
         
            currentSong = song;
         };

         var playSong =function(){
            currentBuzzObject.play();
            song.playing = true;

         }

         SongPlayer.play =function(song){
 
            if (currentSong !== song) {
                setSong(song);
                playSong();
            }
            else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            } 
        };

        SongPlayer.pause = function(song) {
            console.log("1"+ song);
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();