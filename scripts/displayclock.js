import { EikyuDate } from './clockmain.js';
import { earthToPhun, phunToEarth, valueReset } from './convert.js';
const UTCInput = document.getElementById("utcinput");
const PhunInput = document.getElementById("phuninput");
valueReset();
UTCInput.addEventListener("input", earthToPhun);
PhunInput.addEventListener("input", phunToEarth);
//console.log(EikyuDate.now().getPhunHTMLBase12())
function refreshclock() {
    const date = new Date();
    const formattedPdate = EikyuDate.now().getPhunHTMLBase12();
    const jst = document.getElementById('jst');
    const phun = document.getElementById('phun');
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}<br>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    jst.innerHTML = formattedDate;
    phun.innerHTML = formattedPdate;
}
setInterval(refreshclock, 1);
