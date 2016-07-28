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

casper.test.begin( 'button  tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/button' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/button' ),
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

	/*The test scenario*/

	casper.start( config.getServerUrl()+'buttons.html' );

	casper.viewport( 1600, 1000 );

	//capture all buttons
	casper.then( function () {
		phantomcss.screenshot( 'body', 'whole_button_page' );
	} );

	//capture button hover state
	casper.then( function() {
		casper.mouse.move( '.btn-standard:nth-child(1)');
		phantomcss.screenshot( '.btn-standard:nth-child(1)', 'standard_button_hover')
	})

	casper.then( function() {
		casper.mouse.move( '.btn-large:nth-child(1)');
		phantomcss.screenshot( '.btn-large:nth-child(1)', 'large_button_hover')
	})

	casper.then( function() {
		casper.mouse.move( '.btn-action:nth-child(1)');
		phantomcss.screenshot( '.btn-action:nth-child(1)', 'action_button_hover')
	})

	casper.then( function() {
		casper.mouse.move( '.btn-help');
		phantomcss.screenshot( '.btn-help', 'help_button_hover')
	})

	casper.then( function() {
		casper.mouse.move( '.btn-icon:nth-child(2)');
		phantomcss.screenshot( '.btn-icon:nth-child(2)', 'icon_button_hover')
	})

	casper.then( function() {
		casper.mouse.move( '.btn-action[disabled]');
		phantomcss.screenshot( '.btn-action[disabled]', 'disabled_action_button_hover')
	})

	//capture button pressed state
	casper.then( function() {
		casper.mouse.click( '.btn-standard:nth-child(1)');
		phantomcss.screenshot( '.btn-standard:nth-child(1)', 'standard_button_active')
	})

	casper.then( function() {
		casper.mouse.click( '.btn-small');
		phantomcss.screenshot( '.btn-small', 'small_button_active')
	})

	casper.then( function() {
		casper.mouse.click( '.btn-action:nth-child(1)');
		phantomcss.screenshot( '.btn-action:nth-child(1)', 'action_button_active')
	})

	casper.then( function() {
		casper.mouse.click( '.btn-minimize');
		phantomcss.screenshot( '.btn-minimize', 'minimize_button_active')
	})

	casper.then( function() {
		casper.mouse.click( '.btn-icon:nth-child(5)');
		phantomcss.screenshot( '.btn-icon:nth-child(5)', 'icon_button_active')
	})
	//capture button active state


	//capture button focus state

	
    
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
