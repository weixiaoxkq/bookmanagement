/*
 * ! MemoryTreeLoader
 */

// 定义名称空间
Ext.namespace('Portal.util');

/**
 * 功能描述：读取JS对象中的JSON数据作为Tree的节点数据 <br>
 * 创建日期：2013-05-08 <br>
 * 创建人：卢智帆 <br>
 * 修改日期： <br>
 * 修改人：<br>
 * 
 * @class Portal.util.MemoryTreeLoader
 * @extends Ext.tree.TreeLoader
 */
Portal.util.MemoryTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
			jsonData : '',

			// override
			load : function(node, callback, scope) {
				if (this.clearOnLoad) {
					while (node.firstChild) {
						node.removeChild(node.firstChild);
					}
				}
				if (this.doPreload(node)) { // preloaded json children
					this.runCallback(callback, scope || node, [node]);
				} else if (!Ext.isEmpty(this.jsonData)) {
					this.requestData(node, callback, scope || node);
				}
			},

			// override
			requestData : function(node, callback, scope) {
				if (this.fireEvent("beforeload", this, node, callback) !== false) {

					var o = (typeof this.jsonData == 'string') ? Ext
							.decode(this.jsonData) : this.jsonData;
					node.beginUpdate();
					for (var i = 0, len = o.length; i < len; i++) {
						var n = this.createNode(o[i]);
						if (n) {
							node.appendChild(n);
						}
					}
					node.endUpdate();

				}
				// if the load is cancelled, make sure we notify
				// the node that we are done
				this.runCallback(callback, scope || node, []);
			}

		});

//为方便使用
Portal.MemoryTreeLoader = Portal.util.MemoryTreeLoader;