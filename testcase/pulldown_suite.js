/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var phantomcss = require( path );
var config = require( configPath );

casper.test.begin( 'dropdown  tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/dropdown' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/dropdown' ),
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

	casper.start( config.getServerUrl()+'dropdowns.html' );

	casper.viewport( 1600, 1000 );

	//capture all button with close state
	casper.then( function () {
		phantomcss.screenshot( '.form-horizontal', 'whole_pulldown_page' ); 
	} );

	//capture pulldown hover state
	casper.then( function() {
		casper.mouse.move( '#mySelectlist1');
		phantomcss.screenshot( '#mySelectlist1', 'standard_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist2');
		phantomcss.screenshot( '#mySelectlist2', 'disabled_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist3');
		phantomcss.screenshot( '#mySelectlist3', 'small_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist4');
		phantomcss.screenshot( '#mySelectlist4', 'dark_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist5');
		phantomcss.screenshot( '#mySelectlist5', 'disabled_dark_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist6');
		phantomcss.screenshot( '#mySelectlist6', 'standard_resizing_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist7');
		phantomcss.screenshot( '#mySelectlist7', 'small_resizing_pulldown_hover')
	})

	casper.then( function() {
		casper.mouse.move( '#mySelectlist8');
		phantomcss.screenshot( '#mySelectlist8', 'multiple_pulldown_hover')
	})

	//capture pulldown expand state
	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist1');
		phantomcss.screenshot( '.form-horizontal', 'standard_pulldown_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist2');
		phantomcss.screenshot( '.form-horizontal', 'disabled_pulldown_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist3');
		phantomcss.screenshot( '.form-horizontal', 'small_pulldown_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist4');
		phantomcss.screenshot( '.form-horizontal', 'dark_pulldown_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist5');
		phantomcss.screenshot( '.form-horizontal', 'dark_disabled_pulldown_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist6');
		phantomcss.screenshot( '.form-horizontal', 'standard_resizing_pulldown_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist7');
		phantomcss.screenshot( '.form-horizontal', 'small_resizing_expand_state' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist8');
		phantomcss.screenshot( 'body', 'multip_expand_state' );

	})


	//capture pulldown expand and hover second item
	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist1');
		casper.mouse.move('#mySelectlist1 ul li:nth-child(2)');
		phantomcss.screenshot( '.form-horizontal', 'standard_pulldown_expand_state_and_hover_second_item' );

	})


	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist3');
		casper.mouse.move('#mySelectlist3 ul li:nth-child(2)');
		phantomcss.screenshot( '.form-horizontal', 'small_pulldown_expand_state_and_hover_second_item' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist4');
		casper.mouse.move('#mySelectlist4 ul li:nth-child(2)');
		phantomcss.screenshot( '.form-horizontal', 'dark_pulldown_expand_state_and_hover_second_item' );

	})


	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist6');
		casper.mouse.move('#mySelectlist6 ul li:nth-child(2)');
		phantomcss.screenshot( '.form-horizontal', 'standard_resizing_pulldown_expand_state_and_hover_second_item' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist7');
		casper.mouse.move('#mySelectlist7 ul li:nth-child(2)');
		phantomcss.screenshot( '.form-horizontal', 'small_resizing_expand_state_and_hover_second_item' );

	})

	casper.then( function() {
		casper.mouse.click('h1');
		casper.mouse.click( '#mySelectlist8');
		casper.mouse.move('#mySelectlist8 ul li:nth-child(2)');
		phantomcss.screenshot( 'body', 'multip_expand_state_and_hover_second_item' );

	})
	
    
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
