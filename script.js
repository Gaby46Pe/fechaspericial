const feriados = [
    '01/01/2025', '20/02/2025', '21/02/2025', '24/03/2025',
    '02/04/2025', '01/05/2025', '25/05/2025', '17/06/2025',
    '20/06/2025', '09/07/2025', '15/08/2025', '07/10/2025',
    '12/10/2025', '20/11/2025', '08/12/2025', '25/12/2025'
].map(date => new Date(date.split('/').reverse().join('-')));

function esDiaHabil(fecha) {
    const dia = fecha.getDay();
    const esFeriado = feriados.some(feriado => feriado.getTime() === fecha.getTime());
    return dia !== 0 && dia !== 6 && !esFeriado; // Lunes a Viernes y no feriado
}

function calcularFechaFinal(fechaInicial, dias) {
    let diasContados = 0;
    let fecha = new Date(fechaInicial);

    // Encontrar el siguiente día hábil
    while (!esDiaHabil(fecha)) {
        fecha.setDate(fecha.getDate() + 1);
    }

    while (diasContados < dias) {
        fecha.setDate(fecha.getDate() + 1);
        if (esDiaHabil(fecha)) {
            diasContados++;
        }
    }

    return fecha;
}

document.getElementById('calculoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fechaInicial = document.getElementById('fechaInicial').value.split('/').reverse().join('-');
    const dias = parseInt(document.getElementById('dias').value);

    const fechaFinal = calcularFechaFinal(new Date(fechaInicial), dias);
    document.getElementById('fechaResultado').textContent = fechaFinal.toLocaleDateString('es-ES');
});
