import {EikyuDate} from './clockmain.js'
import {FunNumber} from './funnumber.js'
import { earthToPhun, phunToEarth, valueReset } from './convert.js'

const UTCInput: HTMLInputElement = <HTMLInputElement> document.getElementById("utcinput")
const PhunInput: HTMLInputElement = <HTMLInputElement> document.getElementById("phuninput")

valueReset()
UTCInput.addEventListener("input", earthToPhun)
PhunInput.addEventListener("input", phunToEarth)

function refreshclock() {
    const date = new Date()
    const formattedEdate = EikyuDate.now().getFormattedHTML()
    const formattedFdate = EikyuDate.now().timezone(6).getFunScriptedHTMLBase12()
    const jst = document.getElementById('jst')
    const fun = document.getElementById('fun')
    const formattedDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}<br>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    jst!.innerHTML = formattedDate;
    fun!.innerHTML = formattedFdate;
}
setInterval(refreshclock, 1);