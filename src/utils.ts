import { Reading, getReading, index } from "./database";
import dayjs from "dayjs";
export const isValidTimestamp = (timestamp: number) => {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp

    // Define minimum and maximum valid timestamps based on your requirements
    const minValidTimestamp = 0;
    const maxValidTimestamp = currentTimestamp;

    return (
        typeof timestamp === 'number' &&
        timestamp >= minValidTimestamp &&
        timestamp <= maxValidTimestamp
    );
};


export const getDataInRange = (start: number, end: number) => {
    
    end = dayjs(dayjs.unix(end)).add(1, 'day').unix() // to avoid problem if same day start end 
    const targetIndexes = Array.from(index).filter((v) => {
        return v >= start && v < end
    })
    console.log({ targetIndexes })
    const rawData: any[] = []
    targetIndexes.map((idx) => {
        rawData.push(...getReading(idx))
    })

    const data = rawData.map((v) => {
        const { time, value, name } = v as Reading

        return { time, value, name }
    })

    // power calculation 
    const currents: Record<string, { count: number; sum: number }> = {}
    const voltages: Record<string, { count: number; sum: number }> = {}

    rawData.map((v) => {
        const {  value,name, timestamp } = v as Reading
        const dateString = dayjs(dayjs.unix(timestamp).format('YYYY-MM-DD')).toISOString();
        if (name == 'Current') {
            currents[dateString] = {
                count: currents[dateString]?.count ? currents[dateString].count + 1 : 1,
                sum: currents[dateString]?.sum ? currents[dateString].sum + value : value
            }
        } else if (name == 'Voltage') {   
            voltages[dateString] = {
                count: voltages[dateString]?.count ? voltages[dateString].count + 1 : 1,
                sum: voltages[dateString]?.sum ? voltages[dateString].sum + value : value
            }
        }
    })

    const powerDates = Object.keys(currents)
    // console.log({ powerDates, currents, voltages })
    let power: Array< {
        value : number ;
        name : 'Power' ,
        time : string ;
    } > = []
    if (powerDates.length)
        power = powerDates.map((date) => {
            const avgCurrent = currents[date].sum / currents[date].count
            const avgVoltage = voltages[date].sum / voltages[date].count
            return {
                value: parseFloat((avgCurrent * avgVoltage ).toFixed(2)) ,
                name: 'Power',
                time : date
            }
        })

    return [...data, ...power]
}
