var datosTabla = [];
var encabezados = ["Nombre", "Fecha de nacimiento", "Género", "Celular"];

function capturarDatos() {
  var nombre = document.getElementById("nombre").value;
  var fechaNacimiento = document.getElementById("fechaNacimiento").value;
  var sexo = document.querySelector('input[name="sexo"]:checked');
  var celular = document.getElementById("celular").value;

  if (nombre === "") {
    alert("El campo del nombre no puede estar vacío");
    document.getElementById("nombre").focus();
  } else if (fechaNacimiento === "") {
    alert("El campo de la fecha de nacimiento no puede estar vacío");
    document.getElementById("fechaNacimiento").focus();
  } else if (!sexo) {
    alert("Debe seleccionar una opción de género");
    document.getElementById("masculino").focus();
  } else if (celular === "") {
    alert("El campo del celular no puede estar vacío");
    document.getElementById("celular").focus();
  } else {
    var table = document.getElementById("tabla-body");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = nombre;
    cell2.innerHTML = fechaNacimiento;
    cell3.innerHTML = sexo.value;
    cell4.innerHTML = celular;

    datosTabla.push([nombre, fechaNacimiento, sexo.value, celular]);

    // Limpiar formulario y colocar el foco en el primer input
    document.getElementById("formulario").reset();
    document.getElementById("nombre").focus();
  }
}

function exportarExcel() {
  if (datosTabla.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  var wb = XLSX.utils.book_new();

  var ws = XLSX.utils.aoa_to_sheet([encabezados].concat(datosTabla));

  XLSX.utils.book_append_sheet(wb, ws, "Estudiantes");

  var nombreArchivo = "estudiantes.xlsx";

  XLSX.writeFile(wb, nombreArchivo);
}

function exportarPDF() {
  if (datosTabla.length === 0) {
    alert("No hay datos para exportar");
    return;
  }

  var tabla = document.getElementById("tabla-body");

  // Configuración de la página PDF
  var opt = {
    margin: 1,
    filename: "estudiantes.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  // Crea el documento PDF y lo descarga
  html2pdf().from(tabla).set(opt).save();
}
