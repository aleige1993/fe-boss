/**
 * @author 陈举民
 * @version 1.0
 * @link http:// chenjumin.javaeye.com
 */
let TreeGrid = function(_config) {
  _config = _config || {};
  var s = '';
  var rownum = 0;
  var __root;

  var __selectedData = null;
  var __selectedId = null;
  var __selectedIndex = null;

  var folderOpenIcon = (_config.folderOpenIcon || TreeGrid.FOLDER_OPEN_ICON);
  var folderCloseIcon = (_config.folderCloseIcon || TreeGrid.FOLDER_CLOSE_ICON);
  var defaultLeafIcon = (_config.defaultLeafIcon || TreeGrid.DEFAULT_LEAF_ICON);

	// 显示表头行
  let drowHeader = function() {
    s += '<tr class=\'header\' height=\'' + (_config.headerHeight || '25') + '\'>';
    var cols = _config.columns;
    for (let i = 0; i < cols.length; i++) {
      var col = cols[i];
      if (col.hidden)			{
        s += '<td style=\'display:none\' align=\'' + (col.headerAlign || _config.headerAlign || 'center') + '\' width=\'' + (col.width || '') + '\'>' + (col.headerText || '') + '</td>';
      } else			{
        s += '<td align=\'' + (col.headerAlign || _config.headerAlign || 'center') + '\' width=\'' + (col.width || '') + '\'>' + (col.headerText || '') + '</td>';
      }
    }
    s += '</tr>';
  };

	// 递归显示数据行
  let drowData = function() {
    var rows = _config.data;
    var cols = _config.columns;
    drowRowData(rows, cols, 1, '');
  };

	// 局部变量i、j必须要用 var 来声明，否则，后续的数据无法正常显示
  let drowRowData = function(_rows, _cols, _level, _pid) {
    var folderColumnIndex = (_config.folderColumnIndex || 0);

    for (var i = 0; i < _rows.length; i++) {
      var id = _pid + '_' + i; // 行id
      var row = _rows[i];

      s += '<tr id=\'TR' + id + '\' pid=\'' + ((_pid == '') ? '' : ('TR' + _pid)) + '\' open=\'N\' data="' + TreeGrid.json2str(row) + '" rowIndex=\'' + rownum++ + '\'>';
      for (var j = 0; j < _cols.length; j++) {
        var col = _cols[j];
        if (col.hidden) {
          s += '<td style=\'display:none\' align=\'' + (col.dataAlign || _config.dataAlign || 'left') + '\'';
        }				else				{
          s += '<td align=\'' + (col.dataAlign || _config.dataAlign || 'left') + '\'';
        }
				// 层次缩进
        if (j == folderColumnIndex) {
          s += ' style=\'text-indent:' + (parseInt((_config.indentation || '20')) * (_level - 1)) + 'px;\'> ';
        } else {
          s += '>';
        }
				// 节点图标
        if (j == folderColumnIndex) {
          if (row.children && row.children.length > 0) { // 有下级数据
            s += '<img folder=\'Y\' trid=\'TR' + id + '\' src=\'' + folderOpenIcon + '\' class=\'image_hand 00\'>';
          } else {
            s += '<img src=\'' + defaultLeafIcon + '\' class=\'image_nohand 11\'>';
          }
        }
				// 单元格内容
        if (col.handler) {
          s += (eval(col.handler + '.call(new Object(), row, col)') || '') + '</td>';
        } else {
          s += (row[col.dataField] || '') + '</td>';
        }
      }
      s += '</tr>';

			// 递归显示下级数据
      if (row.children) {
        drowRowData(row.children, _cols, _level + 1, id);
      }
    }
  };
	// 主函数
  this.show = function() {
    this.id = _config.id || ('TreeGrid' + TreeGrid.COUNT++);
    s += '<table id=\'' + this.id + '\' cellspacing=0 cellpadding=0 width=\'' + (_config.width || '100%') + '\' class=\'TreeGrid\'>';
    drowHeader();
    drowData();
    s += '</table>';
    __root = jQuery('#' + _config.renderTo);
    __root.append(s);
		// 初始化动作
    this.init();
  };
  this.init = function() {
		// 以新背景色标识鼠标所指行
    if ((_config.hoverRowBackground || 'false') === 'true') {
      __root.find('tr').hover(
				function() {
  if (jQuery(this).attr('class') && jQuery(this).attr('class') === 'header') return;
  jQuery(this).addClass('row_hover');
},
				function() {
  jQuery(this).removeClass('row_hover');
}
			);
    }
    var clickTimer = null;
		// 将单击事件绑定到tr标签
    __root.find('tr').bind('click', function() {
      __root.find('tr').removeClass('row_active');
      jQuery(this).addClass('row_active');

			// 获取当前行的数据
      __selectedData = this.data || this.getAttribute('data');
      __selectedId = this.id || this.getAttribute('id');
      __selectedIndex = this.rownum || this.getAttribute('rowIndex');

			// 行记录单击后触发的事件
      if (_config.itemClick) {
        setTimeout(function() {
          _config.itemClick(__selectedId, __selectedIndex, TreeGrid.str2json(__selectedData));
        }, 250);
      }
    });

		// 将双击击事件绑定到tr标签
    __root.find('tr').bind('dblclick', function(e) {
      if ($(e.target).not('img')) {
        clearTimeout(clickTimer);
        __root.find('tr').removeClass('row_active');
        jQuery(this).addClass('row_active');

        // 获取当前行的数据
        __selectedData = this.data || this.getAttribute('data');
        __selectedId = this.id || this.getAttribute('id');
        __selectedIndex = this.rownum || this.getAttribute('rowIndex');

        // 行记录单击后触发的事件
        if (_config.itemDblClick) {
          _config.itemDblClick(__selectedId, __selectedIndex, TreeGrid.str2json(__selectedData));
        }
      }
    });
		// 展开、关闭下级节点
    var imgClickTimer = null;
    __root.find('img[folder=\'Y\']').bind('click', function(e) {
      e.cancelBubble = true;
      e.stopPropagation();
      clearTimeout(imgClickTimer);
      var _self = this;
      imgClickTimer = setTimeout(function() {
        var trid = _self.trid || _self.getAttribute('trid');
        var dom = __root.find('#' + trid)[0];
        var isOpen = dom.getAttribute('open');
        isOpen = (isOpen === 'Y') ? 'N' : 'Y';
  	      	dom.setAttribute('open', isOpen);
        showHiddenNode(trid, isOpen);
      }, 250);
// 			var trid = this.trid || this.getAttribute("trid");
// 			var isOpen = __root.find("#" + trid).attr("open");
// 			isOpen = (isOpen == "Y") ? "N" : "Y";
// 			__root.find("#" + trid).attr("open", isOpen);
// 			showHiddenNode(trid, isOpen);
    });
    __root.find('img[folder=\'Y\']').bind('dblclick', function(e) {
      e.cancelBubble = true;
      e.stopPropagation();
      return false;
    });
  };

	// 显示或隐藏子节点数据
  let showHiddenNode = function(_trid, _open) {
    if (_open === 'N') { // 隐藏子节点
      __root.find('#' + _trid).find('img[folder=\'Y\']').attr('src', folderCloseIcon);
      __root.find('tr[id^=' + _trid + '_]').css('display', 'none');
    } else { // 显示子节点
      __root.find('#' + _trid).find('img[folder=\'Y\']').attr('src', folderOpenIcon);
      showSubs(_trid);
    }
  };

	// 递归检查下一级节点是否需要显示
  let showSubs = function(_trid) {
	// 	var isOpen = __root.find("#" + _trid).attr("open");
    var isOpen = __root.find('#' + _trid)[0].getAttribute('open');
    if (isOpen === 'Y') {
      var trs = __root.find('tr[pid=' + _trid + ']');
      trs.css('display', '');

      for (var i = 0; i < trs.length; i++) {
        showSubs(trs[i].id);
      }
    }
  };

	// 展开或收起所有节点
  this.expandAll = function(isOpen) {
    var trs = __root.find('tr[pid=\'\']');
    for (var i = 0; i < trs.length; i++) {
      var trid = trs[i].id || trs[i].getAttribute('id');
      showHiddenNode(trid, isOpen);
    }
  };

	// 取得当前选中的行记录
  this.getSelectedItem = function() {
    return new TreeGridItem(__root, __selectedId, __selectedIndex, TreeGrid.str2json(__selectedData));
  };
};

