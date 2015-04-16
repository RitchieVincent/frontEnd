function Rating() {
}

Rating.prototype.calc = function(){
    movieTotalRating = 7.7 / 10 + 74 / 100 + 89 / 100;
    movieTotalRating = movieTotalRating / 3;
    movieTotalRating = movieTotalRating * 10;
    movieTotalRating = Math.round(movieTotalRating);
}