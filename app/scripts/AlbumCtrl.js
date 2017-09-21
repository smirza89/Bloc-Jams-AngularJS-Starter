(function(){
    function AlbumCtrl(){
        this.albumData=angular.copy(albumNsync);
    
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl',AlbumCtrl);
})();