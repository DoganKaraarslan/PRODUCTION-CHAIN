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
    var start_coords = startDevice.getCenterCoordinates();

    /**
     * The jQuery DOM object representing this arrow
     */
    const object = $(
        // TODO arrow: create jQuery object for the SVG path
        '<svg id="'+_this.id+'"><path class="arrow-path" d="M"'+start_coords[0]+','+start_coords[1]+' L'+start_coords[0] +','+start_coords[1]+'"></path></svg>'
    );

    // TODO arrow: add variables if necessary
    var active = false;

    // TODO arrow: append the arrow DOM object to the arrows svg
    diagram.arrows.append(object);

    // Initialize the event handlers
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO arrow: attach events for functionality like in assignment-document described
        $("#"+_this.id).click(function(event){
          diagram.selectArrow(_this);
        });

        // TODO arrow optional: attach events for bonus points for 'TAB' to switch between arrows and to select arrow
        $("#"+_this.id).contents().attr("tabindex","0");
        $("#"+_this.id).keydown(function(event){
          if(event.which == "13"){
            diagram.selectArrow(_this);
          }
        })
    }

    /**
     * Add this arrow to the end nodes, if not yet present
     * @returns {boolean} True if the arrow was added, false if it was already present
     */
    function add() {
        if (!_this.endDevice || _this.endDevice === _this.startDevice) {
            return false;
        }

        if (_this.startDevice.isConnectedTo(_this.endDevice)){
            return true;
        }

        _this.startDevice.addArrowOut(_this);
        _this.endDevice.addArrowIn(_this);
        object.contents().addClass("arrow-path-added");
        return true;
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO arrow: set/remove active class of arrow

        if(active){
          $("#"+_this.id).contents().addClass("active");
          $("#"+_this.id).contents().attr("style", "outline: 2px solid #add8e6")
        }else{
          $("#"+_this.id).contents().removeClass("active");
          $("#"+_this.id).contents().attr("style", "outline: none")
        }
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
        $("#"+_this.id).contents().attr("d","M"+start_coords[0]+","+start_coords[1]+ " L" + end_x + "," + end_y);
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
          $("#"+_this.id).contents().attr("d","M"+start_coords[0]+","+start_coords[1]+ " L" + (end_coords[0]-5) + "," + end_coords[1]);
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
        diagram.addArrow();
    }

    /**
     * Remove this arrow from the DOM and its devices
     */
    function deleteArrow() {
        // TODO arrow: delete arrow from HTML DOM and from the devices of the endpoints of the arrow
        startDevice.deleteArrow(_this);
        if(_this.endDevice != undefined){
            _this.endDevice.deleteArrow(_this);
        }
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
