L.DivIcon.SVGIcon.RhombusIcon = L.DivIcon.SVGIcon.extend({
    initialize: function(options) {
        options = L.Util.setOptions(this, options)
        options.circleAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.y)/2)
        L.DivIcon.SVGIcon.prototype.initialize.call(this, options)

        return options
    },
    _createPathDescription: function() {
        var height = Number(this.options.iconSize.y)
        var width = Number(this.options.iconSize.x)
        var weight = Number(this.options.weight)
        var margin = weight 

        var startPoint = "M " + margin + " " + (height/2) + " "
        var bottomLeftLine = "L " + (width/2) + " " + (height - margin) + " "
        var bottomRightLine = "L " + (width - margin) + " " + (height/2) + " "
        var topLeftLine = "L " + (width/2) + " " + margin + " Z"

        var d = startPoint + bottomLeftLine + bottomRightLine + topLeftLine

        return d
    },
    _createText: function() {
        var fontSize = this.options.fontSize + "px"
        var fontWeight = this.options.fontWeight
        var lineHeight = Number(this.options.fontSize)

        var x = Number(this.options.iconSize.x) / 2
        var y = Number(this.options.iconSize.y)/ 2
        var circleText = this.options.circleText
        var textColor = this.options.fontColor.replace("rgb(", "rgba(").replace(")", "," + this.options.fontOpacity + ")")

        var text = '<text text-anchor="middle" x="' + x + '" y="' + y + '" style="font-size: ' + fontSize + '; font-weight: ' + fontWeight +'" fill="' + textColor + '">' + circleText + '</text>'

        return text
    }
})

L.divIcon.svgIcon.rhombusIcon = function(options) {
    return new L.DivIcon.SVGIcon.RhombusIcon(options)
}

L.Marker.SVGMarker.RhombusMarker = L.Marker.SVGMarker.extend({
    options: {
        "iconFactory": L.divIcon.svgIcon.rhombusIcon
    }
})

L.marker.svgMarker.rhombusMarker = function(latlng, options) {
    return new L.Marker.SVGMarker.RhombusMarker(latlng, options)
}

L.DivIcon.SVGIcon.WashingtonMonumentIcon = L.DivIcon.SVGIcon.extend({
    options: {
        "color": "rgb(100,100,100)",
        "iconSize": L.point(10, 112),
        "weight": 1
    },
    _createCircle: function() {
        return ""
    },
    _createPathDescription: function() {
        var height = Number(this.options.iconSize.y)
        var width = Number(this.options.iconSize.x)
        var weight = Number(this.options.weight)
        var margin = weight

        var mWidth = width - 2*margin
        var mHeight = height - 2*margin

        var startPoint = "M " + margin + " " + (mHeight + margin) + " "
        var bottom = "L " + (mWidth + margin) + " " + (mHeight + margin) + " "
        var right = "L " + (0.8*mWidth + margin) + " " + (0.1*mHeight + margin) + " "
        var topRight = "L " + (width / 2) + " " + margin + " "
        var topLeft = "L " + (0.2*mWidth + margin) + " " + (0.1*mHeight + margin) + " "
        var left = "Z"

        var d = startPoint + bottom + right + topRight + topLeft + left
        return d
    },
    _createText: function() {
        return ""
    }
})

L.divIcon.svgIcon.washingtonMonumentIcon = function(options) {
    return new L.DivIcon.SVGIcon.WashingtonMonumentIcon(options)
}