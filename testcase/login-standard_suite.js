/*
 Require and initialise PhantomCSS module
 Paths are relative to CasperJs directory
 */

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var phantomcss = require( path );
var config = require( configPath );
var jQueryPath = fs.absolute( fs.workingDirectory + '/config/jquery.js' );
var jQuery = require( jQueryPath );

casper.test.begin( 'login standard  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/login standard' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/login standard' ),
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

    casper.start( config.getServerUrl()+'example-login.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============


   casper.then( function () {
        
        phantomcss.screenshot( '#applicationLoginUsername', 'loginstandard_case28_2_1_step1');
    } );

    casper.then( function () {
        casper.mouse.click('#applicationLoginPassword');
        phantomcss.screenshot( '#applicationLoginPassword', 'loginstandard_case28_2_2_step3');
    } );


    casper.then( function () {
        casper.mouse.click('#TA_login_forgetpassword');
        phantomcss.screenshot( '#TA_login_forgetpassword', 'loginstandard_case28_2_3_step3');
    } );


    casper.then( function () {
        casper.sendKeys('#applicationLoginUsername', 'hello', {keepFocus: true});
        casper.sendKeys('#applicationLoginPassword', 'hello', {keepFocus: true});

        phantomcss.screenshot( '#applicationLoginButton', 'loginstandard_case28_2_4_step1');
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
