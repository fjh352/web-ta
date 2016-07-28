/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/

var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var configPath = fs.absolute( fs.workingDirectory + '/config/config.js' );
var jQueryPath = fs.absolute( fs.workingDirectory + '/config/jquery.js' );
var phantomcss = require( path );
var config = require( configPath );
var jQuery = require( jQueryPath );

casper.test.begin( 'form  tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/screenshots/form' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/failures/form' ),
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

	casper.start( config.getServerUrl()+'form.html' );
	
	casper.evaluate(function resetDemoHeight() {
            jQuery(".demo-body-content").css({"height":"auto"});
            return true;
	});

    
	casper.viewport( 1600, 2400 );

//Check Normal horizontal form
   casper.then( function() {

		casper.mouse.move('#selectlist1');
		phantomcss.screenshot( '#selectlist1', 'form_case25_1_1_step2');

	})

	casper.then( function() {
		this.sendKeys('#exampleInputEmail1', 'hello', {keepFocus: true})
		phantomcss.screenshot( '#exampleInputEmail1', 'form_case25_1_2_step4');

	})

	casper.then( function() {
		casper.mouse.move('#exampleInputPassword1');
		phantomcss.screenshot( '#exampleInputPassword1', 'form_case25_1_3_step2');

	})

	casper.then( function() {
		casper.mouse.click('#exampleInputDomain1');
		phantomcss.screenshot( '#exampleInputDomain1', 'form_case25_1_4_step3');

	})

	casper.then( function() {
		casper.mouse.move('#existingValue');
		phantomcss.screenshot( '#existingValue', 'form_case25_1_5_step2');

	})

	casper.then( function() {
		casper.mouse.move('#TA_form_Selectablevalue1');	
		phantomcss.screenshot( '#TA_form_Selectablevalue1', 'form_case25_1_6_step2');

	})

	casper.then( function() {
		casper.mouse.click('#TA_form_Optionselection1');
		casper.mouse.move('#exampleInputDomain1');			
		phantomcss.screenshot( '#TA_form_Optionselection1', 'form_case25_1_7_step3');

	})

	casper.then( function() {
		casper.mouse.move('#TA_form_button1');	
		phantomcss.screenshot( '#TA_form_button1', 'form_case25_1_8_step2');

	})

//check small horizontal form
	casper.then( function() {
		casper.mouse.click('#exampleInputPasswordSm');
		phantomcss.screenshot( '#exampleInputPasswordSm', 'form_case25_2_1_step3');

	})

	casper.then( function() {
		casper.mouse.move('#exampleInputDomainSm');
		phantomcss.screenshot( '#exampleInputDomainSm', 'form_case25_2_2_step2');

	})

	casper.then( function() {

		phantomcss.screenshot( '#existingValueSm', 'form_case25_2_3_step1');

	})
	casper.then( function() {
		casper.mouse.click('#TA_form_Smallvalue2');
		casper.mouse.move('#existingValueSm');		
		phantomcss.screenshot( '#TA_form_Smallvalue2', 'form_case25_2_4_step3');

	})
	casper.then( function() {
		casper.mouse.move('#TA_form_smallselection1');
		phantomcss.screenshot( '#TA_form_smallselection1', 'form_case25_2_5_step2');

	})

	casper.then( function() {
		casper.mouse.click('#TA_form_button2');

		phantomcss.screenshot( '#TA_form_button2', 'form_case25_2_6_step3');

	})
 
//check form with labels above the control
	casper.then( function() {

        casper.mouse.click('#selectlist2');	
		casper.mouse.move('#TA_form_selectmenu1 li');
		phantomcss.screenshot( '#TA_form_selectmenu2', 'form_case25_3_1_step4');
	})

	casper.then( function() {
		casper.mouse.click('#exampleInputEmail2');	
		casper.mouse.move('#exampleInputEmail2');	
		phantomcss.screenshot( '#exampleInputEmail2', 'form_case25_3_2_step2');

	})

	casper.then( function() {
		casper.mouse.click('#exampleInputPassword2');		
		phantomcss.screenshot( '#exampleInputPassword2', 'form_case25_3_3_step3');

	})

	casper.then( function() {
		casper.mouse.move('#exampleInputDomain2');
		phantomcss.screenshot( '#exampleInputDomain2', 'form_case25_3_4_step2');

	})

	casper.then( function() {
		casper.mouse.click('#existingValue2');		
		phantomcss.screenshot( '#existingValue2', 'form_case25_3_5_step3');

	})

	casper.then( function() {
		casper.mouse.click('#TA_form_Selectablevalues4');	
		phantomcss.screenshot( '#TA_form_Selectablevalues4', 'form_case25_3_6_step3');

	})

	casper.then( function() {
		casper.mouse.move('#TA_form_Smallvalues3');
		phantomcss.screenshot( '#TA_form_Smallvalues3', 'form_case25_3_7_step2');

	})

	casper.then( function() {
		casper.mouse.move('#TA_form_Optionselection3');
		phantomcss.screenshot( '#TA_form_Optionselection3', 'form_case25_3_8_step2');

	})
	casper.then( function() {
		casper.mouse.move('#TA_form_smallselection3');
		phantomcss.screenshot( '#TA_form_smallselection3', 'form_case25_3_9_step3');

	})

	casper.then( function() {
		casper.mouse.move('#TA_form_button3');	
		phantomcss.screenshot( '#TA_form_button3', 'form_case25_3_10_step2');

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
