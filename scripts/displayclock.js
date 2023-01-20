import { EikyuDate } from './clockmain.js';
function refreshclock() {
    const date = new Date();
    const formattedEdate = EikyuDate.now().getFormatted();
    const formattedFdate = EikyuDate.now().timezone(6).getFunScriptedHTML();
    const jst = document.getElementById('jst');
    const eikyu = document.getElementById('eikyu');
    const fun = document.getElementById('fun');
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    jst.innerHTML = formattedDate;
    eikyu.innerHTML = formattedEdate;
    fun.innerHTML = formattedFdate;
}
setInterval(refreshclock, 1);
