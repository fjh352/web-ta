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

casper.test.begin( 'banner_nokiabanner-overflow tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/banner_nokiabanner-overflow' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/banner_nokiabanner-overflow' ),
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

    casper.start( config.getServerUrl()+'example-banner-overflow.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============


   casper.then( function () {
        casper.mouse.move('#TA_banner_search'); 
        phantomcss.screenshot( '#TA_banner_search', 'banner_nokiabanner-overflow_case26_3_1_step2');
    } );

    casper.then( function () {
        casper.mouse.move('#TA_banner_username');        
        phantomcss.screenshot( '#TA_banner_username', 'banner_nokiabanner-overflow_case26_3_2_step2');
    } );


    casper.then( function () {
        casper.mouse.click('#TA_banner_item2');
        this.wait(500,function(){
        casper.mouse.move('#TA_banner_subitemtwo');          
        phantomcss.screenshot('#TA_banner_subitemtwo', 'banner_nokiabanner-overflow_case26_3_3_1_step3'); 
             });

    } );

    casper.then( function () {
        casper.mouse.click('#TA_banner_item1');
        casper.mouse.move('#TA_banner_anchor1one');           
        phantomcss.screenshot('#TA_banner_anchor1one', 'banner_nokiabanner-overflow_case26_3_3_2_step2');
    } );

    casper.then( function () {
        casper.mouse.move('#TA_banner_graycorner');
        phantomcss.screenshot('#TA_banner_graycorner', 'banner_nokiabanner-overflow_case26_3_4_step2');
    } );

    casper.then( function () {
        casper.mouse.move('#TA_banner_manage');
        phantomcss.screenshot('#TA_banner_manage', 'banner_nokiabanner-overflow_case26_3_5_step2');
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
