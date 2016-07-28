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

casper.test.begin( 'checkbox tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/checkbox' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/checkbox' ),
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

	casper.start( config.getServerUrl()+'checkbox.html' );

	casper.viewport( 1600, 1000 );

	//capture all checkbox
	//casper.then( function () {
		//phantomcss.screenshot( 'body', 'whole_button_page' );
	//} );

	//capture checkbox hover state
	casper.then( function() {
		casper.mouse.move( '#TA-Checkbox-enabledcheck1');
		phantomcss.screenshot( '#TA-Checkbox-enabledcheck1', 'checkbox_case5_1_stept2')
	})

	casper.then( function() {
		casper.mouse.move( '#TA-Checkbox-disabledcheck1');
		phantomcss.screenshot( '#TA-Checkbox-disabledcheck1', 'checkbox_case5_2_stept2')
	})

	casper.then( function() {
		casper.mouse.move( '#TA-Checkbox-smallcheck1');
		phantomcss.screenshot( '#TA-Checkbox-smallcheck1', 'checkbox_case5_3_stept2')
	})

	casper.then( function() {
		casper.mouse.move( '#TA-Checkbox-tristatecheck');
		phantomcss.screenshot( '#TA-Checkbox-tristatecheck', 'checkbox_case5_4_stept2')
	})

	

	//capture checkbox pressed state
	casper.then( function() {
		casper.mouse.click( '#TA-Checkbox-enabledcheck2');
		casper.mouse.move( '#TA-Checkbox-disabledcheck1');
		phantomcss.screenshot( '#TA-Checkbox-enabledcheck2', 'checkbox_case5_1_stept3')
	})

	casper.then( function() {
		casper.mouse.click( '#TA-Checkbox-disabledcheck2');
		casper.mouse.move( '#TA-Checkbox-disabledcheck1');
		phantomcss.screenshot( '#TA-Checkbox-disabledcheck2', 'checkbox_case5_2_stept3')
	})

	casper.then( function() {
		casper.mouse.click( '#TA-Checkbox-smallcheck1');
		casper.mouse.move( '#TA-Checkbox-disabledcheck1');
		phantomcss.screenshot( '#TA-Checkbox-smallcheck1', 'checkbox_case5_3_stept3')
	})

	casper.then( function() {
		casper.mouse.click( '#TA-Checkbox-smurfcheck1');
		casper.mouse.move( '#TA-Checkbox-disabledcheck1');
		phantomcss.screenshot( '.form-group:nth-child(4) ul li', 'checkbox_case5_4_stept5')
	})

	casper.then( function() {
		casper.mouse.click( '#TA-Checkbox-tristatecheck');
		casper.mouse.move( '#TA-Checkbox-disabledcheck1');
		phantomcss.screenshot( '.form-group:nth-child(4) ul li', 'checkbox_case5_4_stept3')
	})


	//capture checkbox active state


	//capture checkbox focus state

	
    
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
