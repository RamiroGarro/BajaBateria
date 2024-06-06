//Agregará un EventListener para cargar todo este código 
document.addEventListener('DOMContentLoaded', (event) => {
    //Aquí almacenaremos los datos sobre la batería.
    const batteryStatus = {
        level: 0.5, // Nivel de batería simulado (50%).
        charging: false // Se establece si está o no cargándose.
    };

    //Esta función sirve para quitar decoraciones y animaciones si la batería es inferior a 10% y no se está cargando.
    //Para ello aplica o elimina la clase low-battery en el cuerpo del documento dependiendo del nivel de batería y el estado de carga.

    function updateBatteryStatus() {
        if (batteryStatus.level < 0.1 && !batteryStatus.charging) {
            document.body.classList.add('low-battery');
        } else {
            document.body.classList.remove('low-battery');
        }
    }


    //Se simulan cambios en el estado de la batería para testear la página web.
    //Comentar esto para que deje de disminuir la batería de manera artificial.
    setInterval(() => {
        batteryStatus.level -= 0.01;
        if (batteryStatus.level < 0) {
            batteryStatus.level = 1;
        }
        console.log(`Battery Level: ${Math.round(batteryStatus.level * 100)}%`);
        updateBatteryStatus();
    }, 5000); // Update every 5 seconds

    //Implementación real para cuando se descarga realmente la batería.
    //Comentar esto para que deje de tomar los cambios reales en la batería.
    navigator.getBattery().then(function(battery) {
        function updateBatteryInfo() {
            batteryStatus.level = battery.level;
            batteryStatus.charging = battery.charging;
            updateBatteryStatus();
            console.log(`Battery Level: ${Math.round(batteryStatus.level * 100)}%`);
        }

        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);

        updateBatteryInfo();
    });
    
});
