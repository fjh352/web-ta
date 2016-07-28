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

casper.test.begin( 'example-validation tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/example-validation' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/example-validation' ),
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

    casper.start( config.getServerUrl()+'example-validation.html' );

    casper.viewport( 1600, 1000 );

    //capture validation hover state
     //hover ip adress test
        casper.then( function () {
        casper.mouse.move('#ip_address');
    this.wait(1000,function(){
        phantomcss.screenshot( '#ip_address', 'validation_case32_1_step2' ); 

    } );
    })

     //click date 
    casper.then( function(){
        casper.mouse.click('#date');
        this.wait(1000,function(){
            phantomcss.screenshot( '#date', 'validation_case32_2_step2' );
        });
    })

    //capture validation input state
    // IP adress test field input 111111111
    casper.then( function () {
 
        casper.sendKeys('#ip_address', '111111111', {keepFocus: true});
        // this.page.sendEvent("keypress", this.page.event.key.A);
        this.wait(1000,function(){
            phantomcss.screenshot( '#ip_address', 'validation_case32_1_step4' );
        });
    } );

    // data input 111111111
    casper.then( function () {
 
        casper.sendKeys('#date', '111111111', {keepFocus: true});
        // this.page.sendEvent("keypress", this.page.event.key.A);
        this.wait(1000,function(){
            phantomcss.screenshot( '#date', 'validation_case32_2_step4' );
        });
    } );

    // date with placeholder input 111111111
    casper.then( function () {
 
        casper.sendKeys('#date_placeholder', '111111111', {keepFocus: true});
        // this.page.sendEvent("keypress", this.page.event.key.A);
        this.wait(1000,function(){
            phantomcss.screenshot( '#date_placeholder', 'validation_case32_3_step4' );
        });
    } );

    // time input 111111111
    casper.then( function () {
 
        casper.sendKeys('#time', '111111111', {keepFocus: true});
        // this.page.sendEvent("keypress", this.page.event.key.A);
        this.wait(1000,function(){
            phantomcss.screenshot( '#time', 'validation_case32_4_step4' );
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
