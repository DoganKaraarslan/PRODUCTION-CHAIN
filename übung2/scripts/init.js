var out_label;

var device_counter;
var arrow_counter;
var product_counter;

var controls;

var diagram;

$(document).ready(function() {

    // TODO init: initialize all counters
    device_counter = new Counter(document.getElementById("device-counterID"));
    arrow_counter = new Counter(document.getElementById("arrow-counterID"));
    product_counter = new Counter(document.getElementById("product-counterID"));

    // TODO init: initialize controls
    controls = new Controls(document.getElementById("controls"));

    // TODO init: initialize diagram and transfer counters and controls
    diagram = new Diagram(document.getElementById("diagram"), document.getElementById("arrow-sidebar-add"), device_counter, arrow_counter, controls);

    // TODO init: add drag functionality to devices in sidebar
    $("#item-generator").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["item-generator"] + "</div></li>");
      }
    });
    $("#machine").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["machine"] + "</div></li>");
      }
    });
    $("#conveyor").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["conveyor"] + "</div></li>");
      }
    });
    $("#intelligent-conveyor").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["intelligent-conveyor"] + "</div></li>");
      }
    });
    $("#interim-storage").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["interim-storage"] + "</div></li>");
      }
    });
    $("#end-storage").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["end-storage"] + "</div></li>");
      }
    });
    $("#trash-storage").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li><div style='width: 100px;'>" + images["trash-storage"] + "</div></li>");
      }
    });
});
