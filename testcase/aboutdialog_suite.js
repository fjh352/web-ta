/**
 * Created by jinfeng on 2016/5/30.
 */
/*
 Require and initialise PhantomCSS module
 Paths are relative to CasperJs directory
 */

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
//var jQueryPath = fs.absolute( fs.workingDirectory + '/jquery.min.js' );
var phantomcss = require( path );
//var jQuery = require( jQueryPath );
var config = require( configPath );

casper.test.begin( 'aboutdialog  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/Aboutdialog' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/Aboutdialog' ),
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

    casper.start( config.getServerUrl()+'example-about.html' );

    casper.viewport( 1600, 1000 );

    //capture hover state
    casper.then( function() {
        casper.mouse.click('#TA_about-dialog_link');
        this.wait(500,function(){
            phantomcss.screenshot( '.modal-content', 'about-dialog_case27_1_step1');
        });

    });

    casper.then( function() {
         casper.mouse.move('#TA_aboutdialog_closebutton');           
        phantomcss.screenshot( '#TA_aboutdialog_closebutton', 'aboutdialog_case27_1_step3');

    });



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
