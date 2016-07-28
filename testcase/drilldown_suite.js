/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var phantomcss = require( path );
var config = require( configPath );

casper.test.begin( 'drilldown  tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/drilldown' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/drilldown' ),
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

	casper.start( config.getServerUrl()+'drilldown.html' );

	casper.viewport( 1600, 1000 );

	//capture all with  folded state
	casper.then( function () {
		phantomcss.screenshot( 'body', 'whole_drilldown_page'); 
	} );

	casper.then( function () {
		phantomcss.screenshot( '#table-demo-container', 'table_with_folded' ); 
	} );

	//capture drilldown hover state
	casper.then( function () {
		casper.mouse.move('tr:nth-child(1) td:nth-child(3)');
		phantomcss.screenshot( '#table-demo-container', 'table_with_folded_and_hover' ); 
	} );

	//capture drilldown expand state
	casper.then( function() {
		casper.mouse.click('tr:nth-child(1) td:nth-child(3)');
		this.wait(1000,function(){
			phantomcss.screenshot( '#table-demo-container', 'table_with_expand' );
		});
		
	})

	casper.then( function() {
		casper.mouse.click('tr:nth-child(1) td:nth-child(3)');
		casper.mouse.click('tr:nth-child(1) td:nth-child(4)');
		this.wait(1000,function(){
			phantomcss.screenshot( '#table-demo-container', 'table_with_expand_and_mouse_move_same_row');
		});
		
	})

	casper.then( function() {
		casper.mouse.click('tr:nth-child(1) td:nth-child(3)');
		casper.mouse.click('tr:nth-child(3) td:nth-child(3)');
		this.wait(1000,function(){
			phantomcss.screenshot( '#table-demo-container', 'table_with_expand_and_mouse_move_different_row');
		});	
	})

	//capture drilldown after click close button
	casper.then( function() {
		casper.mouse.click('tr:nth-child(1) td:nth-child(3)');
		this.wait(1000,function(){
			casper.mouse.click('#item2 span');
		});
		this.wait(1000,function(){
			phantomcss.screenshot( '#table-demo-container', 'table_folded_after_click_close_button');
		});
		
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
