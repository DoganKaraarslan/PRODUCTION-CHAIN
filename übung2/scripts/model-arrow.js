var arrow_index = 0;
/**
 * A class representing one arrow
 *
 * @param {Diagram} diagram The diagram on which this arrow is shown
 * @param {Device} startDevice The start node for this arrow
 * @class
 */
function Arrow(diagram, startDevice) {
    "use strict";
    const _this = this;

    /**
     * The start node for this arrow
     * @member {Device}
     */
    this.startDevice = startDevice;

    /**
     * The (optional) end node for this arrow
     * @member {?Device}
     */
    this.endDevice = null;

    this.id = 'arrow' + (++arrow_index);

    /**
     * The jQuery DOM object representing this arrow
     */
    const object = $(
        // TODO arrow: create jQuery object for the SVG path
        "<div id='"+_this.id+"'style='height: inherit; width:inherit; display: inline; position: absolute;'><svg width='100%' height='100%'>"+$(".arrow-image svg").html()+"</svg></div>"
    );

    // TODO arrow: add variables if necessary

    // TODO arrow: append the arrow DOM object to the arrows svg
    object.insertBefore($("#diagram .arrows #svg_marker"));

    // Initialize the event handlers
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO arrow: attach events for functionality like in assignment-document described

        // TODO arrow optional: attach events for bonus points for 'TAB' to switch between arrows and to select arrow
    }

    /**
     * Add this arrow to the end nodes, if not yet present
     * @returns {boolean} True if the arrow was added, false if it was already present
     */
    function add() {
        if (!_this.endDevice || _this.endDevice === _this.startDevice || _this.startDevice.isConnectedTo(_this.endDevice)) {
            return false;
        }

        _this.startDevice.addArrowOut(_this);
        _this.endDevice.addArrowIn(_this);
        object.addClass("arrow-path-added");
        return true;
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO arrow: set/remove active class of arrow
    }

    /**
     * Update the end position of the arrow path
     * @param {number[]} endPosition New end position of the arrow
     */
    function updateEndPosition(endPosition) {
        // TODO arrow: draw an arrow between the start device and the given end position
        // HINT You can use Device.getIntersectionCoordinates to calculate the coordinates for the start device

        var end_x = endPosition[0] - diagram.area.offset().left;
        var end_y = endPosition[1] - diagram.area.offset().top;
        var start_coords = startDevice.getIntersectionCoordinates([end_x, end_y]);
        $("#"+_this.id).contents().find("path").attr("d","M"+start_coords[0]+","+start_coords[1]+ " L" + end_x + "," + end_y);
    }

    /**
     * Update the arrow path according to the device positions, or hide the path if no end device is set
     */
    function updateArrow() {
        // TODO arrow: draw an arrow between the start and end device
        // HINT You can use Device.getCenterCoordinates and Device.getIntersectionCoordinates
        if(add()){
          var start_coords = startDevice.getIntersectionCoordinates(_this.endDevice.getCenterCoordinates());
          var end_coords = _this.endDevice.getIntersectionCoordinates(startDevice.getCenterCoordinates());
          $("#"+_this.id).contents().find("path").attr("d","M"+start_coords[0]+","+start_coords[1]+ " L" + end_coords[0] + "," + end_coords[1]);
        }else{
          deleteArrow();
        }
    }

    /**
     * Set the end device for this arrow
     * @param {Device} device The device to use as endpoint
     */
    function setEndDevice(device) {
        _this.endDevice = device;
        updateArrow();
    }

    /**
     * Remove this arrow from the DOM and its devices
     */
    function deleteArrow() {
        // TODO arrow: delete arrow from HTML DOM and from the devices of the endpoints of the arrow
        $("#"+_this.id).remove();
    }

    // Export some of the methods
    this.add = add;
    this.setActive = setActive;
    this.updateEndPosition = updateEndPosition;
    this.updateArrow = updateArrow;
    this.setEndDevice = setEndDevice;
    this.deleteArrow = deleteArrow;
}
