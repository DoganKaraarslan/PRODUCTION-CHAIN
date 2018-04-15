var out_label;

var device_counter;
var arrow_counter;
var product_counter;

var controls;

var diagram;

$(document).ready(function() {

    out_label = document.getElementById("state-label");

    // TODO init: initialize all counters
    device_counter = new Counter(document.getElementById("device-counterID"));
    arrow_counter = new Counter(document.getElementById("arrow-counterID"));
    product_counter = new Counter(document.getElementById("product-counterID"));

    // TODO init: initialize controls
    controls = new Controls(document.getElementById("controls"));

    // TODO init: initialize diagram and transfer counters and controls
    diagram = new Diagram(document.getElementById("diagram"), document.getElementById("arrow-sidebar-add"), device_counter, arrow_counter, controls);

    // TODO init: add drag functionality to devices in sidebar
    var devices = document.getElementById("devices").getElementsByTagName("li");
    for(index = 0; index < devices.length; index++){
      devices[index].setAttribute("draggable", true);
      devices[index].setAttribute("ondragstart", "drag(event)");
    }

    var dia = document.getElementById("diagram");
    dia.setAttribute("ondragover", "allowDrop(event)");
    dia.setAttribute("ondrop", "drop(event)");


});
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var dia = document.getElementById("diagram");
    dia.style.position = "relative";
    var rect = dia.getBoundingClientRect();
    var svg_storage = document.createElement("div");
    svg_storage.style.position = "absolute";
    var top = ev.clientY - rect.top - 50;
    var left = ev.clientX - rect.left - 50;
    svg_storage.style.top = top + "px";
    svg_storage.style.left = left + "px";
    svg_storage.style.width = "100px";
    svg_storage.innerHTML = images[data];
    document.getElementById("diagram").append(svg_storage);
}
