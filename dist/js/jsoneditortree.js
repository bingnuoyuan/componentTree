
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
			/*this.tree += '<p data-type="'+schema.type+'" class="root">'+schema.title+'</p>'*/
			this.tree += this.drawTree(schema.type,schema.title,0,0,"root","root",0)
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
				if(elem.type == "object"){
					/*htmltree += '<p data-type="'+elem.type+'">'+elem.title+'</p>'*/
					htmltree += self.drawTree(elem.type,elem.title,1,2,"root.root_1","root.root_1",1)
					if(elem.properties != undefiend){
						htmltree +=  self.createObj(elem.properties)
					}
				}else if(elem.type == "array"){
					/*htmltree += '<p data-type="'+elem.type+'">'+elem.title+'</p>'*/
					htmltree += self.drawTree(elem.type,elem.title,1,2,"root.root_1","root.root_1",1)
					if(elem.items != undefiend){
						htmltree +=  self.createObj(elem)
					}
				}
			})
			return htmltree
		}
		, _path:function(){
			return 'root.path'
		}
		, drawTree:function(type,name,pid,id,path,schemapath,index){
			var options = '{"type":'+type+', "pid":'+pid+', "id":'+id+', "path":'+path+', "schemapath": '+schemapath+', "index":'+index+'}'
			var $tree = '<p data-options="'+options+'">'+name+'</p>'
			return $tree
		}
	};
	$.fn.jsoneditortree = function(elem,options){
		var o = new jsonEditorTree(elem,options)
		return o;
	}
})(jQuery,window)