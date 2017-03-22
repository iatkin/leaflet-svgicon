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

L.Marker.SVGMarker.WashingtonMonumentMarker = L.Marker.SVGMarker.extend({
    options: {
        "iconFactory": L.divIcon.svgIcon.washingtonMonumentIcon
    }
})

L.marker.svgMarker.washingtonMonumentMarker = function(latlng, options) {
    return new L.Marker.SVGMarker.WashingtonMonumentMarker(latlng, options)
}
