//Leaflet-SVGIcon
//SVG icon for any marker class
//Ilya Atkin
//ilya.atkin@unh.edu

L.DivIcon.SVGIcon = L.DivIcon.extend({
    options: {
        "circleText": "",
        "className": "svg-icon",
        "circleAnchor": null, //defaults to [iconSize.x/2, iconSize.x/2]
        "circleColor": null, //defaults to color
        "circleOpacity": null, // defaults to opacity
        "circleFillColor": "rgb(255,255,255)",
        "circleFillOpacity": null, //default to opacity 
        "circleRatio": 0.5,
        "circleWeight": null, //defaults to weight
        "color": "rgb(0,102,255)",
        "fillColor": null, // defaults to color
        "fillOpacity": 0.4,
        "fontColor": "rgb(0, 0, 0)",
        "fontOpacity": "1",
        "fontSize": null, // defaults to iconSize.x/4
        "fontWeight": "normal",
        "iconAnchor": null, //defaults to [iconSize.x/2, iconSize.y] (point tip)
        "iconSize": L.point(32,48),
        "opacity": 1,
        "popupAnchor": null,
        "rotateAngle": 0,
        "shadowAngle": 45,
        "shadowBlur": 1,
        "shadowColor": "rgb(0,0,10)",
        "shadowEnable": false,
        "shadowLength": .75,
        "shadowOpacity": 0.5,
        "shadowTranslate": L.point(0,0),
        "weight": 2
    },
    initialize: function(options) {
        options = L.Util.setOptions(this, options)
        
        //iconSize needs to be converted to a Point object if it is not passed as one
        options.iconSize = L.point(options.iconSize)

        //in addition to setting option dependant defaults, Point-based options are converted to Point objects
        if (!options.circleAnchor) {
            if (Number(options.rotateAngle) === 0 && Number(options.shadowAngle) <= 180) {
                options.circleAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.x)/2)
            } else {
                var radius  = Number(options.iconSize.y) - Number(options.iconSize.x) / 2
                // X = Cx + (r * cosine(degrees * pi / 180))
                var circleX = Number(options.iconSize.x) * 1.5 + (radius * (Math.cos((options.rotateAngle - 90) * Math.PI / 180)))
                // Y = Cy + (r * sine(degrees * pi / 180))
                var circleY = Number(options.iconSize.y) + (radius * (Math.sin((options.rotateAngle - 90) * Math.PI / 180)))
                options.circleAnchor = L.point(circleX, circleY)
            }
        }
        else {
            options.circleAnchor = L.point(options.circleAnchor)
        }
        if (!options.circleColor) {
            options.circleColor = options.color
        }
        if (!options.circleFillOpacity) {
            options.circleFillOpacity = options.opacity
        }
        if (!options.circleOpacity) {
            options.circleOpacity = options.opacity
        }
        if (!options.circleWeight) {
            options.circleWeight = options.weight
        }
        if (!options.fillColor) { 
            options.fillColor = options.color
        }
        if (!options.fontSize) {
            options.fontSize = Number(options.iconSize.x/4) 
        }
        if (!options.iconAnchor) {
            if (Number(options.rotateAngle) === 0 && Number(options.shadowAngle) <= 180) {
                options.iconAnchor = L.point(Number(options.iconSize.x)/2, Number(options.iconSize.y))
            } else {
                options.iconAnchor = L.point(Number(options.iconSize.x) * 1.5, Number(options.iconSize.y))
            }
        }
        else {
            options.iconAnchor = L.point(options.iconAnchor)
        }
        if (!options.popupAnchor) {
            options.popupAnchor = L.point(0, (-0.75)*(options.iconSize.y))
        }
        else {
            options.popupAnchor = L.point(options.popupAnchor)
        }

        options.html = this._createSVG()
    },
    _createCircle: function() {
        var cx = Number(this.options.circleAnchor.x)
        var cy = Number(this.options.circleAnchor.y)
        var radius = this.options.iconSize.x/2 * Number(this.options.circleRatio)
        var fill = this.options.circleFillColor
        var fillOpacity = this.options.circleFillOpacity
        var stroke = this.options.circleColor
        var strokeOpacity = this.options.circleOpacity
        var strokeWidth = this.options.circleWeight
        var className = this.options.className + "-circle"        
       
        var circle = '<circle class="' + className + '" cx="' + cx + '" cy="' + cy + '" r="' + radius +
            '" fill="' + fill + '" fill-opacity="'+ fillOpacity + 
            '" stroke="' + stroke + '" stroke-opacity=' + strokeOpacity + '" stroke-width="' + strokeWidth + '"/>'
        
        return circle
    },
    _createPathDescription: function() {
        var height = Number(this.options.iconSize.y)
        var width = Number(this.options.iconSize.x)
        var startX = 0
        if (Number(this.options.rotateAngle) !== 0 || Number(this.options.shadowAngle) > 180) {
            startX = width
        }
        var weight = Number(this.options.weight)
        var margin = weight / 2

        var startPoint = "M " + (startX + margin) + " " + (width/2) + " "
        var leftLine = "L " + (startX + width/2) + " " + (height - weight) + " "
        var rightLine = "L " + (startX + width - margin) + " " + (width/2) + " "
        var arc = "A " + (width/4) + " " + (width/4) + " 0 0 0 " + (startX + margin) + " " + (width/2) + " Z"

        var d = startPoint + leftLine + rightLine + arc

        return d
    },
    _createPath: function() {
        var pathDescription = this._createPathDescription()
        var strokeWidth = this.options.weight
        var stroke = this.options.color
        var strokeOpacity = this.options.opacity
        var fill = this.options.fillColor
        var fillOpacity = this.options.fillOpacity
        var className = this.options.className + "-path"

        var rotate = ''
        if (Number(this.options.rotateAngle) != 0 || Number(this.options.shadowAngle) > 180) {
            var origin = (this.options.iconAnchor.x) + "px " + (this.options.iconAnchor.y) + "px"
            rotate = ' style="transform-origin: ' + origin + '; transform: rotate(' + this.options.rotateAngle + 'deg)"'
        }
        var path = '<path class="' + className + '" d="' + pathDescription +
            '" stroke-width="' + strokeWidth + '" stroke="' + stroke + '" stroke-opacity="' + strokeOpacity +
            '" fill="' + fill + '" fill-opacity="' + fillOpacity + '"' + rotate + '/>'

        return path
    },
     _createShadow: function() {
         var pathDescription = this._createPathDescription()
         var strokeWidth = this.options.weight
         var stroke = this.options.shadowColor
         var fill = this.options.shadowColor
         var className = this.options.className + "-shadow"
 
         var origin = (this.options.iconAnchor.x) + "px " + (this.options.iconAnchor.y) + "px"
         var rotation = this.options.shadowAngle
         var height = this.options.shadowLength
         var opacity = this.options.shadowOpacity
         var blur = this.options.shadowBlur
         var translate = this.options.shadowTranslate.x + "px, " + this.options.shadowTranslate.y + "px"
 
         var blurFilter = "<filter id='iconShadowBlur'><feGaussianBlur in='SourceGraphic' stdDeviation='" + blur + "'/></filter>"
 
         var shadow = '<path filter="url(#iconShadowBlur") class="' + className + '" d="' + pathDescription +
             '" fill="' + fill + '" stroke-width="' + strokeWidth + '" stroke="' + stroke +
             '" style="opacity: ' + opacity + '; ' + 'transform-origin: ' + origin +'; transform: rotate(' + rotation + 'deg) translate(' + translate + ') scale(1, '+ height +')' +
             '"/>'
 
         return blurFilter+shadow
     },
    _createSVG: function() {
        var path = this._createPath()
        var circle = this._createCircle()
        var text = this._createText()
        var shadow = this.options.shadowEnable ? this._createShadow() : ""
        var className = this.options.className + "-svg"
        var width = this.options.iconSize.x 
        var height = this.options.iconSize.y
             
        if (this.options.shadowEnable) {
            width += this.options.iconSize.y * this.options.shadowLength - (this.options.iconSize.x / 2)
            width = Math.max(width, 32)
            height += this.options.iconSize.y * this.options.shadowLength
        }        

        if (Number(this.options.rotateAngle) != 0 || Number(this.options.shadowAngle) > 180) {
            // make sure we have enough space to rotate the marker
            width = Math.max(this.options.iconSize.x * 2, this.options.iconSize.y * 2)
            height = width
        }

        var style = "width:" + width + "px; height:" + height +"px; "
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="' + className + '" style="' + style + '">' + shadow + path + circle + text + '</svg>'

        return svg
    },
    _createText: function() {
        var fontSize = this.options.fontSize + "px"
        var fontWeight = this.options.fontWeight
        var lineHeight = Number(this.options.fontSize)

        var x = this.options.circleAnchor.x
        var y = this.options.circleAnchor.y + (lineHeight * 0.35) //35% was found experimentally 
        var circleText = this.options.circleText
        var textColor = this.options.fontColor.replace("rgb(", "rgba(").replace(")", "," + this.options.fontOpacity + ")")

        var text = '<text text-anchor="middle" x="' + x + '" y="' + y + '" style="font-size: ' + fontSize + '; font-weight: ' + fontWeight +'" fill="' + textColor + '">' + circleText + '</text>'

        return text
    }
})

