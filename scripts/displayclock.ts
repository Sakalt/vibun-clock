import {EikyuDate} from './clockmain.js'
import {FunNumber} from './funnumber.js'
const now = new Date(Date.UTC(2023, 0, 1))

function refreshclock() {
    const date = new Date()
    const formattedEdate = EikyuDate.now().getFormattedHTML()
    const formattedFdate = EikyuDate.now().timezone(6).getFunScriptedHTMLBase12()
    const jst = document.getElementById('jst')
    const eikyu = document.getElementById('eikyu')
    const fun = document.getElementById('fun')
    const formattedDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}<br>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    jst!.innerHTML = formattedDate;
    eikyu!.innerHTML = formattedEdate;
    fun!.innerHTML = formattedFdate;
}
setInterval(refreshclock, 1);