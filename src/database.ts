import omit from 'lodash'
export interface Reading {
  // TODO: change this to contain whatever information is needed
  timestamp: number;
  time: string;
  name: 'Voltage' | 'Current';
  value: number;
}

export const index: Set<number> = new Set()

// This is a fake database which stores data in-memory while the process is running
// Feel free to change the data structure to anything else you would like
export const database: Record<number, { 'Voltage': Reading | undefined , 'Current' : Reading | undefined}> = {};

/**
 * Store a reading in the database using the given key
 */
export const addReading = (key: number, reading: Reading): Reading => {
  index.add(key)
  if(!database[key]) {
    database[key] = {
      'Current' : undefined ,
      'Voltage' : undefined
    }
  }
  database[key][reading.name] = reading;
  return reading;
};

/**
 * Retrieve a reading from the database using the given key
 */
export const getReading = (key: number): Array<Reading | undefined> => {
  const arr = []
  database[key].Current && arr.push(database[key].Current) 
  database[key].Voltage && arr.push(database[key].Voltage)
  return arr ;
};

