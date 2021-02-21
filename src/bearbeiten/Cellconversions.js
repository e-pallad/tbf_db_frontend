export default function cellConversion() {
    function temps(params) {
        return params.value + ' °C';
    }
    
    function pressure(params) {
        return params.value + ' mbar';
    }
    
    function overpressure(params) {
        return params.value + ' barü';
    }
    
    function density(params) {
        return params.value + ' kg/Nm³/h';
    }
    
    function millimeters(params) {
        return params.value + ' mm';
    }
    
    function meters(params) {
        return params.value + ' m';
    }
    
    function volumeFlow(params) {
        return params.value + ' Nm³/h';
    }
    
    function weight(params) {
        return params.value + ' kg';
    }
    
    function massFlow(params) {
        return params.value + ' kg/h';
    }
    
    function rpm(params) {
        return params.value + ' U/min';
    }
    
    function space(params) {
        return params.value + ' m²';
    }
    
    function solidsContent(params) {
        return params.value + ' g/kg';
    }
    
    function conveyingVolume(params) {
        return params.value + ' m³/h';
    }
    
    function protectionClass(params) {
        return 'IP' + params.value;
    }
    
    function power(params) {
        return params.value + ' kW';
    }
    
    function voltage(params) {
        return params.value + ' V';
    }
    
    function current(params) {
        return params.value + ' A';
    }
    
    function volume(params) {
        return params.value + ' m³';
    }
}