
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
			this.tree += '<p data-type="'+schema.type+'" class="root">'+schema.title+'</p>'
			if(schema.properties != undefiend){ //obj
				this.tree += this.createObj(schema.properties)
			}
			return this.tree 
		}
		, createObj:function(nodeDate){
			var self =  this
				, htmltree = ''
			$.each(nodeDate,function(i,elem){
				//console.log(i,elem)
				if(elem.type == "object" || elem.type == "array"){
					htmltree += '<p data-type="'+elem.type+'">'+elem.title+'</p>'
					if(elem.properties != undefiend){
						htmltree +=  self.createObj(elem.properties)
						//htmltree += '<h1>node</h1>'
					}
					if(elem.items != undefiend){
						htmltree +=  self.createObj(elem)
					}
				}
				/*else if(elem.type == "array"){
					htmltree += '<p data-type="'+elem.type+'">'+elem.title+'</p>'
					if(elem.default != undefiend){
						//htmltree +=  self.createObj(elem.properties)
						htmltree += '<h1>array</h1>'
					}
				}*/
			})
			return htmltree
		}
	};
	$.fn.jsoneditortree = function(elem,options){
		var o = new jsonEditorTree(elem,options)
		return o;
	}
})(jQuery,window)