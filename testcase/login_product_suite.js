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

casper.test.begin( 'login-product tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/login_product' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/login_product' ),
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

    casper.start( config.getServerUrl()+'example-login-product.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============

    //capture the whole login
    casper.then( function () {
        casper.sendKeys('#applicationLoginUsername', 'hello', {keepFocus: true});
        phantomcss.screenshot( '#applicationLoginUsername', 'login-product_case28_4_1_step4');
    } );

    casper.then( function () {
        casper.mouse.move('#applicationLoginPassword');
        phantomcss.screenshot( '#applicationLoginPassword', 'login-product_case28_4_2_step2');
    } );


    casper.then( function () {
        casper.mouse.move('#TA_login_forgetpassword');
        phantomcss.screenshot( '#TA_login_forgetpassword', 'login-product_case28_4_3_step2');
    } );


    casper.then( function () {

        casper.sendKeys('#applicationLoginPassword', 'hello', {keepFocus: true});
        casper.mouse.move('#applicationLoginButton');
        phantomcss.screenshot( '#applicationLoginButton', 'login-product_case28_4_1_step4');
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
