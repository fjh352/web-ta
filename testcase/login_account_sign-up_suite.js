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

casper.test.begin( 'login account sign-up  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/login_account_sign-up' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/login_account_sign-up' ),
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

    casper.start( config.getServerUrl()+'example-login-signup.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============
    casper.then( function () {
        casper.mouse.click('#applicationLoginUsername');
        phantomcss.screenshot( '#applicationLoginUsername', 'loginaccountsignup_case28_3_1_step3');
    } );


    casper.then( function () {
        casper.mouse.move('#applicationLoginPassword');
        phantomcss.screenshot( '#applicationLoginPassword', 'loginaccountsignup_case28_3_2_step2');
    } );


    casper.then( function () {
        casper.mouse.click('#TA_login_forgetpassword');
        phantomcss.screenshot( '#TA_login_forgetpassword', 'loginaccountsignup_case28_3_3_step3');
    } );


    casper.then( function () {
        casper.sendKeys('#applicationLoginUsername', 'hello', {keepFocus: true});
        casper.sendKeys('#applicationLoginPassword', 'hello', {keepFocus: true});
        casper.mouse.move('#applicationLoginButton');
        phantomcss.screenshot( '#applicationLoginButton', 'loginaccountsignup_case28_3_4_step3');
    } );

   casper.then( function () {
        casper.mouse.move('#TA_login_signupbutton');
        phantomcss.screenshot( '#TA_login_signupbutton', 'loginaccountsignup_case28_3_5_step2');
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
