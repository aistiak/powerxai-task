import express, { Express, NextFunction, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Reading, addReading, getReading , database } from './database';
import { getDataInRange, isValidTimestamp } from './utils';
import dayjs from 'dayjs';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));


app.get('/',async(req,res) => {

  return res.sendStatus(200)
})


app.post('/data', async (req, res) => {
  
  // transform and validate 
  let parsed = []
  try {
    const raw = String(req.body)
    const lines = raw.split("\n")
    parsed = lines.map((line: string) => {
      const arr = line.split(' ')
      const timestamp = parseInt(arr[0])
      const time = dayjs.unix(timestamp).toISOString()
      const name = arr[1] as ('Voltage' | 'Current')
      const value = parseFloat(arr[2])
      if (!isValidTimestamp(timestamp) || !name || !value) {
        throw 'data invalid'

      }
      return { timestamp, time, name, value }
    })
  } catch (error) {
    console.log(error)
    return res.json({ success: false });
  }

  // save to databse
  parsed.map((item: Reading) => {
    addReading(item.timestamp, item)
  })



  return res.json({ success: true });
});

app.get('/data', async (req, res) => {
 
  const { from, to }: any = req.query
  const start = dayjs(from).unix()
  const end = dayjs(to).unix()
  const data = getDataInRange(start,end)
  return res.json(data);
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
