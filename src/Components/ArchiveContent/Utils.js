export function toDataTable(dataJson) {

  let data = []
  dataJson.forEach(element => {
    let date, name, hash, sig, format, blockchain

    let splits = element.substring(9,element.length).split("__")
    let splits2 = splits[splits.length-1].split('.')
    
    //date = element.substring(0, 8)
    name = splits[1].substring(5, splits[1].length)
    hash = splits[2].substring(5, splits[1].length) + "..."
    splits[3] !== "sig-not" ? sig = "yes": sig = "no"
    splits[4] === "eth-yes" || splits2[0] === "iota-yes" ? blockchain = "yes": blockchain = "no"
    format = splits2[1]

    data.push([format, name, hash, sig, blockchain, element])
  });

  return data
}

let months = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
}
export function toDateMenu(date) {
  let data = []
  let year = {};
  
  date.forEach(element => {
    let splits = element.split('/');
    if (splits[0] !== year.id) {
        year = {id:splits[0], name:splits[0], children: [] }
        data.push(year)
    }
    
    let month = new Date(2020,months[splits[1]]).toLocaleString ('en', {month: 'long'})
    // let month = new Date(element).toLocaleString ('en', {month: 'long'})
    let key = {id: element, name: month}
    data.find(el => el.id === splits[0]).children.push(key)
  });

  return data
}