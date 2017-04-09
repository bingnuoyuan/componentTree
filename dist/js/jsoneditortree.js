
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
			//this.elem.append(html)
		}
		, createNode:function(schema){
			/*this.tree += '<p data-type="'+schema.type+'" class="root">'+schema.title+'</p>'*/
			//this.tree += this.drawTree(schema.type,schema.title,"tree","root","schema","schemapath",0)
			this.elem.append(this.drawTree(schema.type,schema.title,"tree","root","schema","schemapath",0))
			if(schema.properties != undefiend){ //schema,pid
				//this.tree += this.createObj(schema.properties,"tree")
				$("#root").append(this.createObj(schema.properties,"root0"))
				//this.createObj(schema.properties,"tree")
			}
			return this.tree 
		}
		, createObj:function(nodeDate,pid){
			var self =  this
				, htmltree = ''
				, index =0

			$.each(nodeDate,function(i,elem){
				//console.log(i,elem)
				if(elem.type == "object" || elem.type == "array"){
					index++	
				}
				if(elem.type == "object"){
					/*htmltree += '<p data-type="'+elem.type+'">'+elem.title+'</p>'*/
					//htmltree += self.drawTree(elem.type,elem.title,pid,pid+'_ul',pid+".properties",pid+".properties",index++)
					//$('#'+pid).append(self.drawTree(elem.type,elem.title,pid,pid+'_ul',pid+".properties",pid+".properties",index++))
					self.drawTree(elem.type,elem.title,pid,pid+'_child',pid+".properties",pid+".properties",index++)
					if(elem.properties != undefiend){
						htmltree +=  self.createObj(elem.properties,pid+'_child'+(index-1))
					}
				}
				else if(elem.type == "array"){
					//htmltree += self.drawTree(elem.type,elem.title,pid,pid+'_ul',pid+".items",pid+".items",index++)
					//$('#'+pid).append(self.drawTree(elem.type,elem.title,pid,pid+'_ul',pid+".items",pid+".items",index++))
					self.drawTree(elem.type,elem.title,pid,pid+'_child',pid+".items",pid+".items",index++)
					if(elem.items != undefiend){
						htmltree +=  self.createObj(elem,pid+'_child'+(index-1))
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
				, parentId = $('#'+pid+'')
				//, index =0
			//var $tree = '<p data-options="'+options+'">'+name+'</p>'
			/*if(type == "object" || type == "array"){
					index++	
				}*/

			var $tree = '<ul id="'+pid+'_ul'+'">'+
						'<li id="'+id+''+index+'" data-type="'+type+'" data-path="'+path+'" data-schemapath="'+schemapath+'" data-index="'+index+'">'+
						'<span class="line"></span>'+
						'<a class="treenode"><span class="iconbtn"></span><span>'+name+'</span></a>'+
						'</li>'+
						'</ul>'
				, nodetree = '<li id="'+id+''+index+'" data-type="'+type+'" data-path="'+path+'" data-schemapath="'+schemapath+'" data-index="'+index+'">'+
						'<span class="line"></span>'+
						'<a class="treenode"><span class="iconbtn"></span><span>'+name+'</span></a>'+
						'</li>'
				//,phtml = ((parentId.length == 0)?$("#Tree"):parentId).append($tree)

			/*if($('#'+id+index).length ==0){
				$('#'+pid).append($tree)
			}else{
				$('#'+id).append(nodetree)
			}*/
			if($('#'+pid+'_ul').length != 0){
				$('#'+pid+'_ul').append(nodetree)
			}else{
				$('#'+pid).append($tree)
			}
			//$('#'+pid).append($tree)
			return $tree
		}
	};
	$.fn.jsoneditortree = function(elem,options){
		var o = new jsonEditorTree(elem,options)
		return o;
	}
})(jQuery,window)





