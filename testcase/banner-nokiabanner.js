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

casper.test.begin( 'banner_nokia-banner tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/banner_nokia-banner' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/banner_nokia-banner' ),
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

    casper.start( config.getServerUrl()+'example-banner-normal.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============


   casper.then( function () {
        this.sendKeys('#TA_banner_search', 'hello', {keepFocus: true})
        phantomcss.screenshot( '#TA_banner_search', 'banner_nokia-banner_case26_2_1_step4');
    } );

    casper.then( function () {
        casper.mouse.click('#TA_banner_account');
        casper.mouse.move('#TA_banner_accountsubitem');        
        phantomcss.screenshot( '#TA_banner_accountsubitem', 'banner_nokia-banner_case26_2_2_step4');
    } );


    casper.then( function () {
        casper.mouse.click('#TA_banner_item2');
        casper.mouse.move('#TA_banner_Subitemthree');   
        this.wait(500,function(){
        casper.mouse.move('#TA_banner_optionone'); 
        });

        this.wait(500,function(){
        casper.mouse.move('#TA_banner_Oneitemone');  
        phantomcss.screenshot( '#TA_banner_Oneitemone', 'banner_nokia-banner_case26_2_3_step5');
         });
    } );

    casper.then( function () {
        casper.mouse.click('#TA_banner_dropdown-settings');
        phantomcss.screenshot( '#TA_banner_dropdown-settings', 'banner_nokia-banner_case26_2_4_step3');
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
