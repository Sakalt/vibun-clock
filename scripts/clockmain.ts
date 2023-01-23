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
        console.log(dayOfYear)
        console.log(dayOfMonth)
        const allMiliSecond = dayOfAll * 200000000 + hou * 10000000 + per * 1000000 + min * 100000 + sec * 1000 + mil
        console.log(difYear)
        return allMiliSecond
    }
    static toEikyu(earthDate: number) {
        const pivot = Date.UTC(2023, 0, 1)
        const difference = earthDate - pivot
        const eikyuDif = difference / 0.433395
        const eikyuNow = eikyuDif + 337641824497
        return eikyuNow
    }
    toEikyuFormat() {
        const funweeklist = ["天","火","気","木","水","土"]
        const eikyuPointSec = this.date / 1000 % 100
        const eikyuSec = Math.floor(this.date / 1000 % 100)
        const eikyuMin = Math.floor(this.date / 1000 / 100 % 10)
        const eikyuPer = Math.floor(this.date / 1000 / 100 / 10 % 10)
        const eikyuHou = Math.floor(this.date / 1000 / 100 / 10 / 10 % 20)
        const differenceDay = this.date / 1000 / 100 / 10 / 10 / 20
        const eikyuFWeek = funweeklist[Math.floor(differenceDay) % 6]
        const eikyuFWeekNum = Math.floor(differenceDay) % 6
    
        let dayForNum = this.date / 1000 / 100 / 10 / 10 / 20
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
    static now() {
        return new EikyuDate("total", EikyuDate.toEikyu(Date.now()))
    }
    timezone(hour: number) {
        return new EikyuDate("total", this.date + 10000000 * hour)
    }
    getFunScripted() {
        const funNumber = new FunNumber()
        const eikyuObj = this.toEikyuFormat()
        const obj = {
            sec: funNumber.toFunNumber(eikyuObj.sec),
            min: funNumber.toFunNumber(eikyuObj.min),
            per: funNumber.toFunNumber(eikyuObj.per),
            hou: funNumber.toFunNumber(eikyuObj.hou),
            day: funNumber.toFunNumber(eikyuObj.day),
            mon: funNumber.toFunNumber(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toFunNumber(eikyuObj.fyea),
        }
        return `${obj.fyea}年${obj.mon}月${obj.day}日 ${obj.fweek}周 ${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`
    }
    getFunScriptedHTML() {
        const funNumber = new FunNumber()
        const eikyuObj = this.toEikyuFormat()
        const obj = {
            sec: funNumber.toFunNumber(eikyuObj.sec),
            min: funNumber.toFunNumber(eikyuObj.min),
            per: funNumber.toFunNumber(eikyuObj.per),
            hou: funNumber.toFunNumber(eikyuObj.hou),
            day: funNumber.toFunNumber(eikyuObj.day),
            mon: funNumber.toFunNumber(eikyuObj.mon),
            fweek: eikyuObj.fweek,
            fyea: funNumber.toFunNumber(eikyuObj.fyea),
        }
        return `${obj.fyea}年${obj.mon}月${obj.day}日${obj.fweek}周<br>${obj.hou}時${obj.per}刻${obj.min}分${obj.sec}秒`
    }
}