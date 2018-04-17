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

    if(value == true){
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
