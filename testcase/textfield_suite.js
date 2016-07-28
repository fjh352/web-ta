/**
 Created by grelin on 2016/5/9.
 Require and initialise PhantomCSS module
 Paths are relative to CasperJs directory
 **/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var jQueryPath = fs.absolute( fs.workingDirectory + '/config/jquery.js' );
var phantomcss = require( path );
var config = require( configPath );
var jQuery = require( jQueryPath );

casper.test.begin( 'textfield  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/textfield' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/textfield' ),
        addLabelToFailedImage: false
    } );

    casper.on( 'remote.message', function ( msg ) {
        this.echo( msg );
    } );

    casper.on( 'error', function ( err ) {
        this.die( "PhantomJS has errored: " + err );
    } );

    casper.on( 'resource.error', function ( err ) {
        casper.log( 'Resource load error: ' + err, 'warning' );
    } );

    /*
     The test scenario
     */

    casper.start( config.getServerUrl()+'inputfield.html' );

    casper.viewport( 1600, 1000 );

    //capture state
    casper.then( function () {
        phantomcss.screenshot( 'div .col-md-10', 'textfield_with_indicators_page');
    } );

    casper.then( function () {
        phantomcss.screenshot( '#standardExample', 'textfield_standard' );
    } );

    casper.then( function () {
        phantomcss.screenshot( '#entryChangedExample', 'textfield_entryChanged' );
    } );



    casper.then( function () {
        // casper.evaluate(function triggerKeyDownEvent() {
        //     var e = jQuery.Event("keydown");
        //     e.which = 65;
        //     e.keyCode = 65;
        //     jQuery('#Example1').trigger(e);
        //     return true;
        // });
        casper.sendKeys('#with-clear-button', 'clear', {keepFocus: true});
        // this.page.sendEvent("keypress", this.page.event.key.A);
        this.wait(1000,function(){
            phantomcss.screenshot( 'body', 'textfield_with_clear_button' );
        });
    } );


    casper.then( function () {
        casper.sendKeys('#with-clear-button', 'text', {keepFocus: true});
        casper.mouse.click('#with-clear-button + a');
        this.wait(1000,function(){
            phantomcss.screenshot( 'body', 'textfield_after_clear_button' );
        });
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
