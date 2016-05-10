function myAddEvent(obj, sEv, fn)
{
	if(obj.attchEvent)
	{
		obj.attchEvent("on" + sEv, function(){
			fn.cell(obj);	
		});
	}	
	else
	{
		obj.addEventListener(sEv, fn, false);	
	}
}
function getByClass(oParent, sClass)
{
	var aEls = oParent.getElementsByTagName("*");
	var aResul t= [];
	for(var i = 0; i < aEls.length; i++)
	{
		if(aEls[i].className == sClass)
		{
			aResult.push(aEls[i]);
		}	
	}
	return aResult;
}
function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return 	obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, attr, false);	
	}
}
function getIndex(obj)
{
	var aBrother = 	obj.parentNode.children;
	for(var i = 0; i < aBrother.length; i++)
	{
		if(aBrother[i] == obj)
		{
			return i
		}
	}
}

function Vjquery(vArg)
{
	this.elements = [];//保存选中的元素
	switch(typeof vArg)
	{
		case "function":
			myAddEvent(window, 'load', vArg);
			break;
		case "string":
			switch(vArg.charAt(0))
			{
				case "#":
					var obj = document.getElementById(vArg.substring(1));
					this.elements.push(obj);
					break;
				case ".":
					this.elements = getByClass(document, vArg.substring(1));
					break;
				default:	
					this.elements = document.getElementsByTagName(vArg);
			}
			break;
		case "object":
			this.elements.push(vArg);
	}
}
Vjquery.prototype.index = function()
{
	return 	getIndex(this.elements[0]);
}
Vjquery.prototype.find = function(str)
{
	var aResult = [];
	for(var i = 0; i < this.elements.length; i++)
	{
		switch(str.charAt(0))
		{
			case ".":
				var aEle = getStyle(this.elements[i], str.substring(1));
				aResult = aResult.push(aEle);
				break;
			default:
				var aEle = this.elements[i].getElementsByTagName(str);
				aResult = aResult.push(aEle);
		}	
	}
	var newVjquery = $();
	newVjquery.elements = aResult;
	return newVjquery;
}
Vjquery.prototype.eq = function(n)
{
	return $(this.elements[n]);
}
Vjquery.prototype.toggle = function()
{
	var _arguments = arguments;
	for(var i = 0; i < this.elements.length; i++)
	{
		addToggle(this.elements[i]);
	}
	function addToggle(obj)
	{
		var cont = 0;	
		myAddEvent(obj, "click", function(){
			_arguments[cont++ % _arguments.length].call(obj);	
		})
	}
}
Vjquery.prototype.attr = function(attr, value)
{
	if(arguments.length == 2)
	{
		for(var i = 0; i < this.elements.length; i++)
		{
			this.elements[i][attr] = value;
		}	
	}
	else
	{
		return this.elements[0][attr];
	}		
}
Vjquery.prototype.css = function(attr, value)
{
	if(arguments.length == 2)
	{
		for(var i = 0; i < this.elements.length; i++)
		{
			this.elements[i].style[attr] = value;
		}	
	}
	else
	{
		return getStyle(this.elements[0], attr);
	}	
}
Vjquery.prototype.hover = function(fn1, fn2)
{
	for(var i = 0; i < this.elements.length; i++)
	{
		myAddEvent(this.elements[i], "mouseover", fn1);
		myAddEvent(this.elements[i], "mouseout", fn2);
	}
}
Vjquery.prototype.hide = function()
{
	for(var i = 0; i < this.elements.length; i++)
	{
		this.elements[i].style.display = "none";
	}
}
Vjquery.prototype.show = function()
{
	for(var i = 0; i < this.elements.length; i++)
	{
		this.elements[i].style.display = "block";
	}
}
Vjquery.prototype.click = function(fn)
{
	for(var i = 0; i < this.elements.length; i++)
	{
		myAddEvent(this.elements[i], 'click', fn);
	}	
}
function $(vArg)
{
	return new	Vjquery(vArg);
}