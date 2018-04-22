const name = {
    'item-generator' : '3D-Drucker',
    'machine': 'Maschine',
    'conveyor': 'Förderband',
    'intelligent-conveyor': 'Intelligentes Förderband',
    'interim-storage': 'Temporäres Lager',
    'end-storage': 'Endlager',
    'trash-storage': 'Mülllager'
}
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

    // TODO device: add variables if necessary

    /**
     * The jQuery DOM object representing this device
     */
    const object = $(
        // TODO device: create html container
        "<li id='"+title+"' class='device' aria-labelledby='device-in-area-"+index+"'><dl class='device-properties'><dt class='accessibility'>Maschinentyp</dt><dd id='device-in-area-"+index+"' class='device-name'>"+name[type]+" "+index+"</dd><dt>Vorgänger:</dt><dd class='device-neighbour'></dd><dt>Nachfolger:</dt><dd class='device-neighbour'></dd></dl><div class='device-image' title='"+name[type]+" "+index+"' alt='"+name[type]+" "+index+"'>" + images[image] + "</div></li>"
    );


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
          alert(name[type] +" "+ index);
        });

        var x = $("#arrow-device-add-reference").clone();
        x.attr("id", "arrow-symbol-"+ title);
        $("#"+title).append(x);
        $("#"+title).hover(function(event){
          if($(window).width() >= 768){
            x.attr("style", "display: block;");
          }
        }, function(event){
            x.attr("style", "display: none;");
        });
        x.click(function(event){
          diagram.toggleArrowActive();
        });

        $("#"+title).removeClass('ui-draggable-dragging');

        // TODO device: attach drag & drop functionality
        $("#"+title).draggable({
          start: function(event){
            if($(window).width() <= 767){
              return false;
            }
          },
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
          $("#"+title).addClass("active");
        }else{
          $("#"+title).removeClass("active");
        }
    }

    /**
     * Update the list of predecessors in the DOM
     */
    function updatePredecessors() {
        // TODO device: update predecessors in overview.html of device like in UE1
        /*$("#device-in-area-"+index).siblings("dd:nth-of-type(2)").html(function(){
            arrowsIn.forEach(function(arrow){
                return arrow.startDevice.type + " " + arrow.startDevice.index;
            })
        });*/
        $("#device-in-area-"+index).siblings("dd:nth-of-type(2)").html("");
        for(i = arrowsIn.length-1; i >= 0; i--){
            if(i != 0){
                $("#device-in-area-"+index).siblings("dd:nth-of-type(2)").append(name[arrowsIn[i].startDevice.type] + " " + arrowsIn[i].startDevice.index + ", ");
            } else {
                $("#device-in-area-"+index).siblings("dd:nth-of-type(2)").append(name[arrowsIn[i].startDevice.type] + " " + arrowsIn[i].startDevice.index);
            }
        }
    }

    /**
     * Update the list of successors in the DOM
     */
    function updateSuccessors() {
        // TODO device: update successors in overview.html of device like in UE1
        $("#device-in-area-"+index).siblings("dd:nth-of-type(3)").html("");
        for(i = arrowsOut.length-1; i >= 0; i--){
            if(i != 0){
                $("#device-in-area-"+index).siblings("dd:nth-of-type(3)").append(name[arrowsOut[i].endDevice.type] + " " + arrowsOut[i].endDevice.index + ", ");
            } else {
                $("#device-in-area-"+index).siblings("dd:nth-of-type(3)").append(name[arrowsOut[i].endDevice.type] + " " + arrowsOut[i].endDevice.index);
            }
        }
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
        var deletedArrows = 0;
        var i = arrowsIn.length-1;
        for(; i >= 0; i--){
            var arrow = arrowsIn[i];
            arrow.deleteArrow();
            deletedArrows++;
        }
        i = arrowsOut.length-1;
        for(; i >= 0; i--){
          var arrow = arrowsOut[i];
          arrow.deleteArrow();
          deletedArrows++;
        }
        $("#"+title).remove();
        return deletedArrows;
    }

    /**
     * Remove the given arrow from the list of arrows
     * @param {Arrow} arrow The arrow to remove
     */
    function deleteArrow(arrow) {
        // TODO device: delete arrow from arrowsIn/arrowsOut and update predecessors and successors
        var i = arrowsIn.indexOf(arrow);
        if(i > -1){
          arrowsIn.splice(i, 1);
          updatePredecessors();
        }
        i = arrowsOut.indexOf(arrow);
        if(i > -1){
          arrowsOut.splice(i, 1);
          updateSuccessors();
        }
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
