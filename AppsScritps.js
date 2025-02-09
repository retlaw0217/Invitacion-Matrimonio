function doGet(e) {
    var sheetId = "1t70TNlkzlRCT-8RavTjw-gX6tYizCISr7W7EaqcZpew";
    var sheetName = "Invitados";
  
    var sheet;
    try {
      sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
      if (!sheet) throw new Error("No se encontró la hoja 'Invitados'.");
    } catch (error) {
      return createJsonResponse({ error: "Error al acceder a la hoja de cálculo." });
    }
  
    var nombre = e.parameter.nombre ? e.parameter.nombre.trim().toLowerCase() : "";
    if (!nombre) return createJsonResponse({ error: "No se ingresó un nombre." });
  
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().trim().toLowerCase() === nombre) {
        return createJsonResponse({
          existe: true,
          nombre: data[i][0],
          cupos: data[i][1] || "No hay acompañantes registrados",  // Aseguramos que si está vacío, se devuelve un mensaje
          asistenciaConfirmada: data[i][2],  // Estado de asistencia
          campos: data[i][3]  // Corregido para que tome la columna de "Campos"
        });
      }
    }
  
    return createJsonResponse({ existe: false });
  }
  
  function createJsonResponse(obj) {
    return ContentService.createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Permitir CORS para solicitudes de otras fuentes
  function doPost(e) {
    return ContentService.createTextOutput(JSON.stringify({ mensaje: "Datos recibidos correctamente" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, POST")
      .setHeader("Access-Control-Allow-Headers", "Content-Type");
  }