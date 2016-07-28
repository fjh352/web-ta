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

casper.test.begin( 'radiobutton tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/radiobutton' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/radiobutton' ),
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

	casper.start( config.getServerUrl()+'radiobutton.html' );

	casper.viewport( 1600, 1000 );

	//capture all radiobutton
	casper.then( function () {
		phantomcss.screenshot( '.col-md-4', 'button_page' );
	} );

	//capture radiobutton hover state
	casper.then( function() {
		casper.mouse.move( '#TA_Radiobutton_enabledradio1');
		phantomcss.screenshot( '#TA_Radiobutton_enabledradio1', 'radiobutton_case4_1_step2')
	})

	casper.then( function() {
		casper.mouse.move( '#TA_Radiobutton_disabledradio1');
		phantomcss.screenshot( '#TA_Radiobutton_disabledradio1', 'radiobutton_case4_2_step2')
	})

	casper.then( function() {
		casper.mouse.move( '#TA_Radiobutton_smallradio1');
		phantomcss.screenshot( '#TA_Radiobutton_smallradio1', 'radiobutton_case4_3_step2')
	})


	//capture radiobutton pressed state
	casper.then( function() {
	casper.mouse.click( '#TA_Radiobutton_enabledradio2');
	casper.mouse.move( '#TA_Radiobutton_enabledradio1');
	phantomcss.screenshot( '#TA_Radiobutton_enabledradio2', 'radiobutton_case4_1_step3')
	})
	
	casper.then( function() {
		casper.mouse.click( '#TA_Radiobutton_disabledradio2');
		phantomcss.screenshot( '#TA_Radiobutton_disabledradio2', 'radiobutton_case4_2_step3')
	})

	casper.then( function() {
		casper.mouse.click( '#TA_Radiobutton_smallradio2');
		casper.mouse.move( '#TA_Radiobutton_enabledradio1');
		phantomcss.screenshot( '#TA_Radiobutton_smallradio2', 'radiobutton_case4_3_step3')
	})
	//capture radiobutton active state


	//capture radiobutton focus state

	
    
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
