/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        it('URLs are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
            // AR -note that allFeeds is an array of objects, each object with a name and url key/property
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        it('feed names are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
            // AR -note that allFeeds is an array of objects, each object with a name and url key/property
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


         describe('The menu', function() {

            it('menu element is hidden by default', function() {
                let bodyClasses = document.body.classList;
                expect(bodyClasses).toContain("menu-hidden");
                expect(bodyClasses).not.toContain("menu");
            });


            it('menu changes visibility when the menu icon is clicked', function() {
                let bodyClasses = document.body.classList;
                let menuIcon = $('.menu-icon-link');
                // AR - .click() simulates a user click on an element
                menuIcon.click();
                expect(bodyClasses).not.toContain("menu-hidden");
                menuIcon.click();
                expect(bodyClasses).toContain("menu-hidden");
            });
        });


        describe('Initial Entries', function() {
            beforeEach(function(done) {
                // AR - executes async code before each test in this test suite scope and uses done to signal completion
                loadFeed(1, function() {
                    done()
                // AR - calling done in the callback provided for in the loadFeed function... all async functions should really have callbacks?
                // AR - tried this with just done() without wrapping it in function () {} first... did not work as expected, later code accessing innerHTML did not have expected value
                });
            });

            it('entries exist within feed when feed load completes', function(done) {
                // AR - passing in 'done' as function parameter and using done() at the end lets jasmine framework know this test relies on asynchronous code
                let feedEntries = document.querySelector('.feed').innerHTML;
                expect(feedEntries).not.toBe(null);
                done();
            });
        });


        describe('New Feed Selection', function() {
        let feedEntry1;
        let feedEntry2;
            beforeEach(function(done) {
                // AR - executes async code before each test in this test suite scope and uses done to signal completion
                loadFeed(1, function() {
                    feedEntry1 = document.querySelector('.feed').innerHTML;
                    done()
                });
                // AR - we execute loadfeed with different id parameter and extract the result from HTML for comparison later
                loadFeed(2, function() {
                    feedEntry2 = document.querySelector('.feed').innerHTML;
                    done()
                });
            });

            it('content changes on async feed load', function(done) {
                expect(feedEntry1).not.toEqual(feedEntry2);
                done();
            });
        });
}());


/*
Sources:
https://jasmine.github.io/2.9/introduction

Extra help from:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
for testing manual clicks: Udacity feed reader testing chat channel - help from user: Ozkan A.
*/