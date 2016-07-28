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

casper.test.begin( 'login-legal copy  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/login_legal-copy' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/login_legal-copy' ),
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

    casper.start( config.getServerUrl()+'example-login-legalcopy.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============

    //capture the whole login
    casper.then( function () {
        phantomcss.screenshot( '#TA_login_legalcopy', 'login_legal-copy_case28_5_step1');
    } );


    casper.then( function () {
        casper.mouse.click('#applicationLoginUsername');
        phantomcss.screenshot( '#applicationLoginUsername', 'login_legal-copy_case28_5_1_step3');
    } );

    casper.then( function () {
        casper.mouse.click('#applicationLoginPassword');
        phantomcss.screenshot( '#applicationLoginPassword', 'login_legal-copy_case28_5_2_step3');
    } );


    casper.then( function () {
        casper.mouse.click('#nokia_login_legal_copy');
        this.page.sendEvent("keypress", this.page.event.key.Tab);
        this.page.sendEvent("keypress", this.page.event.key.Tab);
        this.page.sendEvent("keypress", this.page.event.key.Tab);
        this.page.sendEvent("keypress", this.page.event.key.Tab)

        phantomcss.screenshot( '#TA_login_forgetpassword', 'login_legal-copy_case28_5_3_step4');
    } );


    casper.then( function () {
        casper.sendKeys('#applicationLoginUsername', 'hello', {keepFocus: true}); 
        casper.sendKeys('#applicationLoginPassword', 'hello', {keepFocus: true});

        phantomcss.screenshot( '#applicationLoginButton', 'login_legal-copy_case28_5_4_step1');
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
