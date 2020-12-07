$(document).ready(function() {
	$('#Sapphirev2_Th_wt9_block_wtMainContent_FormControls_Pat_wt36_block_wtInput_wtNameToFilter').keyup(function(e) {
		var code = e.keyCode ? e.keyCode : e.which;
		if (code == 13) {
			var tabables = $("*[tabindex != '-1']:visible");
			var index = tabables.index(this);
			tabables.eq(index + 1).focus();
			console.log(tabables.eq(index + 1));
			debugger;
		}
	});
});
