# Leaflet-SVGIcon
L.DivIcon.SVGIcon is a simple and customizable SVG marker icon with no external library or file dependencies. By default, 2 characters of text or about 3 numerals can fit inside the icon's inner circle making it suitable for use as a marker cluster icon.

Also included is L.Marker.SVGMarker, a small Marker wrapper class for SVGIcons with a setStyle implementation that handles marker opacity changes, monochromatic color changes and changes to specific icon options.

##Requirements
- Leaflet 0.7+ (earlier versions may work, but are untested) 
- Browser support for SVG

##Demo
*Forthcoming*

##Use
- Include the source file
````xml
<script src="svg-icon.js"></script>
````
- Use an SVGMarker
````js
var marker = new L.Marker.SVGMarker(latlng)
````
- Use any place Icons are accepted
````js
var marker = new L.Marker(latlng, { icon: new L.DivIcon.SVGIcon() })
````

##Properties
###L.DivIcon.SVGIcon

*All colors must be specified as either a hex triplet or as "rgb(...)". If "rgba(...)" is used, the alpha value is ignored,  and the value is converted to "rgb(...)" format.*

*Unspecific Icon options are ignored*

|Option|Type|Default|Description|
|------|----|-------|-----------|
|circleText|String|""|Text to include in the center of the icon|
|className|String|"svg-icon"|Class prefix to use for icon elements|
|circleColor|String|same as "color"|Color of the icon's inner circle border|
|circleOpacity|Number|same as "opacity"|Opacity of the icon's inner circle border|
|circleFillColor|String|"rgb(255,255,255)"|Color of the icon's inner circle interior|
|circleFillOpacity|Number|same as "opacity"|Opacity of the icon's inner circle interior|
|circleRatio|Number|0.5|Ratio of the width of the icon's inner circle to the width of the marker|
|circleWeight|Number|same as "weight"|Width of the icon's inner circle border|
|color|String|"rgb(0,102,255)"|Color of the icon's border|
|fillColor|String|same as "color"|Color of the icon's interior|
|fillOpacity|Number|0.4|Opacity of the icon's interior|
|fontColor|String|"rgb(0,0,0)"|Color of the icon's center text|
|fontOpacity|Number|1|Opacity of the icon's center text|
|fontSize|String|iconSize.x/4 + "px"|Font size of the icon's center text. Format as number+"px" e.g. "8px"|
|iconAnchor|Point|[iconSize.x/2, iconSize.y]|The point to align over the marker's geographic location|
|iconSize|Point|[32,48]|The size of the icon|
|opacity|Number|1|Opacity of the icon's border|
|popupAnchor|Point|[0,(-0.75)*iconSize.y|Point of origin for bound popups relative to the iconAnchor|

###L.Marker.SVGMarker

*All standard L.Marker options are supported.*

|Option|Type|Default|Description|
|------|----|-------|-----------|
|iconOptions|Dictionary|{}|A dictionary of icon options to pass|

##Methods
###L.DivIcon.SVGIcon
*No methods*
###L.Marker.SVGMarker

####setStyle(style)
This method supports three style values:
- opacity: Equivalent to using *setOpacity*
- color: Monochromatically sets the icon border color, interior color and inner circle border color
- iconOptions: A dictionary of specific icon options to change. These may be any SVGIcon option.

If "color" and "iconOptions" are specified, "iconOptions.color" is set to "color".

##Advanced customization
*Forthcoming*
