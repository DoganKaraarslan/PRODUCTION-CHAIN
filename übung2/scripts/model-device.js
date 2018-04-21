/**
 * Function called for updating the image of this device
 *
 * @callback updateFunction
 * @param {jQuery} object The jQuery DOM node for this device
 * @param min The minimum value for the device
 * @param max The maximum value for the device
 * @param value The new value for the device
 */

/**
 * A class representing one device
 *
 * @param {Diagram} diagram The diagram on which this device is shown
 * @param {number} index The index of this device
 * @param {number[]} position The x and y coordinates of this device, relative to the diagram
 * @param {string} type The type of this device
 * @param {string} title The title of this device
 * @param {?number} min The minimum value for this device
 * @param {?number} max The maximum value for this device
 * @param {string} image The image definition for this device
 * @param {updateFunction} updateFunction
 * @class
 */
function Device(diagram, index, position, type, title, min, max, image, updateFunction) {
    "use strict";
    const _this = this;

    /**
     * The index of this device
     * @member {number}
     * @const
     */
    this.index = index;

    /**
     * The type of this device
     * @member {string}
     * @const
     */
    this.type = type;

    /**
     * The title of this device
     * @member {string}
     * @const
     */
    this.title = title;

    /**
     * A list of incoming arrows
     * @member {Arrow[]}
     */
    let arrowsIn = [];

    /**
     * A list of outgoing arrows
     * @member {Arrow[]}
     */
    let arrowsOut = [];

    /**
     * The jQuery DOM object representing this device
     */
    const object = $(
        // TODO device: create html container
        "<li id='"+title+"' style='width: 100px; position: absolute; left:"+ position[0] +"; top: " +position[1]+"; cursor: pointer;'>" + images[image] + "</li>"
    );

    // TODO device: add variables if necessary

    // TODO device: append the device DOM object to the diagram area
    diagram.devices.append(object);

    // TODO device: initialize the device position
    $("#"+title).css({
      left: position[0],
      top: position[1]
    });

    // Initialize the event handlers
    attachEventHandlers();

    /**
     * Add the event handlers for the diagram
     */
    function attachEventHandlers() {
        // TODO device: attach context menu to device (call showContextMenu() in model-diagram.js if context menu is called)
        $("#"+title).contextmenu(function(ev){
          diagram.showContextMenu(_this, ev);
        });
        // TODO device: attach events for functionality like in assignment-document described
        $("#"+title).mousedown(function(event){
          return false;
        });
        $("#"+title).click(function(event){
          diagram.deviceMouseDown(_this);
        });

        $("#"+title).dblclick(function(event) {
          alert("Ausgewähltes Gerät: "+ title);
        });

        var x = $("#arrow-device-add-reference").clone();
        x.attr("id", "arrow-symbol-"+ title);
        $("#"+title).append(x);
        $("#"+title).hover(function(event){
          x.attr("style", "display: block;");
        }, function(event){
          x.attr("style", "display: none;");
        });
        x.click(function(event){
          diagram.activateArrowDrawing();
        });

        $("#"+title).removeClass('ui-draggable-dragging');

        // TODO device: attach drag & drop functionality
        $("#"+title).draggable({
          containment: diagram.area,
          drag: function(event){
              moveDevice();
          }
        });

        // TODO device optional: attach events for bonus points for 'Tab' and 'Enter'
    }

    /**
     * Mark this device as active or inactive
     * @param {boolean} active
     */
    function setActive(active) {
        // TODO device: set/remove active class of device
        if(active){
          $("#"+title).addClass("device");
          $("#"+title).addClass("active");
        }else{
          $("#"+title).removeClass("device");
          $("#"+title).removeClass("active");
        }
    }

    /**
     * Update the list of predecessors in the DOM
     */
    function updatePredecessors() {
        // TODO device: update predecessors in overview.html of device like in UE1
    }

    /**
     * Update the list of successors in the DOM
     */
    function updateSuccessors() {
        // TODO device: update successors in overview.html of device like in UE1
    }

    /**
     * Update the position of all connected arrows
     */
    function moveDevice() {
        // TODO device: update endpoints of arrows
        // HINT You can use Arrow.updateArrow()
        arrowsIn.forEach(function(arrow){
            arrow.updateArrow();
        });
        arrowsOut.forEach(function(arrow){
            arrow.updateArrow();
        });
    }

    /**
     * Determines if a direct connection to the given device already exists
     * @param {Device} device The target device
     * @returns {boolean} True iff there exists a direct arrow in either direction
     */
    function isConnectedTo(device) {
        return arrowsOut.some(arrow => arrow.endDevice === device)
            || arrowsIn.some(arrow => arrow.startDevice === device);
    }

    /**
     * Update the image for the given value
     * @param value The new value
     */
    function updateDevice(value) {
        if (updateFunction) {
            updateFunction(object, min, max, value);
        }
    }

    /**
     * Add an incoming arrow to the device
     * @param {Arrow} arrow The arrow for which this device is the end node
     */
    function addArrowIn(arrow) {
        arrowsIn.push(arrow);
        updatePredecessors();
    }

    /**
     * Add an outgoing arrow to the device
     * @param {Arrow} arrow The arrow for which this device is the start node
     */
    function addArrowOut(arrow) {
        arrowsOut.push(arrow);
        updateSuccessors();
    }

    /**
     * Delete this device and all connected arrows
     * @return {number} The number of deleted arrows
     *                  - use this number for updating counter in diagram
     */
    function deleteDevice() {
        // TODO device: delete device from HTML DOM and delete connected arrows
        $("#"+title).remove();
        let deletedArrows = 0;
        return deletedArrows;
    }

    /**
     * Remove the given arrow from the list of arrows
     * @param {Arrow} arrow The arrow to remove
     */
    function deleteArrow(arrow) {
        // TODO device: delete arrow from arrowsIn/arrowsOut and update predecessors and successors
    }

    /**
     * Get the coordinates of the center of this device
     * @returns {number[]} A two-element array containing the center in the order [left, top]
     */
    function getCenterCoordinates() {
        return [object[0].offsetLeft + object.width() / 2, object[0].offsetTop + object.height() / 2];
    }

    /**
     * Get the coordinates of this device
     * @param {number[]} targetPosition An two-element array containing the target coordinates of a line
     * @returns {number[]} A two-element array containing the point on the border closest to the target
     */
    function getIntersectionCoordinates(targetPosition) {
        // Determine the center of the device
        const width = object.width() * 0.58,
            height = object.height() * 0.58,
            center = getCenterCoordinates(),
            x = center[0],
            y = center[1],
            dx = targetPosition[0] - x,
            dy = targetPosition[1] - y;

        if (dx === 0) {
            // Vertical arrow
            return [x, y + Math.sign(dy) * height];
        }

        const slope = dy / dx;
        if (Math.abs(slope) * width >= height) {
            // Arrow intersects the top or bottom border
            return [x + Math.sign(dy) * height / slope, y + Math.sign(dy) * height]
        } else {
            // Arrow intersects the left or right border
            return [x + Math.sign(dx) * width, y + Math.sign(dx) * width * slope];
        }
    }

    // Export some of the methods
    this.setActive = setActive;
    this.updateDevice = updateDevice;
    this.getIntersectionCoordinates = getIntersectionCoordinates;
    this.isConnectedTo = isConnectedTo;
    this.addArrowIn = addArrowIn;
    this.addArrowOut = addArrowOut;
    this.deleteArrow = deleteArrow;
    this.deleteDevice = deleteDevice;
    this.getCenterCoordinates = getCenterCoordinates;
}
