import { FunNumber } from './funnumber.js';
function mod(a, b) {
    return a * b < 0 ? a % b + b : a % b;
}
export class EikyuDate {
    constructor(inputType, valueOrYear, month = 1, day = 1, hour = 0, period = 0, minute = 0, second = 0, milisecond = 0) {
        this.date = Date.now();
        if (inputType == "total") {
            this.date = valueOrYear;
        }
        else if (inputType == "split") {
            this.date = this.toMiliseconds(valueOrYear, month, day, hour, period, minute, second, milisecond);
            console.log("collect!");
        }
    }
    toMiliseconds(yea, mon = 1, day = 1, hou = 0, per = 0, min = 0, sec = 0, mil = 0) {
        const difYear = yea - 1240;
        const dayOfYear = (difYear) * 539 + Math.ceil((difYear / 40)) + Math.floor(((difYear + 40) / 400));
        const dayOfMonth = Math.floor((mon - 1) / 17) * 539 + (mod(mon - 1, 17)) * 32;
        const dayOfAll = dayOfYear + dayOfMonth + day - 1;
        const allMiliSecond = 134127166464000 + 166318064640000 + dayOfAll * 248832000 + hou * 20736000 + per * 1728000 + min * 144000 + sec * 1000 + mil; //-1000~1240 + すべて
        return allMiliSecond;
    }
    static toEikyu(earthDate) {
        const pivot = Date.UTC(2023, 0, 1);
        const difference = earthDate - pivot;
        const eikyuDif = difference / 0.34834346064814814;
        const eikyuNow = eikyuDif + 420114556414 + 166318064640000 + 134127166464000; //1240/1/1～基準点 + 0/1/1～1239/17/32 + -1000/1/1～-1/17/32
        return eikyuNow;
    }
    static toEarth(eikyuDate) {
        const pivot = Date.UTC(2023, 0, 1);
        const eikyuRaw = eikyuDate - 420114556414 - 166318064640000 - 134127166464000; //全部引く
        const earthDif = eikyuRaw * 0.34834346064814814;
        const earthNow = pivot + earthDif;
        return earthNow;
    }
    toEikyuFormat() {
        const eikyuNow = this.date;
        const funweeklist = ["天", "火", "気", "木", "水", "土"];
        const eikyuPointSec = eikyuNow / 1000 % 12 ** 2;
        const eikyuSec = Math.floor(eikyuNow / 1000 % 12 ** 2);
        const eikyuMin = Math.floor(eikyuNow / 1000 / 12 ** 2 % 12);
        const eikyuPer = Math.floor(eikyuNow / 1000 / 12 ** 2 / 12 % 12);
        const eikyuHou = Math.floor(eikyuNow / 1000 / 12 ** 2 / 12 / 12 % 12);
        const differenceDay = eikyuNow / 1000 / 12 ** 2 / 12 / 12 / 12;
        const eikyuFWeek = funweeklist[Math.floor(differenceDay - 1) % 6];
        const eikyuFWeekNum = Math.floor(differenceDay - 1) % 6;
        let dayForNum = eikyuNow / 1000 / 12 ** 2 / 12 / 12 / 12;
        let countYears = -1000;
        while (dayForNum >= 0) {
            const saveDay = dayForNum;
            dayForNum -= 539;
            if (countYears % 40 == 0) {
                dayForNum -= 1;
            }
            if (countYears % 400 == 0) {
                dayForNum -= 1;
            }
            if (dayForNum < 0) {
                dayForNum = saveDay;
                break;
            }
            countYears++;
        }
        const eikyuYea = countYears;
        const eikyuFunYea = eikyuYea + 843;
        const eikyuMon = Math.floor(dayForNum / 32) + 1;
        const eikyuDay = Math.floor(dayForNum % 32) + 1;
        const dateObj = {
            psec: eikyuPointSec,
            sec: eikyuSec,
            min: eikyuMin,
            per: eikyuPer,
            hou: eikyuHou,
            day: eikyuDay,
            mon: eikyuMon,
            fweek: eikyuFWeek,
            fweeknum: eikyuFWeekNum,
            yea: eikyuYea,
            fyea: eikyuFunYea
        };
        return dateObj;
    }
    getFormatted() {
        const obj = this.toEikyuFormat();
        return `${obj.yea}/${obj.mon}/${obj.day} ${obj.hou}:${obj.per}:${obj.min}:${obj.sec}`;
    }
    getFormattedHTML() {
        const obj = this.toEikyuFormat();
        return `${obj.yea}/${obj.mon}/${obj.day}<br>${obj.hou}:${obj.per}:${obj.min}:${obj.sec}`;
    }
    getFunFormatted() {
        const obj = this.toEikyuFormat();
        return `${obj.fyea}/${obj.mon}/${obj.day}(${obj.fweek}) ${obj.hou}:${obj.per}:${obj.min}:${obj.sec}`;
    }
    static now(now = Date.now()) {
        return new EikyuDate("total", EikyuDate.toEikyu(now));
    }
    timezone(hour) {
        return new EikyuDate("total", this.date + 20736000 * hour);
    }
    getFunScriptedBase12() {
        const funNumber = new FunNumber();
        const eikyuObj = this.toEikyuFormat();
        const obj = {
            sec: funNumber.toPhunCalcNum(eikyuObj.sec),
            min: funNumber.toPhunCalcNum(eikyuObj.min),
            per: funNumber.toPhunCalcNum(eikyuObj.per),
            hou: funNumber.toPhunCalcNum(eikyuObj.hou),
            day: funNumber.toPhunCalcNum(eikyuObj.day),
            mon: funNumber.toPhunCalcNum(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toPhunCalcNum(eikyuObj.fyea),
        };
        return `${obj.fyea}年${obj.mon}月${obj.day}日 ${obj.fweek}周 ${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`;
    }
    getFunScriptedHTMLBase12() {
        const funNumber = new FunNumber();
        const eikyuObj = this.toEikyuFormat();
        const obj = {
            sec: funNumber.toPhunCalcNum(eikyuObj.sec),
            min: funNumber.toPhunCalcNum(eikyuObj.min),
            per: funNumber.toPhunCalcNum(eikyuObj.per),
            hou: funNumber.toPhunCalcNum(eikyuObj.hou),
            day: funNumber.toPhunCalcNum(eikyuObj.day),
            mon: funNumber.toPhunCalcNum(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toPhunCalcNum(eikyuObj.fyea),
        };
        return `${obj.fyea}年${obj.mon}月${obj.day}日 ${obj.fweek}周<br>${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`;
    }
    getFunScripted() {
        const funNumber = new FunNumber();
        const eikyuObj = this.toEikyuFormat();
        const obj = {
            sec: funNumber.toPhunCalcNum(eikyuObj.sec),
            min: funNumber.toPhunCalcNum(eikyuObj.min),
            per: funNumber.toPhunCalcNum(eikyuObj.per),
            hou: funNumber.toPhunCalcNum(eikyuObj.hou),
            day: funNumber.toPhunCalcNum(eikyuObj.day),
            mon: funNumber.toPhunCalcNum(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toPhunCalcNum(eikyuObj.fyea),
        };
        return `${obj.fyea}年${obj.mon}月${obj.day}日 ${obj.fweek}周 ${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`;
    }
    getFunScriptedHTML() {
        const funNumber = new FunNumber();
        const eikyuObj = this.toEikyuFormat();
        const obj = {
            sec: funNumber.toPhunCalcNum(eikyuObj.sec),
            min: funNumber.toPhunCalcNum(eikyuObj.min),
            per: funNumber.toPhunCalcNum(eikyuObj.per),
            hou: funNumber.toPhunCalcNum(eikyuObj.hou),
            day: funNumber.toPhunCalcNum(eikyuObj.day),
            mon: funNumber.toPhunCalcNum(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toPhunCalcNum(eikyuObj.fyea),
        };
        return `${obj.fyea}年${obj.mon}月${obj.day}日${obj.fweek}周<br>${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`;
    }
}
