export function parseSearch (search = '') {
  let searchRegExp = /(\?q=offset=[0-9]{1,})/g
  let matchGroups = searchRegExp.exec(search)
  if (matchGroups) {
    const offset = matchGroups[0].slice(10)
    return +offset
  }
}
