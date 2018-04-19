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
    controls = new Controls($("#controls"));

    // TODO init: initialize diagram and transfer counters and controls
    diagram = new Diagram("#diagram", "#arrow-sidebar-add", device_counter, arrow_counter, controls);
    // adding onclick to arrow-box in sidebar
    var arr_box = $("#arrow-sidebar-add");
    arr_box.click(function(event){
      if(arr_box.hasClass("active")){
        diagram.deactivateArrowDrawing();
      }else{
        diagram.activateArrowDrawing();
      }
    });

    // TODO init: add drag functionality to devices in sidebar
    $("#item-generator").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='item-generator'><div style='width: 100px;'>" + images["item-generator"] + "</div></li>");
      }
    });
    $("#machine").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='machine'><div style='width: 100px;'>" + images["machine"] + "</div></li>");
      }
    });
    $("#conveyor").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='conveyor'><div style='width: 100px;'>" + images["conveyor"] + "</div></li>");
      }
    });
    $("#intelligent-conveyor").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='intelligent-conveyor'><div style='width: 100px;'>" + images["intelligent-conveyor"] + "</div></li>");
      }
    });
    $("#interim-storage").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='interim-storage'><div style='width: 100px;'>" + images["interim-storage"] + "</div></li>");
      }
    });
    $("#end-storage").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='end-storage'><div style='width: 100px;'>" + images["end-storage"] + "</div></li>");
      }
    });
    $("#trash-storage").draggable({
      cursor: "move",
      cursorAt: { top: 50, left: 45 },
      helper: function(){
        return $("<li id='trash-storage'><div style='width: 100px;'>" + images["trash-storage"] + "</div></li>");
      }
    });
});
