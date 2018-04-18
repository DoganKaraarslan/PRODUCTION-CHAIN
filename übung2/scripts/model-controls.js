/**
 * A class used for updating the values of the devices
 * @param form The jQuery container for the form
 * @class
 */
function Controls(form) {

    /**
     * The current values loaded from the form
     * @type {object}
     */
    let values = {};

    /**
     * A list of devices that should be updated with new values
     * @type {Device[]}
     */
    const devices = [];


    // TODO controls: add variables if necessary


    // Listen for updates
    form.submit(event => {
        event.preventDefault();
        updateDevices();
    });

    // Load initial values
    updateDevices();

    /**
     * Read the current values and update all registered devices
     */
    function updateDevices() {
        // TODO controls: get values of all controls of the form and call updateDevice on each device
        for(i in devices){
          var value;
          switch(devices[i].type){
            case "item-generator":
            var x = document.getElementById("control-item-generator");
            value = x.options[x.selectedIndex].value;
            devices[i].updateDevice(value);
            break;
            case "conveyor":
            value = document.getElementById("control-conveyor").checked;
            break;
            case "intelligent-conveyor":
            value = document.getElementById("control-intelligent-conveyor").checked;
            break;
            default:
            value = document.getElementById("control-"+ devices[i].type).value;
            break;
          }
          devices[i].updateDevice(value);
        }
    }

    /**
     * Add a device to the list and set to the current value
     * @param {Device} device The device object to add
     */
    function addDevice(device) {
        // TODO controls: add dropped device to list and update the state of the device
        devices.push(device);
        updateDevices();
    }

    /**
     * Remove a device from the list
     * @param {Device} device
     */
    function removeDevice(device) {
        // TODO controls: remove deleted device from list
        var index = devices.indexOf(device);
        if(index > -1){
          devices.splice(index, 1);
        }
    }

    // Export public methods
    this.addDevice = addDevice;
    this.removeDevice = removeDevice;
}