// 公共静态变量
TreeGrid.FOLDER_OPEN_ICON = 'images/folderOpen.gif';
TreeGrid.FOLDER_CLOSE_ICON = 'images/folderClose.gif';
TreeGrid.DEFAULT_LEAF_ICON = 'images/defaultLeaf.gif';
TreeGrid.COUNT = 1;

// 将json对象转换成字符串
TreeGrid.json2str = function(obj) {
  var arr = [];

  var fmt = function(s) {
    if (typeof s === 'object' && s != null) {
      if (s.length) {
        var _substr = '';
        for (var x = 0; x < s.length; x++) {
          if (x > 0) _substr += ', ';
          _substr += TreeGrid.json2str(s[x]);
        }
        return '[' + _substr + ']';
      } else {
        return TreeGrid.json2str(s);
      }
    }
    return /^(string|number)$/.test(typeof s) ? '\'' + s + '\'' : s;
  };

  for (var i in obj) {
    if (typeof obj[i] !== 'object') { // 暂时不包括子数据
      arr.push(i + ':' + fmt(obj[i]));
    }
  }

  return '{' + arr.join(', ') + '}';
};

TreeGrid.str2json = function(s) {
  var json = null;
  var explorer = navigator.userAgent;
  if (explorer.indexOf('MSIE') >= 0) {
	    json = eval('(' + s + ')');
  }	else {
	    json = new Function('return ' + s)();
  }
  return json;
// 	if(jQuery.browser.msie){
// 		json = eval("(" + s + ")");
// 	}else{
// 		json = new Function("return " + s)();
// 	}
// 	return json;
};

