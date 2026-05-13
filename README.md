# 🛠️ Guía de Uso: Plataforma de Mantenimiento TI (Etapa 2)


### Paso 1: Extracción de Datos (Script)
* Diríjase al computador físico o máquina virtual que le corresponde inspeccionar.
* Ejecute el script de PowerShell oficial que se encuentra en este repositorio (carpeta script).
* El sistema escaneará el equipo y generará automáticamente un archivo `.json` en el escritorio.

### Paso 2: Carga en la Plataforma Web
* Abra el archivo `index.html` en su navegador web con live server.
* En el panel izquierdo ("Escáner del Equipo"), seleccione y suba el archivo `.json` que generó en el Paso 1. 
* El sistema mostrará automáticamente el resumen del hardware y software de la máquina.

### Paso 3: Inspección Física (Checklist)
* Diríjase al panel derecho de la plataforma ("Checklist Técnico").
* Inspeccione físicamente el equipo y marque con un ✅ las casillas de los componentes que operen correctamente. Si detecta una falla, deje la casilla en blanco.
* Seleccione el **Tipo de Mantenimiento**:
  - *Preventivo:* Si realizó tareas de revisión, limpieza o ajustes.
  - *Correctivo:* Si reparó alguna falla o instaló software faltante (ej. antivirus).
* Describa detalladamente su intervención en la caja de "Hallazgos y Observaciones".

### Paso 4: Generación del Reporte Final
* Una vez completado el formulario, presione el botón azul **"Guardar y Descargar Reporte Consolidado"**.
* Se descargará automáticamente un nuevo archivo `.json` que unifica los datos técnicos de la máquina con la inspección visual que usted acaba de realizar.

### Paso 5: Envío al Líder de Grupo (Obligatorio)
* Usted debe enviar el archivo `.json` descargado en el Paso 4 directamente al líder del grupo.
* **Nota para el líder:** Deberá recepcionar los reportes de todos los técnicos, consolidar los datos en una planilla general y luego volcar esta información semana a semana en el documento Word oficial .
* Ese informe Word es el entregable final que será evaluado en la asignatura.

### Paso 6: Consulta del Historial de Mantenimiento (RF-08)
* Para verificar que la información quedó correctamente documentada o consultar intervenciones pasadas, haga clic en el botón superior
*  **"📁 Ver Historial de Mantenimiento"** (o abra directamente el archivo `historial.html`).
* En el panel de consulta, suba el reporte `.json` que descargó en el Paso 4.
* El sistema desplegará automáticamente una tarjeta con los parámetros exigidos para el historial:
* fecha, tipo de mantenimiento, número de serie del equipo, técnico responsable y el detalle exacto de la intervención.
* Este módulo garantiza que el historial sea accesible y que cualquier persona que lo consulte pueda obtener la información completa sobre cada servicio realizado.

¡Mucho éxito en sus inspecciones!