L.divIcon.svgIcon = function(options) {
    return new L.DivIcon.SVGIcon(options)
}

L.Marker.SVGMarker = L.Marker.extend({
    options: {
        "iconFactory": L.divIcon.svgIcon,
        "iconOptions": {}
    },
    initialize: function(latlng, options) {
        options = L.Util.setOptions(this, options)
        options.icon = options.iconFactory(options.iconOptions)
        this._latlng = latlng
    },
    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map)
    },
    setStyle: function(style) {
        if (this._icon) {
            var svg = this._icon.children[0]
            var iconBody = this._icon.children[0].children[0]
            var iconCircle = this._icon.children[0].children[1]

            if (style.color && !style.iconOptions) {
                var stroke = style.color.replace("rgb","rgba").replace(")", ","+this.options.icon.options.opacity+")")
                var fill = style.color.replace("rgb","rgba").replace(")", ","+this.options.icon.options.fillOpacity+")")
                iconBody.setAttribute("stroke", stroke)
                iconBody.setAttribute("fill", fill)
                iconCircle.setAttribute("stroke", stroke)

                this.options.icon.fillColor = fill
                this.options.icon.color = stroke
                this.options.icon.circleColor = stroke
            }
            if (style.opacity) {
                this.setOpacity(style.opacity)
            }
            if (style.iconOptions) {
                if (style.color) { style.iconOptions.color = style.color }
                var iconOptions = L.Util.setOptions(this.options.icon, style.iconOptions)
                this.setIcon(L.divIcon.svgIcon(iconOptions))
            }
        }
    }
})

L.marker.svgMarker = function(latlng, options) {
    return new L.Marker.SVGMarker(latlng, options)
}
