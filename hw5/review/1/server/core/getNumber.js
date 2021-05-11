import fs from 'fs'
import {fileName, months} from '../server'

let number

const getNumber = (forceRestart = false, first ) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if (number === undefined || forceRestart) {
  	number = Math.floor(Math.random() * 100) % 100 + 1

  	// console.log(number)
  	let text = first ? 'start number='+ number + ' ' + [ Date().split(' ')[3], months[Date().split(' ')[1]], Date().split(' ')[2], Date().split(' ')[4].split(':')[0], Date().split(' ')[4].split(':')[1], Date().split(' ')[4].split(':')[2] ].join('-') + '\n' :
  		'restart number='+ number + ' ' + [ Date().split(' ')[3], months[Date().split(' ')[1]], Date().split(' ')[2], Date().split(' ')[4].split(':')[0], Date().split(' ')[4].split(':')[1], Date().split(' ')[4].split(':')[2] ].join('-') + '\n'
  	fs.appendFile(fileName, text, (err) => {
      if (err) console.log("Error")
    })

  }
  return number
}

export default getNumber
