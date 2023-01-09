import { EikyuDate } from './clockmain.js';
function refreshclock() {
    const date = new Date();
    const Edate = new EikyuDate();
    const formattedEdate = Edate.getFormatted();
    const jst = document.getElementById('jst');
    const eikyu = document.getElementById('eikyu');
    const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    jst.innerHTML = formattedDate;
    eikyu.innerHTML = formattedEdate;
}
setInterval(refreshclock, 1);
