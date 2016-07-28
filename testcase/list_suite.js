/*
 Require and initialise PhantomCSS module
 Paths are relative to CasperJs directory
 */

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var phantomcss = require( path );
var config = require( configPath );

casper.test.begin( 'list  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/list' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/list' ),
        addLabelToFailedImage: false,
    } );

    casper.on( 'remote.message', function ( msg ) {
        this.echo( msg );
    } )

    casper.on( 'error', function ( err ) {
        this.die( "PhantomJS has errored: " + err );
    } );

    casper.on( 'resource.error', function ( err ) {
        casper.log( 'Resource load error: ' + err, 'warning' );
    } );

    /*
     The test scenario
     */

    casper.start( config.getServerUrl()+'lists.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============

    //capture the whole page
    casper.then( function () {
        phantomcss.screenshot( 'body', 'whole_list_page');
    } );

    //capture the standard list
    casper.then( function () {
        phantomcss.screenshot( '.button-list:nth-child(1)', 'list_standard' );
    } );

    //capture the selection list
    casper.then( function () {
        phantomcss.screenshot( '.button-list:nth-child(2)', 'list_selection' );
    } );

    //capture the stripes list
    casper.then( function () {
        phantomcss.screenshot( '.button-list:nth-child(3)', 'list_stripes' );
    } );

    //capture the small list
    casper.then( function () {
        phantomcss.screenshot( '.button-list:nth-child(4)', 'list_small' );
    } );

    // MOUSE BEHAVIOR CAPTURES
    // =================

    // Hover
    casper.then( function () {
        casper.mouse.move('.button-list:nth-child(2) li:nth-child(1)');
        phantomcss.screenshot( '.button-list:nth-child(2)', 'list_selection_after_hover' );
    } );

    casper.then( function () {
        casper.mouse.move('.button-list:nth-child(3) li:nth-child(4)');
        phantomcss.screenshot( '.button-list:nth-child(3)', 'list_stripes_after_hover' );
    } );

    casper.then( function () {
        casper.mouse.move('.button-list:nth-child(4) li:nth-child(2)');
        phantomcss.screenshot( '.button-list:nth-child(4)', 'list_small_after_hover' );
    } );


    // Click
    casper.then( function () {
        casper.mouse.click('.button-list:nth-child(2) li:nth-child(1)');
        phantomcss.screenshot( '.button-list:nth-child(2)', 'list_selection_after_selected' );
    } );

    casper.then( function () {
        casper.mouse.click('.button-list:nth-child(3) li:nth-child(4)');
        phantomcss.screenshot( '.button-list:nth-child(3)', 'list_stripes_after_selected' );
    } );

    casper.then( function () {
        casper.mouse.click('.button-list:nth-child(4) li:nth-child(2)');
        phantomcss.screenshot( '.button-list:nth-child(4)', 'list_small_after_selected' );
    } );



    casper.then( function now_check_the_screenshots() {
        // compare screenshots
        phantomcss.compareAll();
    } );
    /*
     Casper runs tests
     */
    casper.run( function () {
        console.log( '\nTHE END.' );
        // phantomcss.getExitStatus() // pass or fail?
        casper.test.done();
    } );
} );
