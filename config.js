/* BP4 — configuración compartida (sitio + juegos).
   Pegá acá la URL de la aplicación web de Google Apps Script (termina en /exec).
   Si queda vacía: el formulario de la home vuelve a abrir el mail del visitante,
   el formulario del juego no se muestra y no se registran eventos. */
window.BP4_SHEET_URL = "https://script.google.com/macros/s/AKfycbz0FBCi6wDUVpmaLvAT6FVACH4a7BcSPtj1jltpmivitnniQR17XEDX0kOGGFVvETdFPA/exec";

(function () {
  var url = window.BP4_SHEET_URL;
  var params = new URLSearchParams(window.location.search);
  // Identificador anónimo de esta visita (no se guarda en el navegador).
  var sesion = Math.random().toString(36).slice(2, 10);
  var base = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    pagina: window.location.pathname,
    referer: document.referrer ? new URL(document.referrer).hostname : "",
    dispositivo: window.matchMedia("(max-width: 900px)").matches ? "celular" : "computadora",
    sesion: sesion,
  };

  function payload(data) {
    var out = {};
    for (var k in base) out[k] = base[k];
    for (var j in data) out[j] = data[j];
    return JSON.stringify(out);
  }

  window.BP4Sheet = {
    activo: !!url,
    // Contactos: devuelve una promesa. Se usa text/plain para evitar el preflight de CORS.
    enviar: function (data) {
      if (!url) return Promise.reject(new Error("sin-url"));
      return fetch(url, { method: "POST", mode: "no-cors", body: payload(data),
        headers: { "Content-Type": "text/plain;charset=utf-8" } });
    },
    // Eventos anónimos (visitas, partidas, clics). No bloquea ni espera respuesta.
    evento: function (nombre, extra) {
      if (!url) return;
      var data = { tipo: "evento", evento: nombre };
      for (var k in (extra || {})) data[k] = extra[k];
      var body = payload(data);
      try {
        if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: "text/plain;charset=utf-8" }))) return;
      } catch (e) {}
      try { fetch(url, { method: "POST", mode: "no-cors", keepalive: true, body: body,
        headers: { "Content-Type": "text/plain;charset=utf-8" } }); } catch (e) {}
    },
  };
})();
