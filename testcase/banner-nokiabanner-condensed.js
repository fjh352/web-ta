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

casper.test.begin( 'banner_nokiabanner-condensed tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/banner_nokiabanner-condensed' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/banner_nokiabanner-condensed' ),
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

    casper.start( config.getServerUrl()+'example-banner-condensed.html' );

    casper.viewport( 1600, 1500 );

    // STATIC CAPTURES
    // ===============


   casper.then( function () {
        casper.mouse.click('#TA_banner_search'); 
        phantomcss.screenshot( '#TA_banner_search', 'banner_nokiabanner-condensed_case26_4_1_step3');
    } );


    casper.then( function () {
        casper.mouse.move('#TA_banner_nemuadmin');        
        phantomcss.screenshot( '#TA_banner_nemuadmin', 'banner_nokiabanner-condensed_case26_4_2_step2');
    } );


    casper.then( function () {
        casper.mouse.move('#TA_banner_sitemanagement');          
        phantomcss.screenshot('#TA_banner_sitemanagement', 'banner_nokiabanner-condensed_case26_4_3_1_step2'); 
    } );


    casper.then( function () {
        casper.mouse.click('#TA_banner_sitemanagement');
        this.wait(500,function(){
        casper.mouse.move('#TA_banner_smanchorthree');       
        phantomcss.screenshot('#TA_banner_smanchorthree', 'banner_nokiabanner-condensed_case26_4_3_2_step3'); 
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
