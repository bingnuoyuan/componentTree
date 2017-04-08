
(function ($,undefiend) {
	// body...
	function jsonEditorTree(elem,options){
		options = $.extend({},options)
		, this.elem = elem
		, this.options = options
		, this.tree = ''
		this.init()
	}
	jsonEditorTree.prototype = {
		// body...
		init:function(){
			var schema = this.options.schema
			var  html = this.createNode(schema)
			this.elem.append(html)
		}
		, createNode:function(schema){
			this.tree += '<p data-type="'+schema.type+'">'+schema.title+'</p>'
			if(schema.properties){ //obj
				this.tree += this.createObj(schema.properties)
			}
			return this.tree 
		}
		, createObj:function(nodeDate){
			$.each(nodeDate,function(i,elem){
				//console.log(i,elem)
				if(elem.type == "object"){
					this.tree += '<p data-type="'+elem.type+'">'+elem.title+'</p>'
					if(elem.properties != undefiend){
						//this.tree +=  this.createObj(elem.properties)
						this.tree += '<h1>node</h1>'
					}
				}
			})
			return this.tree
		}
	};
	$.fn.jsoneditortree = function(elem,options){
		var o = new jsonEditorTree(elem,options)
		return o;
	}
})(jQuery,window)