export class EikyuDate {
    getFormatted() {
        const pivot = Date.UTC(2023,0,1)
        const difference = Date.now() - pivot
        const eikyuDif = difference / 0.433395
        const eikyuNow = eikyuDif + 337841824497
        const eikyuPointSec = eikyuNow / 1000 % 100
        const eikyuSec = Math.floor(eikyuNow / 1000 % 100)
        const eikyuMin = Math.floor(eikyuNow / 1000 / 100 % 10)
        const eikyuPer = Math.floor(eikyuNow / 1000 / 100 / 10 % 10)
        const eikyuHou = Math.floor(eikyuNow / 1000 / 100 / 10 / 10 % 20)
        const differenceDay = eikyuNow / 1000 / 100 / 10 / 10 / 20

        let dayForNum = eikyuNow / 1000 / 100 / 10 / 10 / 20
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
        const eikyuMon = Math.ceil(dayForNum / 32)
        const eikyuDay = Math.floor(dayForNum % 32)

        return `${eikyuYea}/${eikyuMon}/${eikyuDay} ${eikyuHou}:${eikyuPer}:${eikyuMin}:${eikyuSec}`
    }
}