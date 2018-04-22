var device_counter;
var arrow_counter;
var product_counter;

var controls;

var diagram;

$(document).ready(function() {

    // TODO init: initialize all counters
    device_counter = new Counter($(".devices-counter"));
    arrow_counter = new Counter($(".arrows-counter"));
    product_counter = new Counter($(".products-counter"));

    // TODO init: initialize controls
    controls = new Controls($("#controls"));

    // TODO init: initialize diagram and transfer counters and controls
    diagram = new Diagram("#diagram", "#arrow-sidebar-add", device_counter, arrow_counter, controls);

    // TODO init: add drag functionality to devices in sidebar
    $("#devices li:eq(0)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='item-generator'><div style='width: 100px;'>" + images["item-generator"] + "</div></li>");
      }
    });
    $("#devices li:eq(1)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='machine'><div style='width: 100px;'>" + images["machine"] + "</div></li>");
      }
    });
    $("#devices li:eq(2)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='conveyor'><div style='width: 100px;'>" + images["conveyor"] + "</div></li>");
      }
    });
    $("#devices li:eq(3)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='intelligent-conveyor'><div style='width: 100px;'>" + images["intelligent-conveyor"] + "</div></li>");
      }
    });
    $("#devices li:eq(4)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='interim-storage'><div style='width: 100px;'>" + images["interim-storage"] + "</div></li>");
      }
    });
    $("#devices li:eq(5)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='end-storage'><div style='width: 100px;'>" + images["end-storage"] + "</div></li>");
      }
    });
    $("#devices li:eq(6)").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='trash-storage'><div style='width: 100px;'>" + images["trash-storage"] + "</div></li>");
      }
    });
});
