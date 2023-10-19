import { EikyuDate } from './clockmain.js';
import { FunNumber } from './funnumber.js';
const funNumber = new FunNumber();
const week = ["天", "火", "気", "木", "水", "土"];
const today = EikyuDate.now().toEikyuFormat();
let showDate = new EikyuDate("split", today.yea, today.sea, 1);
console.log(showDate.toEikyuFormat());
showProcess(showDate);
const next = document.getElementById('next');
next.onclick = prevMon;
const prev = document.getElementById('prev');
prev.onclick = nextMon;
// 前の月表示
function prevMon() {
    const presentSeason = showDate.toEikyuFormat().sea;
    const presentYear = showDate.toEikyuFormat().yea;
    showDate = new EikyuDate("split", presentYear, presentSeason - 1, 1);
    console.log(showDate);
    showProcess(showDate);
}
// 次の月表示
function nextMon() {
    const presentSeason = showDate.toEikyuFormat().sea;
    const presentYear = showDate.toEikyuFormat().yea;
    showDate = new EikyuDate("split", presentYear, presentSeason + 1, 1);
    console.log(showDate);
    showProcess(showDate);
}
// カレンダー表示
function showProcess(date) {
    let year = date.toEikyuFormat().yea;
    let season = date.toEikyuFormat().sea;
    document.querySelector('#monthheader').innerHTML = funNumber.toPhunCalcNum(year) + "年" + funNumber.toPhunCalcNum(season) + "気";
    let calendar = createProcess(year, season);
    document.querySelector('#calendar').innerHTML = calendar;
}
// カレンダー作成
function createProcess(year, sea) {
    let calendarArray = [];
    let calendarRow = [];
    let calendar = "<table>";
    for (let i = 1; i <= 5; i++) {
        calendarRow.push("<th class='" + "days" + i + "'>" + funNumber.toPhunCalcNum(i) + "</th>");
    }
    calendarArray.push(calendarRow);
    for (let i = 1; i <= 12; i++) {
        calendarRow = [];
        for (let j = 1; j <= 5; i++) {
            calendarRow.push(`<td>${i}</td>`);
        }
        calendarArray.push(calendarRow);
    }
    const rotatedCalendar = rotate(calendarArray);
    for (let row = 0; row < rotatedCalendar.length; row++) {
        calendar += "<tr>";
        for (let col = 0; col < rotatedCalendar[row].length; col++) {
            calendar += rotatedCalendar[row][col];
        }
        calendar += "</tr>";
    }
    calendar += "</table>";
    return calendar;
}
function rotate(array) {
    const ROW = array.length;
    const COL = array[0].length;
    const row = ROW - 1;
    const a = []; //new Array(COL);
    for (let c = 0; c < COL; c++) {
        a[c] = []; //new Array(ROW);
        for (let r = 0; r < ROW; r++) {
            a[c][r] = array[row - r][c];
        }
    }
    return a;
}
;
