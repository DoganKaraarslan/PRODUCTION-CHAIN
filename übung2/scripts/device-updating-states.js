const update = {
    "item-generator": updateItemGenerator,
    "machine": updateMachine,
    "conveyor": updateConveyor,
    "intelligent-conveyor": updateIntelligentConveyor,
    "interim-storage": updateInterimStorage,
    "end-storage": updateStorage,
    "trash-storage": updateStorage
};

/**
 * Update the image of an item generator ("3D-Drucker")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateItemGenerator(container, min, max, value) {
    // TODO update svg: see assignment document

    if(value <= min){
      container.contents().find(".thirdPlane").attr("opacity", "0");
      container.contents().find(".secondPlane").attr("opacity", "0");
    }else if(value >= max){
      container.contents().find(".thirdPlane").attr("opacity", "1");
      container.contents().find(".secondPlane").attr("opacity", "1");
    }else{
      container.contents().find(".thirdPlane").attr("opacity", "0");
      container.contents().find(".secondPlane").attr("opacity", "1");
    }
}

/**
 * Update the image of a machine ("Maschine")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateMachine(container, min, max, value) {
    // TODO update svg: see assignment document
    container.contents().find("#tspan3817").html(min);
    container.contents().find("#tspan3817-6").html(max);
    if(min <= value && value < 34) {
        container.contents().find("#path3680").attr("style", "fill:#008800;fill-opacity:1");
        container.contents().find("#path3680").attr("d", "M 323.577 408.949 V 250.21899 H 254.64 L 253.93289 406.35969 C 229.95989 418.59369 214.201 444.10305 214.201 472.81205 214.201 513.56405 247.356 546.71805 288.109 546.71805 328.862 546.71805 362.017 513.56405 362.017 472.81205 362.017 444.10405 345.552 421.18405 321.577 408.94905 Z M 318.681 482.906 C 308.363 482.906 299.995 474.539 299.995 464.22 299.995 453.901 308.352 445.534 318.681 445.534 328.999 445.534 337.365 453.901 337.365 464.22 337.365 474.539 328.999 482.906 318.681 482.906 Z");
    }
    if(value >= 34 && value < 67){
        container.contents().find("#path3680").attr("style", "fill:#FF6600;fill-opacity:1");
        container.contents().find("#path3680").attr("d", "M 323.577 408.949 V 190.21899 H 254.64 L 253.93289 406.35969 C 229.95989 418.59369 214.201 444.10305 214.201 472.81205 214.201 513.56405 247.356 546.71805 288.109 546.71805 328.862 546.71805 362.017 513.56405 362.017 472.81205 362.017 444.10405 345.552 421.18405 321.577 408.94905 Z M 318.681 482.906 C 308.363 482.906 299.995 474.539 299.995 464.22 299.995 453.901 308.352 445.534 318.681 445.534 328.999 445.534 337.365 453.901 337.365 464.22 337.365 474.539 328.999 482.906 318.681 482.906 Z");
    }
    if(value >= 67 && value <= max){
        container.contents().find("#path3680").attr("style", "fill:#FF0000;fill-opacity:1");
        container.contents().find("#path3680").attr("d", "M 323.577 408.949 V 50.21899 H 254.64 L 253.93289 406.35969 C 229.95989 418.59369 214.201 444.10305 214.201 472.81205 214.201 513.56405 247.356 546.71805 288.109 546.71805 328.862 546.71805 362.017 513.56405 362.017 472.81205 362.017 444.10405 345.552 421.18405 321.577 408.94905 Z M 318.681 482.906 C 308.363 482.906 299.995 474.539 299.995 464.22 299.995 453.901 308.352 445.534 318.681 445.534 328.999 445.534 337.365 453.901 337.365 464.22 337.365 474.539 328.999 482.906 318.681 482.906 Z");
    }

}

/**
 * Update the image of a conveyor ("Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateConveyor(container, min, max, value) {
    // TODO update svg: see assignment document

    if(value){
      container.contents().find(".package").attr("opacity", "1");
    }else{
      container.contents().find(".package").attr("opacity", "0");
    }
}

/**
 * Update the image of an intelligent conveyor ("Intelligentes Förderband")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateIntelligentConveyor(container, min, max, value) {
    // TODO update svg: see assignment document
    if(value){
        container.contents().find(".packageLeft").attr("opacity", "1");
        container.contents().find(".packageRight").attr("opacity", "1");
    } else {
        container.contents().find(".packageLeft").attr("opacity", "0");
        container.contents().find(".packageRight").attr("opacity", "0");
    }

}

/**
 * Update the image of an interim storage ("Temporäres Lager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateInterimStorage(container, min, max, value) {
    // TODO update svg: see assignment document
    if(value < 5){
        container.contents().find(".packageTop").attr("opacity", "0");
        container.contents().find(".packageBottom").attr("opacity", "1");
    } else {
        container.contents().find(".packageTop").attr("opacity", "1");
        container.contents().find(".packageBottom").attr("opacity", "1");
    }
    if(value < 1){
        container.contents().find(".packageBottom").attr("opacity", "0");
    }

}

/**
 * Update the image of an end storage ("Endlager") or a trash storage ("Mülllager")
 * @param container The jQuery container for the device
 * @param {?number} min The minimum value for the device
 * @param {?number} max The maximum value for the device
 * @param value The new value to set
 */
function updateStorage(container, min, max, value) {
    // TODO update svg: see assignment document

    if(value <= min){
      container.contents().find("tspan").html(min);
    }else if(value >= max){
      container.contents().find("tspan").html(max);
    }else{
      container.contents().find("tspan").html(value);
    }
}
