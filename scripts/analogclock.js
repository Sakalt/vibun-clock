import { EikyuDate } from './clockmain.js';
function moveClock() {
    let hou, per, min, sec, angHou, angPer, angMin, angSec;
    const date = EikyuDate.now().timezone(6).toEikyuFormat();
    hou = date.hou;
    per = date.per;
    min = date.min;
    sec = date.sec;
    angHou = (hou % 10) * 36;
    angPer = per * 36;
    angMin = min * 36;
    angSec = sec * 3.6;
    angHou += per / 10 * 36 + min / 100 * 36 + sec / 10000 * 36;
    angPer += min / 10 * 36 + sec / 1000 * 36;
    angMin += sec / 100 * 36;
    const houHand = document.getElementById("image_hou");
    const perHand = document.getElementById("image_per");
    const minHand = document.getElementById("image_min");
    const secHand = document.getElementById("image_sec");
    houHand.style.transform = "rotate(" + angHou + "deg)";
    perHand.style.transform = "rotate(" + angPer + "deg)";
    minHand.style.transform = "rotate(" + angMin + "deg)";
    secHand.style.transform = "rotate(" + angSec + "deg)";
}
window.onload = function () {
    //タイマー起動
    const clockID = setInterval(moveClock, 1);
};
