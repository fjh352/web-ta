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

casper.test.begin( 'login error tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/login_error' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/login_error' ),
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

    casper.start( config.getServerUrl()+'example-login-error.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============


    casper.then( function () {
        casper.mouse.move('#applicationLoginUsername');
        phantomcss.screenshot( '#applicationLoginUsername', 'login_error_case28_7_1_step2');
    } );

    casper.then( function () {
        casper.mouse.click('#applicationLoginPassword');
        phantomcss.screenshot( '#applicationLoginPassword', 'login_error_case28_7_2_step3');
    } );


    casper.then( function () {
        casper.mouse.move('#TA_login_forgetpassword');
        phantomcss.screenshot( '#TA_login_forgetpassword', 'login_error_case28_7_3_step2');
    } );


    casper.then( function () {
        casper.sendKeys('#applicationLoginUsername', 'hello', {keepFocus: true}); 
        casper.sendKeys('#applicationLoginPassword', 'hello', {keepFocus: true});
        casper.mouse.click('#applicationLoginButton');
        phantomcss.screenshot( '#applicationLoginButton', 'login_error_case28_7_4_step3');
    } );

    casper.then( function () {
        phantomcss.screenshot( '#TA_login_error', 'login_error_case28_7_5_step1');
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
