import { EikyuDate } from './clockmain.js';
function moveClock() {
    let hou, per, min, sec, angHou, angPer, angMin, angSec;
    const date = EikyuDate.now().toEikyuFormat();
    hou = date.hou;
    per = date.per;
    min = date.min;
    sec = date.sec;
    angHou = hou * 30;
    angPer = per * 30;
    angMin = min * 30;
    angSec = sec * 5;
    angHou += per / 12 * 30 + min / 144 * 30 + sec / 10368 * 30;
    angPer += min / 12 * 30 + sec / 864 * 30;
    angMin += sec / 72 * 30;
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
