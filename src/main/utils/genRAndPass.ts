/**
 * generates a random password of 10 characters incuding random occurances of '$, @, &, !, ?, >, ), ('
 * @returns string
 */
export const genPassV1 = (): string => {
  // TODO: return a flavor exluding certain symbols that may cause problems to certain sites
  // TODO: give the user the ability to adjust the pass generation inside the settings of the application
  let passStr = ''

  for (let i=0; i<2; i++) {
    const randomStr = Math.random().toString(36).slice(-10)
    passStr += randomStr
  }


  // get the length
  const passLength = passStr.length
  const passArr = passStr.split('')

  // preffered symbols
  const symbols = ['$', '@', '&', '!', '?', '>', ')', '(']

  // apply from 3 to  1/2 of the length of the pass
  const max = (passLength / 2) - 3
  const min = 3

  // get random value between min and max, this is the number of symbols that will be injected inside the password string in random places
  const randomNumberOfSymbols = Math.floor(Math.random() * (max - min + 1) + min)

  const finalSymbolPool: string[] = []
  for (let i=0; i < randomNumberOfSymbols; i++) {
    const randomIndexForSymbols = Math.floor(Math.random() * symbols.length)
    finalSymbolPool.push(symbols[randomIndexForSymbols])
  }

  // capitalize some random letters
  const numberOfindicesToBeReplacedWithCapital = Math.floor(Math.random() * (4 - 1 + 1) + 1)

  for (let i=0; i < numberOfindicesToBeReplacedWithCapital; i++) {
    const randIndex = Math.floor(Math.random() * passArr.length)
    passArr[randIndex] = passArr[randIndex].toUpperCase()
  }

  // replace elements in random position of the passaar with elementsd from the symbols pool
  const usedIndeces: number[] = []
  for (const i in finalSymbolPool) {
    let randomInsertIndex = Math.floor(Math.random() * symbols.length)
    while (usedIndeces.includes(randomInsertIndex)) {
      randomInsertIndex = Math.floor(Math.random() * symbols.length)
    }
    usedIndeces.push(randomInsertIndex)

    // replace random element of the passArray with a random symbol
    passArr[randomInsertIndex] = finalSymbolPool[i]
  }


  return passArr.join('')
}