// 数据行对象
function TreeGridItem(_root, _rowId, _rowIndex, _rowData) {
  var __root = _root;

  this.id = _rowId;
  this.index = _rowIndex;
  this.data = _rowData;

  this.getParent = function() {
    var pid = jQuery('#' + this.id).attr('pid');
    if (pid != '') {
      var rowIndex = jQuery('#' + pid).attr('rowIndex');
      var data = jQuery('#' + pid).attr('data');
      return new TreeGridItem(_root, pid, rowIndex, TreeGrid.str2json(data));
    }
    return null;
  };

  this.getChildren = function() {
    var arr = [];
    var trs = jQuery(__root).find('tr[pid=\'' + this.id + '\']');
    for (var i = 0; i < trs.length; i++) {
      var tr = trs[i];
      arr.push(new TreeGridItem(__root, tr.id, tr.rowIndex, TreeGrid.str2json(tr.data)));
    }
    return arr;
  };
};
//  回掉方法例子
/*
	单击数据行后触发该事件
	id：行的id
	index：行的索引。
	data：json格式的行数据对象。
*/
function itemClickEvent(id, index, data) {
  jQuery('#currentRow').val(id + ', ' + index + ', ' + TreeGrid.json2str(data));
	//  _config.rowClickCallback();
}
/*
	通过指定的方法来自定义栏数据
*/
function customCheckBox(row, col) {
  return '<input type=\'checkbox\'>';
}
function customOrgName(row, col) {
  var name = row[col.dataField] || '';
  return name;
}
function customLook(row, col) {
  return '<a href=\'javascript:(0)\' style=\'color:blue;\'>查看</a>';
}
/*
	展开、关闭所有节点。
	isOpen=Y表示展开，isOpen=N表示关闭
*/
function expandAll(isOpen) {
  treeGrid.expandAll(isOpen);
}
/*
	取得当前选中的行，方法返回TreeGridItem对象
*/
function selectedItem() {
  var treeGridItem = treeGrid.getSelectedItem();
  if (treeGridItem != null) {
		// 获取数据行属性值
		// alert(treeGridItem.id + ", " + treeGridItem.index + ", " + treeGridItem.data.name);
		// 获取父数据行
    var parent = treeGridItem.getParent();
    if (parent != null) {
			// jQuery("#currentRow").val(parent.data.name);
    }
		// 获取子数据行集
    var children = treeGridItem.getChildren();
    if (children != null && children.length > 0) {
      jQuery('#currentRow').val(children[0].data.name);
    }
  }
}
export default TreeGrid;
