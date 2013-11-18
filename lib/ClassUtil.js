//----------------------------------------------------------------------------
// Bind the "this" of all functions of an object that are prefixed
// with "__" to the object as methods (without the "__" prefix)
//----------------------------------------------------------------------------
function bindFunctions(obj, bindObjAsFirstArgumentAlso)
{
	var m;
	for (var i in obj)
	{
		if ((typeof obj[i] == 'function') && (m = i.match(/^__(.*)$/)))
		{			
			obj[m[1]] = (bindObjAsFirstArgumentAlso === true) ? obj[i].bind(obj, obj) : obj[i].bind(obj);
		}
	}
}

//----------------------------------------------------------------------------
// Checks if an object has any properties
//----------------------------------------------------------------------------
function isEmptyObject(obj)
{
	// FROM: http://stackoverflow.com/a/679937
    for (var prop in obj)
    {
        if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
}

//----------------------------------------------------------------------------
// Merges many objects by creating a new object and then copying all
// properties over to the new object, in turn
//----------------------------------------------------------------------------
function mergeObjects(/* objects */)
{
	var obj = {};
	for (var i=0; arguments.length>i; i++)
	{
		var o = arguments[i];
		if (o != null)
		{
			for (var p in o)
			{
				obj[p] = o[p];
			}
		}
	}
	return obj;
}

function cloneObject(object)
{
	return JSON.parse(JSON.stringify(object));
}

function dotTraverseObject(object, path)
{
    var chunks = path.split(/\./);
    var cur = object;
    for (var i = 0; chunks.length > i; i++)
    {
        if (cur == null) throw new Error("Complete object path does not exist");
        cur = cur[chunks[i]];
    }
    return cur;
}

//----------------------------------------------------------------------------
// Exports
//----------------------------------------------------------------------------
module.exports =
{
	bindFunctions: bindFunctions,
	isEmptyObject: isEmptyObject,
	mergeObjects: mergeObjects,
	cloneObject: cloneObject,
    dotTraverseObject: dotTraverseObject
};