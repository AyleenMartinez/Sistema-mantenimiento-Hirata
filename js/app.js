let datosLevantamiento = {};

// ==========================================
// 1. LÓGICA DEL PANEL PRINCIPAL (index.html)
// ==========================================
const btnCargar = document.getElementById('btnCargarJson');
if (btnCargar) {
    btnCargar.addEventListener('click', function() {
        const fileInput = document.getElementById('jsonFileInput');
        
        if (fileInput.files.length === 0) {
            alert("Primero debes seleccionar el archivo .json en la casilla.");
            return;
        }

        const file = fileInput.files[0]; 
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                datosLevantamiento = JSON.parse(e.target.result);
                
                // Hardware
                const hostname = datosLevantamiento.identificacion_unica?.hostname || 'No detectado';
                const cpu = datosLevantamiento.especificaciones_hardware?.procesador?.modelo || 'No detectado';
                const placa = datosLevantamiento.especificaciones_hardware?.placa_madre || 'No detectado';
                
                let ramTotal = 0;
                const ramArray = datosLevantamiento.especificaciones_hardware?.memoria_ram || [];
                ramArray.forEach(mod => ramTotal += (mod.Capacidad_GB || 0));
                const estadoRam = ramTotal < 16 ? `<span style="color:#d9534f; font-weight:bold;">⚠️ Sugerencia: Ampliar (Actual: ${ramTotal}GB)</span>` : `<span style="color:#28a745; font-weight:bold;">✅ Óptimo (${ramTotal}GB)</span>`;

                let discos = [];
                const storageArray = datosLevantamiento.especificaciones_hardware?.almacenamiento || [];
                storageArray.forEach(d => {
                    if(d.Tamaño_GB && d.Modelo) discos.push(`${d.Modelo} (${d.Tamaño_GB} GB)`);
                });

                // Software
                const so = datosLevantamiento.entorno_logico?.sistema_operativo || 'No detectado';
                let estadoSo = so.includes('Windows 11') ? '<span style="color:#28a745; font-weight:bold;">✅ Actualizado</span>' : '<span style="color:#d9534f; font-weight:bold;">⚠️ Requiere mejora/Parche</span>';

                let versionOffice = '<span style="color:#d9534f;">⚠️ No detectado (Sugerencia: Instalar)</span>';
                let estadoAntivirus = '<span style="color:#d9534f;">⚠️ No detectado (Riesgo)</span>';
                let navegadores = [];
                let devTools = [];
                let dbTools = [];
                let designTools = [];
                let drivers = [];
                let utilidades = [];

                const softwareArray = datosLevantamiento.entorno_logico?.listado_software || [];
                softwareArray.forEach(sw => {
                    const nombre = sw.Programa.toLowerCase();
                    if (nombre.includes('microsoft 365') || nombre.includes('office')) versionOffice = `<span style="color:#28a745;">✅ Instalado (v. ${sw.Version})</span>`;
                    if (nombre.includes('chrome') || nombre.includes('edge') || nombre.includes('firefox')) navegadores.push(sw.Programa);
                    if (nombre.includes('antivirus') || nombre.includes('defender') || nombre.includes('security') || nombre.includes('anti-cheat')) estadoAntivirus = '<span style="color:#28a745;">✅ Activo</span>';
                    if (nombre.includes('visual studio') || nombre.includes('python') || nombre.includes('java ') || nombre.includes('git')) devTools.push(sw.Programa);
                    if (nombre.includes('sql server') || nombre.includes('mysql') || nombre.includes('xampp')) dbTools.push(sw.Programa);
                    if (nombre.includes('adobe') || nombre.includes('blender') || nombre.includes('obs')) designTools.push(sw.Programa);
                    if (nombre.includes('nvidia') || nombre.includes('amd software')) drivers.push(sw.Programa);
                    if (nombre.includes('winrar') || nombre.includes('filezilla') || nombre.includes('powertoys')) utilidades.push(sw.Programa);
                });

                const formatList = (arr) => arr.length > 0 ? arr.slice(0, 2).join(', ') + (arr.length > 2 ? '...' : '') : '<span style="color:gray;">Ninguno detectado</span>';

                document.getElementById('datosHardware').innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 5px solid #6c757d; box-shadow: 0 2px 5px rgba(0,0,0,0.08);">
                            <h4 style="margin-top: 0; color: #495057;">⚙️ Resumen de Hardware (5)</h4>
                            <ul style="margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px;">
                                <li><strong>1. Equipo:</strong> ${hostname}</li>
                                <li><strong>2. Procesador:</strong> ${cpu}</li>
                                <li><strong>3. Placa Madre:</strong> ${placa}</li>
                                <li><strong>4. Estado Memoria RAM:</strong> ${estadoRam}</li>
                                <li><strong>5. Almacenamiento:</strong> <br>&nbsp;&nbsp;&nbsp;${discos.join('<br>&nbsp;&nbsp;&nbsp;')}</li>
                            </ul>
                        </div>
                        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 5px solid #28a745; box-shadow: 0 2px 5px rgba(0,0,0,0.08);">
                            <h4 style="margin-top: 0; color: #28a745;">💻 Resumen de Software (10)</h4>
                            <ul style="margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px;">
                                <li><strong>1. Sistema Operativo:</strong> ${so}</li>
                                <li><strong>2. Estado del SO:</strong> ${estadoSo}</li>
                                <li><strong>3. Suite Ofimática:</strong> ${versionOffice}</li>
                                <li><strong>4. Estado Antivirus:</strong> ${estadoAntivirus}</li>
                                <li><strong>5. Navegadores:</strong> ${formatList(navegadores)}</li>
                                <li><strong>6. Herramientas Dev:</strong> ${formatList(devTools)}</li>
                                <li><strong>7. Motores BD:</strong> ${formatList(dbTools)}</li>
                                <li><strong>8. Software Diseño:</strong> ${formatList(designTools)}</li>
                                <li><strong>9. Controladores GPU:</strong> ${formatList(drivers)}</li>
                                <li><strong>10. Utilidades:</strong> ${formatList(utilidades)}</li>
                            </ul>
                        </div>
                    </div>
                `;
                document.getElementById('infoEquipo').style.display = 'block';
            } catch (error) {
                alert("Error al leer el formato del JSON. Revisa la consola.");
            }
        };
        reader.readAsText(file);
    });
}

function guardarRegistro() {
    if (Object.keys(datosLevantamiento).length === 0) {
        alert("¡Alto! Debes cargar el archivo JSON en el panel izquierdo antes de registrar el mantenimiento.");
        return;
    }

    const checklistEjecutado = {
        chasis_y_ventilacion: document.getElementById('chk1').checked,
        perifericos_operativos: document.getElementById('chk2').checked,
        monitor_y_cables: document.getElementById('chk3').checked,
        temperaturas_normales: document.getElementById('chk4').checked,
        arranque_postbios: document.getElementById('chk5').checked,
        sistema_y_antivirus: document.getElementById('chk6').checked,
        ofimatica_y_navegadores: document.getElementById('chk7').checked,
        herramientas_ti: document.getElementById('chk8').checked
    };

    datosLevantamiento.gestion_mantenimiento = {
        estado_equipo: document.getElementById('tipoMantenimiento').value === "Correctivo" ? "En Revisión" : "Operativo",
        tipo_accion: document.getElementById('tipoMantenimiento').value,
        hallazgos: document.getElementById('observaciones').value,
        checklist_ejecutado: checklistEjecutado,
        fecha_intervencion: new Date().toLocaleString()
    };

    const textoJson = JSON.stringify(datosLevantamiento, null, 2);
    const blob = new Blob([textoJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_${datosLevantamiento.identificacion_unica?.hostname || 'Equipo'}_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert("¡Registro guardado y descargado exitosamente!");
}

// ==========================================
// 2. LÓGICA DE LA PÁGINA HISTORIAL AMPLIADA (historial.html)
// ==========================================
const btnVerHistorial = document.getElementById('btnVerHistorial');
if (btnVerHistorial) {
    btnVerHistorial.addEventListener('click', function() {
        const fileInput = document.getElementById('historialFileInput');
        
        if (fileInput.files.length === 0) {
            alert("Primero debes seleccionar un reporte de mantenimiento (.json) que hayas descargado previamente.");
            return;
        }

        const file = fileInput.files[0]; 
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const historial = JSON.parse(e.target.result);
                
                if (!historial.gestion_mantenimiento) {
                    alert("Este archivo no parece tener un registro de mantenimiento válido.");
                    return;
                }

                // Extracción de datos administrativos y físicos de la máquina (Añadido nuevo)
                const nombreEquipo = historial.identificacion_unica?.hostname || 'Equipo Desconocido';
                const numeroSerie = historial.identificacion_unica?.serie_chasis || 'No registrado';
                const ubicacion = historial.contexto_administrativo?.ubicacion || 'Ubicación no asignada';
                const tecnico = historial.contexto_administrativo?.responsable || 'Técnico de Turno';

                // Extracción de la gestión de mantenimiento
                const fecha = historial.gestion_mantenimiento.fecha_intervencion || 'Fecha no registrada';
                const tipo = historial.gestion_mantenimiento.tipo_accion || 'No definido';
                const estado = historial.gestion_mantenimiento.estado_equipo || 'Desconocido';
                const hallazgos = historial.gestion_mantenimiento.hallazgos || 'Sin observaciones detalladas';
                
                // Extracción de las casillas marcadas (Checklist exacto)
                const chk = historial.gestion_mantenimiento.checklist_ejecutado || {};

                const claseBorde = tipo === 'Preventivo' ? 'borde-preventivo' : 'borde-correctivo';
                const claseTexto = tipo === 'Preventivo' ? 'texto-preventivo' : 'texto-correctivo';

                // Dibujar Tarjeta Ampliada
                document.getElementById('tarjetaHistorial').innerHTML = `
                    <div class="tarjeta-resultado ${claseBorde}">
                        <h3 class="tarjeta-titulo">
                            📋 Intervención en Equipo: <span class="texto-primario">${nombreEquipo}</span>
                        </h3>
                        
                        <div class="grid-historial">
                            <div><strong>📅 Fecha Mantenimiento:</strong> <br> ${fecha}</div>
                            <div><strong>🚦 Estado Final:</strong> <br> <span class="badge-estado">${estado}</span></div>
                            <div><strong>🛠️ Tipo de Acción:</strong> <br> <span class="tipo-accion ${claseTexto}">${tipo}</span></div>
                            <div><strong>👤 Técnico Responsable:</strong> <br> ${tecnico}</div>
                            <div style="margin-top: 10px;"><strong>🏷️ N° de Serie:</strong> <br> ${numeroSerie}</div>
                            <div style="margin-top: 10px;"><strong>🏢 Ubicación:</strong> <br> ${ubicacion}</div>
                        </div>

                        <hr style="border: 0; border-top: 1px dashed #ccc; margin: 20px 0;">

                        <div>
                            <strong>✅ Resumen del Checklist de Inspección:</strong>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; font-size: 13px; color: #555;">
                                <div>${chk.chasis_y_ventilacion ? '✅' : '❌'} Chasis y ventilación</div>
                                <div>${chk.arranque_postbios ? '✅' : '❌'} Arranque y Post-BIOS</div>
                                <div>${chk.perifericos_operativos ? '✅' : '❌'} Periféricos (Teclado/Mouse)</div>
                                <div>${chk.sistema_y_antivirus ? '✅' : '❌'} Sistema Operativo y Antivirus</div>
                                <div>${chk.monitor_y_cables ? '✅' : '❌'} Monitor y cables firmes</div>
                                <div>${chk.ofimatica_y_navegadores ? '✅' : '❌'} Ofimática y Navegadores</div>
                                <div>${chk.temperaturas_normales ? '✅' : '❌'} Temperaturas normales</div>
                                <div>${chk.herramientas_ti ? '✅' : '❌'} Herramientas TI operativas</div>
                            </div>
                        </div>

                        <div class="detalles-hallazgos">
                            <strong>📝 Detalles y Hallazgos de la Intervención:</strong>
                            <p>${hallazgos}</p>
                        </div>
                    </div>
                `;
                
                document.getElementById('tarjetaHistorial').style.display = 'block';
                
            } catch (error) {
                alert("Hubo un error al leer el archivo de historial. Revisa la consola.");
            }
        };
        reader.readAsText(file);
    });
}