const cellConversion = {

    temps: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' °C';
        } else {
            return 'in °C';
        }
    },
    
    pressure: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' mbar';
        } else {
            return 'in mbar';
        }
    },
    
    overpressure: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' barü';
        } else {
            return 'in barü';
        }
    },
    
    density: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' kg/Nm³/h';
        } else {
            return 'in kg/Nm³/h';
        }
        
    },
    
    millimeters: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' mm';
        } else {
            return  'in mm';
        }
    },
    
    meters: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' m';
        } else {
            return  'in m';
        }
        
    },
    
    volumeFlow: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' Nm³/h';
        } else {
            return 'in Nm³/h';
        }
        
    },
    
    weight: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' kg';
        } else {
            return 'in kg';
        }
        
    },
    
    massFlow: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' kg/h';
        } else {
            return 'in kg/h';
        }
        
    },
    
    rpm: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' U/min';
        } else {
            return 'in U/min';
        }
    },
    
    space: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' m²';
        } else {
            return 'in m²';
        }
        
    },
    
    solidsContent: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' g/kg';
        } else {
            return 'in g/kg';
        }
    },
    
    conveyingVolume: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' m³/h';
        } else {
            return 'in m³/h';
        }
    },
    
    protectionClass: function(params) {
        if (params.value || params.value === 0) {
            return 'IP' + params.value;
        } else {
            return 'als Schutzartnummer';
        }
    },
    
    power: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' kW';
        } else {
            return 'in kW';
        }
    },
    
    voltage: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' V';
        } else {
            return 'in V';
        }
    },
    
    current: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' A';
        } else {
            return 'in A';
        }
    },
    
    volume: function(params) {
        if (params.value || params.value === 0) {
            return params.value + ' m³';
        } else {
            return 'in m³';
        } 
    },
};

export default cellConversion;