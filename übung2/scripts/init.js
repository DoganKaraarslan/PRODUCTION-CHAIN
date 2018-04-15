var device_counter;
var arrow_counter;
var product_counter;

var controls;

$(document).ready(function() {

    // TODO init: initialize all counters
    device_counter = new Counter(document.getElementById("device-counterID"));
    arrow_counter = new Counter(document.getElementById("arrow-counterID"));
    product_counter = new Counter(document.getElementById("product-counterID"));
    device_counter.alterCount(3);

    // TODO init: initialize controls
    controls = new Controls(document.getElementById("controls"));

    // TODO init: initialize diagram and transfer counters and controls


    // TODO init: add drag functionality to devices in sidebar
});
