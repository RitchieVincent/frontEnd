describe("Movie overall rating calculation", function() {
    var rating;

    beforeEach(function() {
        rating = new Rating();
    });

    it("should equal 8", function(){
        rating.calc();
        expect(movieTotalRating).toBe(8);
    })

});
