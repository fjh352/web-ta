/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var jqueryPath = fs.absolute( fs.workingDirectory + '/config/jquery.js' );
var phantomcss = require( path );
var config = require( configPath );
var jQuery = require( jqueryPath );

casper.test.begin( 'balloon tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/balloon' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/balloon' ),
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

	casper.start( config.getServerUrl()+'balloon.html' );

	casper.viewport( 1600, 1000 );




	//capture balloon hover state
		//default balloon hover state
	casper.then( function () {
		casper.mouse.move('#TA-balloon-defaultballoon');
		phantomcss.screenshot( '#TA-balloon-defaultballoon', 'balloon_case15_2_1_step2' ); 
	} );
	
		// info button  with icon a bit more  hover state
	casper.then( function () {
		casper.mouse.move('#TA-balloon-tooltip1');
	this.wait(2000,function(){
		phantomcss.screenshot( '#TA-balloon-bodyballoon', 'balloon_case15_2_7_step2' ); 
	} );
	})

		//check info button support hover operation 
	casper.then( function () {
		casper.mouse.move('#TA-balloon-tooltip2');
	this.wait(2000,function(){
		phantomcss.screenshot( '.demo-body-content', 'balloon_case15_2_8_step2' ); 

	} );
	})

	// capture balloon keyboard state
		//bottom balloon keyboard press event
	casper.then( function() {
		this.page.sendEvent("keypress", this.page.event.key.Tab);
		this.page.sendEvent("keypress", this.page.event.key.Tab);
		this.page.sendEvent("keypress", this.page.event.key.Tab);
     	this.page.sendEvent("keyup", this.page.event.key.Space);
     	// this.wait(1000,function(){
		phantomcss.screenshot( '.demo-body-content', 'balloon_case15_2_2_step5');

		// } );
     })

		//time popver balloon keyboard press event
	casper.then( function() {

		this.page.sendEvent("keypress", this.page.event.key.Tab);
		this.page.sendEvent("keypress", this.page.event.key.Tab);
     	this.page.sendEvent("keydown", this.page.event.key.Space);
		phantomcss.screenshot( '.demo-body-content', 'balloon_case15_2_4_step5');	

     })


	//capture balloon click state
		//check top balloon click state
	casper.then( function() {
		casper.mouse.click('#TA-balloon-topballoon');
		this.wait(2000,function(){
			phantomcss.screenshot('#TA-balloon-bodyballoon', 'balloon_case15_2_3_step3');
		});	
	})

		//info button  with icon a bit more  click state		
	casper.then( function() {
		casper.mouse.click('#TA-balloon-tooltip1');

		this.wait(2000,function(){
			phantomcss.screenshot('.demo-body-content', 'balloon_case15_2_7_step3');
		});	
	})

		//info button  with icon a bit more  click state	
	casper.then( function() {

		casper.mouse.click('#mypop1');

		this.wait(2000,function(){
			phantomcss.screenshot('#TA-balloon-bodyballoon', 'balloon_case15_2_5_step3');
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
