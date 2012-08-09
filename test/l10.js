// require d3.v2.js

var xBreak = 500
var yBreak = 1000
var yFactor = 10
var currentNode
var currentLevel = 0
var xmlns="http://www.w3.org/2000/svg"
var Root=document.documentElement


// update the status line

function showStatus(target) {
    var node = d3.select(target)
    var statusText = d3.select("#statusText")
    statusText.selectAll("text").remove()
    statusText.text(node.attr("id") + " " + node.attr("class"))
}

// highlight the Nth outer node of the targeted terminal node

function selectNode(target) {
  var str = ""
  if (target==currentNode) {
    currentLevel++
  }
  else {
    currentLevel = 0
    currentNode = target
  }
  var n = 0
  while ("class" in target.attributes) {
    if (n != currentLevel) {
      target = target.parentNode; n++
      continue
    }
    drawBorder(target)
    showStatus(target)
    if (n == currentLevel) {
      break
    }
  }
}

function drawBorder(target){
    var node = d3.select(target)
    var x0 = +node.attr("xStart")
    var y0 = +node.attr("yStart")
    var x1 = +node.attr("xStop")
    var y1 = +node.attr("yStop")

    // -- if crossing xBreak, then y0 = 0
    // -- if crossing line, then y0(x) = y0(x0) + 1
    // -- and, y1(x)

    var xMin, xMax

    var range = function () {
	// multiline
	if (y1-y0 > yFactor || Math.floor(x0/xBreak) < Math.floor(x1/xBreak)) {
	    xMin = Math.floor(x0/xBreak) * xBreak
	    xMax = (Math.floor((x1)/xBreak) + 1) * xBreak
	}
	else {
	    xMin = x0
	    xMax = x1
	}
	return xMax - xMin
    }

    var data = d3.range(range())
	.map(function(i) {
	    return {x: xMin+i, y0: y0, y1: y1}
	})

    var area = d3.svg.area()
	.x(function(d) { return d.x })
	.y0(function(d) {
	    if (d.x < x0) {
		return y0
	    }
	    else if (Math.floor(d.x/xBreak) > Math.floor(x0/xBreak)) {
		return 0
	    }
	    else {
		return y0 - yFactor
	    }
	})
	.y1(function(d) {
	    if (Math.floor(d.x/xBreak) < Math.floor(x1/xBreak)) {
		return yBreak
	    }
	    if (d.x > x1) {
		return y1 - yFactor
	    }
	    else {
		return y1
	    }
	})

    // associate data with the root svg node
    var svg = d3.select("svg").datum(data)

    svg.select("path").remove()

    // insert path with shape derived from svg associated data
    svg.insert("path", ":first-child")
	.attr("d", area)
	.style("fill", "yellow")
	.style("fill-opacity", "0.5")

}

function getBorder(x0, y0, x1, y1) {
   var b = [ ]
   if (Math.floor((x1-1)/xBreak) - Math.floor((x0)/xBreak) > 0) {
       b.push([x0, y0, xBreak - x0 % xBreak, yBreak - y0])
       b.push([Math.floor(x1/xBreak)*xBreak, 0, xBreak, y1])
       if (Math.floor(x1/xBreak) - Math.floor(x0/xBreak) > 2) {
           b.push([x0+xBreak-x0%xBreak, 0, Math.floor(x1/xBreak)*xBreak-(x0+xBreak-x0%xBreak), yBreak])
       }
   }
   else {
       b.push([x0, y0, x1-x0, y1-y0])
   }
   return b
}

function init(node) {
    $.getJSON("todos.js.notes", function(data) {
    })
}

function drawDot(node) {
   var attrs = node.attributes
   var dot = document.createElementNS(xmlns, "circle")
   dot.setAttributeNS(null, "cx", attrs.xStart.value)
   dot.setAttributeNS(null, "cy", attrs.yStart.value)
   dot.setAttributeNS(null, "r", "10")
   dot.setAttributeNS(null,"fill", "red")
   dot.setAttributeNS(null,"fill-opacity", "0.99")
   Root.appendChild(dot)
}

