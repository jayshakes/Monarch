'use strict';

/**
 * @ngdoc overview
 * @name monarchApp
 * @description
 * # monarchApp
 *
 * Main module of the application.
 */
angular.module('monarchApp')
.factory('myService', function() {
        return {
            foo: function() {
                alert("I'm foo!");
            }
        };
})
.factory('myProducts', function() {
        return {
            allItems: function() {
                JSON.parse(localStorage.getItem('testObject'));
                console.log(JSON.parse(localStorage.getItem('testObject')));
            }
        };
});


//  angular.module('monarchApp')
// .factory('MovieRetriever', function($http, $q, $timeout){
//   var MovieRetriever = new Object();

//   MovieRetriever.getmovies = function(i) {
//     var moviedata = $q.defer();
//     var movies;

//     var someMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

//     var moreMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel", "The Way Way Back", "Before Midnight", "Only God Forgives", "I Give It a Year", "The Heat", "Pacific Rim", "Pacific Rim", "Kevin Hart: Let Me Explain", "A Hijacking", "Maniac", "After Earth", "The Purge", "Much Ado About Nothing", "Europa Report", "Stuck in Love", "We Steal Secrets: The Story Of Wikileaks", "The Croods", "This Is the End", "The Frozen Ground", "Turbo", "Blackfish", "Frances Ha", "Prince Avalanche", "The Attack", "Grown Ups 2", "White House Down", "Lovelace", "Girl Most Likely", "Parkland", "Passion", "Monsters University", "R.I.P.D.", "Byzantium", "The Conjuring", "The Internship"]

//     if(i && i.indexOf('T')!=-1)
//       movies=moreMovies;
//     else
//       movies=moreMovies;

//     $timeout(function(){
//       moviedata.resolve(movies);
//     },1000);

//     return moviedata.promise
//   }

//   return MovieRetriever;
// });

