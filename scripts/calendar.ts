import {EikyuDate} from './clockmain.js'
import {FunNumber} from './funnumber.js'
const funNumber = new FunNumber()
const week = ["天", "火", "気", "木", "水", "土"];
const today = EikyuDate.now().timezone(6).toEikyuFormat()
// 月末だとずれる可能性があるため、1日固定で取得
let showDate = new EikyuDate("split", today.yea, today.mon, 7);
console.log(showDate.toEikyuFormat())

showProcess(showDate);

const next = document.getElementById('next')
next!.onclick = prevMon

const prev = document.getElementById('prev')
prev!.onclick = nextMon

// 前の月表示
function prevMon(){
    const presentMonth = showDate.toEikyuFormat().mon
    const presentYear = showDate.toEikyuFormat().yea
    showDate = new EikyuDate("split", presentYear, presentMonth - 1, 1)
    console.log(showDate)
    showProcess(showDate);
}

// 次の月表示
function nextMon(){
    const presentMonth = showDate.toEikyuFormat().mon
    const presentYear = showDate.toEikyuFormat().yea
    showDate = new EikyuDate("split", presentYear, presentMonth + 1, 1)
    console.log(showDate)
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date: any) {
    let fyear = date.toEikyuFormat().fyea;
    let year = date.toEikyuFormat().yea;
    let month = date.toEikyuFormat().mon;
    document.querySelector('#monthheader')!.innerHTML = funNumber.toFunNumberbase12(fyear) + "年" + funNumber.toFunNumberbase12(month) + "月";

    let calendar = createProcess(year, month);
    document.querySelector('#calendar')!.innerHTML = calendar;
}

// カレンダー作成
function createProcess(year: number, month: number) {
    // 曜日
    let calendarArray = []
    let calendarRow = []
    let calendar = "<table>"
    for (let i = 0; i < week.length; i++) {
        calendarRow.push("<th class='" + "days" + i + "'>" + week[i] + "</th>")
    }
    calendarArray.push(calendarRow)

    let count = 0;
    let startDayOfWeek = new EikyuDate("split", year, month, 1).timezone(6).toEikyuFormat().fweeknum
    let endDate = new EikyuDate("split", year, month + 1, 0).timezone(6).toEikyuFormat().day
    let lastMonthEndDate = new EikyuDate("split", year, month, 0).timezone(6).toEikyuFormat().day
    let row = Math.ceil((startDayOfWeek + endDate) / week.length);

    // 1行ずつ設定
    for (let i = 0; i < row; i++) {
        let calendarRow = []
        // 1colum単位で設定
        for (let j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendarRow.push("<td class='disabled'>" + funNumber.toFunNumberbase12(lastMonthEndDate - startDayOfWeek + j + 1) + "</td>")
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendarRow.push("<td class='disabled'>" + funNumber.toFunNumberbase12(count - endDate) + "</td>")
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if(year == today.yea
                  && month == today.mon
                  && count == today.day){
                    calendarRow.push("<td class='today'>" + funNumber.toFunNumberbase12(count) + "</td>")
                } else {
                    const thisDays = new EikyuDate("split", year, month, count).toEikyuFormat().fweeknum
                    calendarRow.push("<td class='" + "days" + thisDays + "'>" + funNumber.toFunNumberbase12(count) + "</td>")
                }
            }
        }
        calendarArray.push(calendarRow)
    }

    const rotatedCalendar = rotate(calendarArray)

    for (let row = 0; row < rotatedCalendar.length; row++) {
        calendar += "<tr>"
        for (let col = 0; col < rotatedCalendar[row].length; col++) {
            calendar += rotatedCalendar[row][col]
        }
        calendar += "</tr>"
    }
    calendar += "</table>"
    return calendar;
}
function rotate(array: any[]) {
    const ROW = array.length;
    const COL = array[0].length;
    const row = ROW-1;
    const a: any[] = [];//new Array(COL);
    for (let c: number=0; c<COL; c++) {
      a[c] = [];//new Array(ROW);
      for (let r: number=0; r<ROW; r++) {
        a[c][r] = array[row-r][c];
      }
    }
    return a;
};