/**
* Class for the complete diagram
* @param {string} areaSelector
* @param {string} arrowButtonSelector
* @param {Counter} devicesCounter
* @param {Counter} arrowsCounter
* @param {Controls} controls
* @class
*/
function Diagram(areaSelector, arrowButtonSelector, devicesCounter, arrowsCounter, controls) {
  "use strict";
  const _this = this;

  /**
  * The jQuery object containing the diagram wrapper
  * @const
  */
  this.area = $(areaSelector);

  /**
  * The jQuery object containing the arrow button in the sidebar
  */
  const arrowButton = $(arrowButtonSelector);

  /**
  * The jQuery object containing the arrows svg area
  * @const
  */
  this.arrows = this.area.find(".arrows svg");

  /**
  * The jQuery object containing the device list
  * @const
  */
  this.devices = this.area.find(".devices");

  /**
  * The jQuery object containing the context menu
  */
  const context = $(".contextMenu");


  // TODO diagram: add variables for drawing mode and to store selected devices and arrows
  var drawing_mode;
  var selected_device;
  var selected_arrow;

  var device_counter = {
    'item-generator' : 0,
    'machine': 0,
    'conveyor': 0,
    'intelligent-conveyor': 0,
    'interim-storage': 0,
    'end-storage': 0,
    'trash-storage': 0
  };


  // Initialize events
  attachEventHandlers();

  /**
  * Add the event handlers for the diagram
  */
  function attachEventHandlers() {
    // TODO diagram: prevent standard context menu inside of diagram
    $("#diagram").contextmenu(function(event){
      event.preventDefault();
    });

    // TODO diagram: attach mouse move event and draw arrow if arrow active mode is on
    _this.area.on("mousemove", function(event){
      if(drawing_mode && selected_arrow != undefined){
        selected_arrow.updateEndPosition([event.pageX, event.pageY]);
      }
    });

    // TODO diagram: add device drop functionality by jquery ui droppable and prevent dropping outside the diagram
    $("body").droppable({
      disabled: true
    });
    $("#diagram").droppable({
      tolerance: 'fit',
      drop: function(event, ui){
        addDevice(event, ui);
      }
    });

    // TODO diagram: attach mousedown event to body element and remove all active modes like arrow drawing active mode or selected device mode
    $("body").mousedown(function(event){
      if(selected_device != undefined){
        selected_device.setActive(false);
        context.attr("style","display: none;");
        selected_device = undefined;
      }
      if(selected_arrow != undefined){
         if(drawing_mode){
            selected_arrow.deleteArrow();
         }
        selected_arrow.setActive(false);
        selected_arrow = undefined;
      }
      deactivateArrowDrawing();
    });

    // TODO diagram: attach keyup event to html element for 'ENTF' ('DEL') (delete device or arrow) and 'a'/'A' (toggle arrow active mode)
    $("html").keydown(function(event){
        if(selected_device != undefined && event.which == "46"){
          deleteSelectedDevice();
        }
        if(selected_arrow != undefined && event.which == "46"){
          deleteSelectedArrow();
        }
        if(event.which == "65"){
          toggleArrowActive();
        }
        // enter
        if(event.which == "13"){
            $(":focus").addClass("active");
        }
        // tab
        if(event.which == "9"){
            $(":focus").removeClass("active");
        }
    });

    // TODO diagram: attach events for context menu items ('Detailseite', 'Löschen')
    $(".contextView").mousedown(function(event) {
      alert("showing details for device "+ name[selected_device.type] + " " + selected_device.index);
    });
    $(".contextDelete").mousedown(function(event) {
      deleteSelectedDevice();
    });

  }

  /**
  * Toggle whether drawing arrows is active or not
  */
  function toggleArrowActive() {
    // TODO diagram: toggle arrow active mode (call deactivateArrowDrawing() or activateArrowDrawing()
    if(selected_arrow != undefined && selected_arrow.endDevice == undefined){
      return;
    }
    drawing_mode = !drawing_mode;
    if(drawing_mode){
      activateArrowDrawing();
    }else{
      deactivateArrowDrawing();
    }
  }

  /**
  * Append the currently drawn arrow to the diagram
  */
  function addArrow() {
    // TODO diagram: if drawing arrow mode is on, create Arrow object
    arrowsCounter.alterCount(1);
  }

  /**
  * Set arrow drawing to active
  */
  function activateArrowDrawing() {
    // TODO diagram: reset selected arrows and selected devices, enable arrow active mode and add active class to arrow button in sidebar
    if(selected_device != undefined){
      selected_device.setActive(false);
      selected_device = undefined;
    }
    if(selected_arrow != undefined){
      selected_arrow.setActive(false);
      selected_arrow = undefined;
    }
    drawing_mode = true;
    $("#arrow-sidebar-add").addClass("active");
  }

  /**
  * Set arrow drawing to inactive and delete the temporary arrow
  */
  function deactivateArrowDrawing() {
    // TODO diagram: disable arrow active mode and remove active class to arrow button in sidebar
    drawing_mode = false;
    $("#arrow-sidebar-add").removeClass("active");
  }

  /**
  * TODO diagram: use this function to get relative coordinates of devices inside diagram
  * Determine the coordinates relative to the diagram area's top left corner
  * @param {number} x The absolute x coordinate
  * @param {number} y The absolute y coordinate
  * @returns {number[]} An array with two elements containing the relative x and y coordinates
  */
  function getRelativeCoordinates(x, y) {
    return [
      x - _this.area.offset().left - _this.area[0].clientLeft,
      y - _this.area.offset().top - _this.area[0].clientTop
    ];
  }

  /**
  * Add a new device on dropping it onto the diagram area
  * @param event The jQuery event instance
  * @param ui The jQuery UI instance
  */
  function addDevice(event, ui) {
    // TODO diagram: check if dragged device is inside diagram, if not => do nothing
    // -> is done by setting tolerance: fit at droppable function

    /**
    * TODO diagram: if dragged device is inside diagram, add dragged device to diagram
    *                 + get data added to html object in overview
    *                 + add image of device-resources.js
    *                 + add update function of device-updating-states.js
    *                 + create object of Device and transmit parameters
    *                 + add device to Controls
    *                 + adapt device counter of controls
    */
    if(ui.helper == undefined){
      return;
    }else{
      var coor = getRelativeCoordinates(event.pageX, event.pageY);
      coor[0] -= 50;
      coor[1] -= 55;
      var newDevice = ui.helper.clone(false);
      var id_of_dragged = newDevice.attr('id');
      device_counter[id_of_dragged]++;

      var obj;
      var index = devicesCounter.alterCount(1);
      switch(id_of_dragged){
        case "item-generator":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 2, id_of_dragged, updateItemGenerator);
        break;
        case "machine":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 100, id_of_dragged, updateMachine);
        break;
        case "conveyor":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 1, id_of_dragged, updateConveyor);
        break;
        case "intelligent-conveyor":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 1, id_of_dragged, updateIntelligentConveyor);
        break;
        case "interim-storage":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 10, id_of_dragged, updateInterimStorage);
        break;
        case "end-storage":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 10, id_of_dragged, updateStorage);
        break;
        case "trash-storage":
        obj = new Device(_this, index, coor, id_of_dragged, id_of_dragged + device_counter[id_of_dragged], 0, 10, id_of_dragged, updateStorage);
        break;
        default:
        devicesCounter.alterCount(-1);
        return;
      }
      controls.addDevice(obj);
    }
  }

  /**
  * Callback for clicking on an arrow
  * @param {Arrow} arrow the arrow instance
  */
  function arrowClick(arrow) {
    // TODO diagram: call selectArrow() with arrow, if arrow!=selectedArrow, otherwise with null
    selectArrow(arrow);
  }

  /**
  * Callback for opening the context menu for the given device
  * @param {Device} device the device instance
  * @param event The jQuery Event instance
  */
  function showContextMenu(device, event) {
    // TODO diagram: show context menu + select device + deactivate arrow drawing
    if(selected_device != undefined){
      selected_device.setActive(false);
    }
    device.setActive(true);
    selectDevice(device);

    deactivateArrowDrawing();
    if(selected_arrow != undefined){
        selected_arrow.setActive(false);
    }
    context.attr("style", "display: block; top:"+event.pageY+"px; left:"+event.pageX+"px;");
    event.preventDefault();
  }

  /**
  * Callback for mouse down on a device
  * @param {Device} device the device instance
  */
  function deviceMouseDown(device) {
    /**
    * TODO diagram: this method should be called in model-device.js if device a device is clicked
    *              + if arrow drawing mode is enabled and no device is selected before, create new object of Arrow for drawingArrow
    *              + if arrow drawing mode is enabled and a device was already selected before, add the drawn arrow between two devices
    *              + if selected device before is equal to new selected device, disable arrow drawing mode and delete drawn arrow from device to mouse position
    */
    if(selected_device == undefined){
      selectDevice(device);
      if(drawing_mode){
        selected_arrow = new Arrow(_this, selected_device);
      }
    }else{
      if(selected_device === device){
        if(selected_arrow != undefined && selected_arrow.endDevice == undefined){
          selected_arrow.deleteArrow();
        }
      }else{
        var connected = selected_device.isConnectedTo(device);
        selected_device.setActive(false);
        selectDevice(device);
        if(drawing_mode){
          if(!connected){
              selected_arrow.setEndDevice(device);
          } else {
              selected_arrow.deleteArrow();
              selected_arrow = undefined;
          }
          deactivateArrowDrawing();
          selected_arrow = undefined;
        }
      }
    }
  }

  /**
  * Callback for releasing the mouse over a device (end of mouse movement)
  * @param {Device} device the device instance
  */
  function deviceMouseUp(device) {
    // TODO diagram: if drawing arrow mode is enabled and start device != end device, set end device of drawing arrow and add drawing arrow with addArrow()
  }

  /**
  * Select the given arrow
  * @param {?Arrow} arrow The arrow to select, or null to unselect
  */
  function selectArrow(arrow) {
    // TODO diagram: select arrow
    if (selected_arrow == arrow){
        arrow.setActive(false);
        selected_arrow = undefined;
    } else {
        arrow.setActive(true);
        selected_arrow = arrow;
    }
  }

  /**
  * Select the given device
  * @param {?Device} device The device to select, or null to unselect
  */
  function selectDevice(device) {
    // TODO diagram: select device
    if(selected_arrow != undefined){
      selected_arrow.setActive(false);
    }
    selected_device = device;
    device.setActive(true);
  }

  /**
  * Remove the selected arrow
  */
  function deleteSelectedArrow() {
    // TODO diagram: delete selected arrow
    selected_arrow.deleteArrow();
    arrowsCounter.alterCount(-1);
    selected_arrow = undefined;
  }

  /**
  * Completely remove the selected device
  */
  function deleteSelectedDevice() {
    // TODO diagram: delete selected device
    var counter = selected_device.deleteDevice();
    context.attr("style","display:none;")
    devicesCounter.alterCount(-1);
    arrowsCounter.alterCount(-counter);
    selected_device = undefined;
  }

  // Export some methods
  this.activateArrowDrawing = activateArrowDrawing;
  this.deactivateArrowDrawing = deactivateArrowDrawing;
  this.arrowClick = arrowClick;
  this.showContextMenu = showContextMenu;
  this.deviceMouseDown = deviceMouseDown;
  this.deviceMouseUp = deviceMouseUp;
  this.addArrow = addArrow;
  this.selectArrow = selectArrow;
  this.deleteSelectedArrow = deleteSelectedArrow;
  this.toggleArrowActive = toggleArrowActive;
}
