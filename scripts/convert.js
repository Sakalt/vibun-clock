import { EikyuDate } from "./clockmain.js";
export function valueReset() {
    const UTCInput = document.getElementById("utcinput");
    const UTCDate = new Date();
    const UTCValue = [UTCDate.getUTCFullYear(), UTCDate.getUTCMonth() + 1, UTCDate.getUTCDate(), UTCDate.getUTCHours(), UTCDate.getUTCMinutes(), UTCDate.getUTCSeconds()];
    const UTCTime = UTCValue.join("_");
    UTCInput.value = UTCTime;
    earthToPhun();
}
export function earthToPhun() {
    const UTCInput = document.getElementById("utcinput");
    const PhunInput = document.getElementById("phuninput");
    const UTCValue = UTCInput.value.split("_").map(e => Number(e));
    const defaultValue = [2023, 1, 1, 0, 0, 0];
    const fillLength = Math.max(6 - UTCValue.length, 0);
    const filledValues = UTCValue.concat(defaultValue.slice(-fillLength));
    const UTCDate = Date.UTC(filledValues[0], filledValues[1] - 1, filledValues[2], filledValues[3], filledValues[4], filledValues[5]);
    const UTCEikyu = EikyuDate.toEikyu(UTCDate);
    const PhunObj = new EikyuDate("total", UTCEikyu).toEikyuFormat();
    const keyArr = ["yea", "sea", "poi", "day", "hou", "per", "min", "sec"];
    const PhunClockArr = keyArr.map((e) => {
        return PhunObj[e];
    });
    const PhunTime = PhunClockArr.join("_");
    PhunInput.value = PhunTime;
}
export function phunToEarth() {
    const UTCInput = document.getElementById("utcinput");
    const PhunInput = document.getElementById("phuninput");
    const PhunValue = PhunInput.value.split("_").map(e => Number(e));
    const defaultValue = [2086, 1, 1, 1, 0, 0, 0, 0];
    const fillLength = Math.max(8 - PhunValue.length, 0);
    const filledValues = PhunValue.concat(defaultValue.slice(-fillLength));
    const PhunDate = new EikyuDate("split", filledValues[0], filledValues[1], filledValues[2], filledValues[3], filledValues[4], filledValues[5], filledValues[6], filledValues[7]).date;
    const UTCMilisec = EikyuDate.toEarth(PhunDate);
    const UTCDate = new Date(UTCMilisec);
    const UTCValue = [UTCDate.getUTCFullYear(), UTCDate.getUTCMonth() + 1, UTCDate.getUTCDate(), UTCDate.getUTCHours(), UTCDate.getUTCMinutes(), UTCDate.getUTCSeconds()];
    const UTCTime = UTCValue.join("_");
    UTCInput.value = UTCTime;
}
