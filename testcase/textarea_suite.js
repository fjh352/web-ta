/**
 Created by kathy on 2016/5/20.
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

casper.test.begin( 'textarea  tests', function ( test ) {

    phantomcss.init( {
        rebase: casper.cli.get( "rebase" ),
        // SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
        casper: casper,
        libraryRoot: fs.absolute( fs.workingDirectory + '' ),
        screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/textarea' ),
        failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/textarea' ),
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

    casper.start( config.getServerUrl()+'textarea.html' );
  
    casper.evaluate(function resetDemoHeight() {
            jQuery(".demo-body-content").css({"height":"auto"});
            return true;
	});

    casper.viewport( 1600, 1000 );

    //capture state
	casper.then( function() {
		casper.mouse.move( '#ta-normal');
		phantomcss.screenshot( '#ta-normal', 'Textarea_case2_1_step2')
	})

    casper.then( function () {
    	  casper.mouse.click('#ta-disabled');
        phantomcss.screenshot( '#ta-disabled', 'Textarea_case2_2_step3' );
    } );

    casper.then( function () {
    	  casper.mouse.click('#ta-readonly');
        phantomcss.screenshot( '#ta-readonly', 'Textarea_case2_3_step3' );
    } );



    casper.then( function () {
    	  
        //casper.sendKeys('#ta-scroll', 'TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT', {keepFocus: true});
        
        this.wait(1000,function(){
        	  
        	  //this.page.sendEvent('keypress', page.event.key.PageDown);
            phantomcss.screenshot( '#ta-scroll', 'Textarea_case2_4_step5' );
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
