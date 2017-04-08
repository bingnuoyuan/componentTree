
(function ($,undefiend) {
	// body...
	function jsonEditorTree(elem,options){
		options = $.extend({},options)
		, this.elem = elem
		, this.options = options

		this.init()
	}
	jsonEditorTree.prototype = {
		// body...
		init:function(){
			console.log('init')
		}
	};
	$.fn.jsoneditortree = function(elem,options){
		var o = new jsonEditorTree(elem,options)
		return o;
	}
})(jQuery,window)