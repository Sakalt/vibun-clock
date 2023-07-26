import {FunNumber} from './funnumber.js'
function mod(a: number, b: number) {
    return a * b < 0 ? a % b + b : a % b;
}
export class EikyuDate {
    date: number = Date.now()
    constructor(inputType: string, valueOrYear: number, month: number = 1, day: number = 1, hour: number = 0, period: number = 0, minute: number = 0, second: number = 0, milisecond: number = 0) {
        if (inputType == "total") {
            this.date = valueOrYear
        } else if (inputType == "split") {
            this.date = this.toMiliseconds(valueOrYear, month, day, hour, period, minute, second, milisecond)
            console.log("collect!")
        }
    }

    toMiliseconds(yea: number, mon: number = 1, day: number = 1, hou: number = 0, per: number = 0, min: number = 0, sec: number = 0, mil: number = 0) {
        const difYear = yea - 1240
        const dayOfYear = (difYear) * 539 + Math.ceil((difYear / 40)) + Math.floor(((difYear + 40) / 400))
        const dayOfMonth = Math.floor((mon - 1) / 17) * 539 + (mod(mon - 1, 17)) * 32
        const dayOfAll = dayOfYear + dayOfMonth + day - 1
        const allMiliSecond = 166318064640000 + dayOfAll * 248832000 + hou * 20736000 + per * 1728000 + min * 144000 + sec * 1000 + mil //0~1240 + すべて
        return allMiliSecond
    }
    static toEikyu(earthDate: number) {
        const pivot = Date.UTC(2023, 0, 1)
        const difference = earthDate - pivot
        const eikyuDif = difference / 0.34834346064814814
        const eikyuNow = eikyuDif + 420114556414 + 166318064640000 //1240～基準点 + 0～1240
        return eikyuNow
    }
    toEikyuFormat_Old() {
        const funweeklist = ["天","火","気","木","水","土"]
        const eikyuPointSec = this.date / 1000 % 12**2
        const eikyuSec = Math.floor(this.date / 1000 % 12**2)
        const eikyuMin = Math.floor(this.date / 1000 / 12**2 % 12)
        const eikyuPer = Math.floor(this.date / 1000 / 12**2 / 12 % 12)
        const eikyuHou = Math.floor(this.date / 1000 / 12**2 / 12 / 12 % 12)
        const differenceDay = this.date / 1000 / 12**2 / 12 / 12 / 12
        const eikyuFWeek = funweeklist[Math.floor(differenceDay) % 6]
        const eikyuFWeekNum = Math.floor(differenceDay) % 6

        console.log(differenceDay)
    
        let dayForNum = this.date / 1000 / 12**2 / 12 / 12 / 12
        let countYears = 1240
    
        while (dayForNum >= 0) {
            const saveDay = dayForNum
            dayForNum -= 539
            if (countYears % 40 == 0) {
                dayForNum -= 1
            }
            if (countYears % 400 == 0) {
                dayForNum -= 1
            }
            if (dayForNum < 0) {
                dayForNum = saveDay
                break
            }
            countYears++
        }
        const eikyuYea = countYears
        const eikyuFunYea = eikyuYea + 843
        const eikyuMon = Math.floor(dayForNum / 32) + 1
        const eikyuDay = Math.floor(dayForNum % 32) + 1
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
        }
        return dateObj
    }
    toEikyuFormat() {
        const eikyuNow = this.date
    
        const funweeklist = ["天","火","気","木","水","土"]
        const eikyuPointSec = eikyuNow / 1000 % 12**2
        const eikyuSec = Math.floor(eikyuNow / 1000 % 12**2)
        const eikyuMin = Math.floor(eikyuNow / 1000 / 12**2 % 12)
        const eikyuPer = Math.floor(eikyuNow / 1000 / 12**2 / 12 % 12)
        const eikyuHou = Math.floor(eikyuNow / 1000 / 12**2 / 12 / 12 % 12)
        const differenceDay = eikyuNow / 1000 / 12**2 / 12 / 12 / 12
        const eikyuFWeek = funweeklist[Math.floor(differenceDay - 1) % 6]
        const eikyuFWeekNum = Math.floor(differenceDay - 1) % 6
    
        let dayForNum = eikyuNow / 1000 / 12**2 / 12 / 12 / 12
        let countYears = 0
    
        while (dayForNum >= 0) {
            const saveDay = dayForNum
            dayForNum -= 539
            if (countYears % 40 == 0) {
                dayForNum -= 1
            }
            if (countYears % 400 == 0) {
                dayForNum -= 1
            }
            if (dayForNum < 0) {
                dayForNum = saveDay
                break
            }
            countYears++
        }
        const eikyuYea = countYears
        const eikyuFunYea = eikyuYea + 843
        const eikyuMon = Math.floor(dayForNum / 32) + 1
        const eikyuDay = Math.floor(dayForNum % 32) + 1
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
        }
        return dateObj
    }
    getFormatted() {
        const obj = this.toEikyuFormat()
        return `${obj.yea}/${obj.mon}/${obj.day} ${obj.hou}:${obj.per}:${obj.min}:${obj.sec}`
    }
    getFormattedHTML() {
        const obj = this.toEikyuFormat()
        return `${obj.yea}/${obj.mon}/${obj.day}<br>${obj.hou}:${obj.per}:${obj.min}:${obj.sec}`
    }
    getFunFormatted() {
        const obj = this.toEikyuFormat()
        return `${obj.fyea}/${obj.mon}/${obj.day}(${obj.fweek}) ${obj.hou}:${obj.per}:${obj.min}:${obj.sec}`
    }
    static now(now: any = Date.now()) {
        return new EikyuDate("total", EikyuDate.toEikyu(now))
    }
    timezone(hour: number) {
        return new EikyuDate("total", this.date + 20736000 * hour)
    }
    getFunScriptedHTMLBase12() {
        const funNumber = new FunNumber()
        const eikyuObj = this.toEikyuFormat()
        const obj = {
            sec: funNumber.toFunNumberbase12(eikyuObj.sec),
            min: funNumber.toFunNumberbase12(eikyuObj.min),
            per: funNumber.toFunNumberbase12(eikyuObj.per),
            hou: funNumber.toFunNumberbase12(eikyuObj.hou),
            day: funNumber.toFunNumberbase12(eikyuObj.day),
            mon: funNumber.toFunNumberbase12(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toFunNumberbase12(eikyuObj.fyea),
        }
        return `${obj.fyea}年${obj.mon}月${obj.day}日 ${obj.fweek}周<br>${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`
    }
    getFunScripted() {
        const funNumber = new FunNumber()
        const eikyuObj = this.toEikyuFormat()
        const obj = {
            sec: funNumber.toFunNumberbase12(eikyuObj.sec),
            min: funNumber.toFunNumberbase12(eikyuObj.min),
            per: funNumber.toFunNumberbase12(eikyuObj.per),
            hou: funNumber.toFunNumberbase12(eikyuObj.hou),
            day: funNumber.toFunNumberbase12(eikyuObj.day),
            mon: funNumber.toFunNumberbase12(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toFunNumberbase12(eikyuObj.fyea),
        }
        return `${obj.fyea}年${obj.mon}月${obj.day}日 ${obj.fweek}周 ${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`
    }
    getFunScriptedHTML() {
        const funNumber = new FunNumber()
        const eikyuObj = this.toEikyuFormat()
        const obj = {
            sec: funNumber.toFunNumberbase12(eikyuObj.sec),
            min: funNumber.toFunNumberbase12(eikyuObj.min),
            per: funNumber.toFunNumberbase12(eikyuObj.per),
            hou: funNumber.toFunNumberbase12(eikyuObj.hou),
            day: funNumber.toFunNumberbase12(eikyuObj.day),
            mon: funNumber.toFunNumberbase12(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toFunNumberbase12(eikyuObj.fyea),
        }
        return `${obj.fyea}年${obj.mon}月${obj.day}日${obj.fweek}周<br>${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`
    }
}