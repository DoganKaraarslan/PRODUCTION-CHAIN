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
      helper: function(){
        return $("<div style='width: 100px;'>" + images["item-generator"] + "</div>");
      }
    });
    $("#machine").draggable({
      helper: function(){
        return $("<div style='width: 100px;'>" + images["machine"] + "</div>");
      }
    });
    $("#conveyor").draggable({
      helper: function(){
        return $("<div style='width: 100px;'>" + images["conveyor"] + "</div>");
      }
    });
    $("#intelligent-conveyor").draggable({
      helper: function(){
        return $("<div style='width: 100px;'>" + images["intelligent-conveyor"] + "</div>");
      }
    });
    $("#interim-storage").draggable({
      helper: function(){
        return $("<div style='width: 100px;'>" + images["interim-storage"] + "</div>");
      }
    });
    $("#end-storage").draggable({
      helper: function(){
        return $("<div style='width: 100px;'>" + images["end-storage"] + "</div>");
      }
    });
    $("#trash-storage").draggable({
      helper: function(){
        return $("<div style='width: 100px;'>" + images["trash-storage"] + "</div>");
      }
    });
});
