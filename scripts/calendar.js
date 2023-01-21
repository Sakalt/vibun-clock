import { EikyuDate } from './clockmain.js';
import { FunNumber } from './funnumber.js';
const funNumber = new FunNumber();
const week = ["天", "火", "気", "木", "水", "土"];
const today = EikyuDate.now().timezone(6).toEikyuFormat();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new EikyuDate("split", today.yea, today.mon, 7);
console.log(showDate.toEikyuFormat());
showProcess(showDate);
const next = document.getElementById('next');
next.onclick = nextMon;
const prev = document.getElementById('prev');
prev.onclick = prevMon;
// 前の月表示
function prevMon() {
    const presentMonth = showDate.toEikyuFormat().mon;
    const presentYear = showDate.toEikyuFormat().yea;
    showDate = new EikyuDate("split", presentYear, presentMonth - 1, 1);
    console.log(showDate);
    showProcess(showDate);
}
// 次の月表示
function nextMon() {
    const presentMonth = showDate.toEikyuFormat().mon;
    const presentYear = showDate.toEikyuFormat().yea;
    showDate = new EikyuDate("split", presentYear, presentMonth + 1, 1);
    console.log(showDate);
    showProcess(showDate);
}
// カレンダー表示
function showProcess(date) {
    var fyear = date.toEikyuFormat().fyea;
    var year = date.toEikyuFormat().yea;
    var month = date.toEikyuFormat().mon;
    document.querySelector('#monthheader').innerHTML = funNumber.toFunNumber(fyear) + "年" + funNumber.toFunNumber(month) + "月";
    var calendar = createProcess(year, month);
    document.querySelector('#calendar').innerHTML = calendar;
}
// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th class='" + "days" + i + "'>" + week[i] + "</th>";
    }
    calendar += "</tr>";
    var count = 0;
    var startDayOfWeek = new EikyuDate("split", year, month, 1).timezone(6).toEikyuFormat().fweeknum;
    var endDate = new EikyuDate("split", year, month + 1, 0).timezone(6).toEikyuFormat().day;
    var lastMonthEndDate = new EikyuDate("split", year, month, 0).timezone(6).toEikyuFormat().day;
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);
    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" + funNumber.toFunNumber(lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            }
            else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + funNumber.toFunNumber(count - endDate) + "</td>";
            }
            else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if (year == today.yea
                    && month == today.mon
                    && count == today.day) {
                    calendar += "<td class='today'>" + funNumber.toFunNumber(count) + "</td>";
                }
                else {
                    const thisDays = new EikyuDate("split", year, month, count).toEikyuFormat().fweeknum;
                    calendar += "<td class='" + "days" + thisDays + "'>" + funNumber.toFunNumber(count) + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}
