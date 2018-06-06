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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
            // AR -note that allFeeds is an array of objects, each object with a name and url key/property
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed names are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
            // AR -note that allFeeds is an array of objects, each object with a name and url key/property
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         describe('The menu', function() {

            it('menu element is hidden by default', function() {
                let bodyClasses = document.body.classList;
                expect(bodyClasses).toContain("menu-hidden");
                expect(bodyClasses).not.toContain("menu");
            });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */    
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

        
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        describe('Initial Entries', function() {
            beforeEach(function(done) {
                // AR - executes async code before each test in this test suite scope and uses done to signal completion
                loadFeed(1, function() {
                    done()
                });
                // AR - calling done in the callback provided for in the loadFeed function... all async functions should really have callbacks?
                // AR - tried this with just done() without wrapping it in function () {} first... did not work as expected, later code loggin innerHTML did not work
            });

            it('entries exist within feed when feed load completes', function(done) {
                let feedEntries = document.querySelector('.feed').innerHTML;
                expect(feedEntries).not.toBe(null);
                done();
            });
        });


        /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        describe('New Feed Selection', function() {
        let feedEntry1;
        let feedEntry2;
            beforeEach(function(done) {
                
                // AR -executes async code before each test in this test suite scope and uses done to signal completion
                loadFeed(1, function() {
                    feedEntry1 = document.querySelector('.feed').innerHTML;
                    done()
                });
                // Ar - we execute loadfeed with different id parameter and extract the result from HTML for comparison later
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