const myInput = document.getElementById("my-input");
function stepper(btn){
    let id = btn.getAttribute("id");
    let min = myInput.getAttribute("min");
    let max = myInput.getAttribute("max");
    let step = myInput.getAttribute("step");
    let val = myInput.value;
    let calcStep = (id == "increment") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        myInput.value = newValue;
    }
}

document.querySelector(".boton").addEventListener("click", function(){
    const diasFeriados = {
        "01-01": "Año Nuevo",
        "02-20": "Carnaval (puede que la fecha varie)",
        "02-21": "Carnaval (puede que la fecha varie)",
        "03-24": "Día Nacional de la Memoria por la Verdad y la Justicia",
        "04-02": "Día del Veterano y de los Caídos en la Guerra de Malvinas",
        "04-06": "Jueves Santo. Festividad Cristiana. Día No Laborable",
        "04-07": "Viernes Santo. Festividad Cristiana. Día No Laborable",
        "05-01": "Día del Trabajador",
        "05-25": "Día de la Revolución de Mayo",
        "06-26": "Día No Laborable con fines Turísticos",
        "06-17": "Paso a la Inmortalidad del Gral. Don Martín Miguel de Güemes",
        "06-19": "Día No Laborable con fines Turísticos",
        "06-20": "Paso a la Inmortalidad del General Manuel Belgrano",
        "07-09": "Día de la Independencia",
        "08-21": "Paso a la Inmortalidad del Gral. José de San Martín",
        "10-13": "Día no laborable con fines Turísticos",
        "10-16": "Día del Respeto a la Diversidad Cultural",
        "11-20": "Día de la Soberanía Nacional",
        "12-08": "Inmaculada Concepción de María",
        "12-25":  "Navidad"
    };

    const fechaInicio = document.querySelector("#fechaDeInicio").value;
    const diasHabiles = parseInt(document.querySelector("#my-input").value);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if(dateRegex.test(fechaInicio)){
        let diasContados = 0;
    let fechaActual = new Date(fechaInicio);
    fechaActual.setDate(fechaActual.getDate() + 1)
    let diasFeriadosEncontrados = [];
    while (diasContados < diasHabiles) {
       
        if (fechaActual.getDay() !== 5 && fechaActual.getDay() !== 6 && !diasFeriados.hasOwnProperty(fechaActual.toISOString().slice(5, 10))) {
            diasContados++;
           
        } else   if (diasFeriados.hasOwnProperty(fechaActual.toISOString().slice(5, 10))) {
            diasFeriadosEncontrados.push(fechaActual.toISOString().slice(0, 10));
        }
        fechaActual.setDate(fechaActual.getDate() + 1);
        }
        
    
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
    const day = String(fechaActual.getDate()).padStart(2, "0");
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    const dayOfWeek = daysOfWeek[fechaActual.getDay()];
    
    document.querySelector("#resultFechaLimite").textContent = `${dayOfWeek} ${day}-${month}-${year}`;
    document.querySelector("#resultFechaLimiteContenedor").style = `visibility: visible;`
    const diasFeriadosContenedor = document.querySelector("#displayFeriados");
    let diasFeriadosHTML = "<ul>";
    for (const diaFeriado of diasFeriadosEncontrados) {
        const [year, month, day] = diaFeriado.split("-");
        diasFeriadosHTML += `<li>${day}/${month}/${year} - ${diasFeriados[`${month}-${day}`]}</li>`;
    }
    diasFeriadosHTML += "</ul>";
    diasFeriadosContenedor.innerHTML = diasFeriadosHTML;
} else {
    document.querySelector("#resultFechaLimite").textContent = fechaInicio + ` no es un valor valido`
    document.querySelector("#resultFechaLimiteContenedor").style = `visibility: visible;`
}
});
