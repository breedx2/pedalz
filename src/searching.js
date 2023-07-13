

function localNow() {
  const date = new Date();
  var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
  return newDate;   
}

export class Searching {
  
  constructor(rides, displayCb){
    this.timer = null;
    this.rides = rides;
    this.displayCb = displayCb;
    const self = this;
    this._input().addEventListener('input', e => self._searchChanged(e));
    this._input().focus();
    document.querySelector('input#past').addEventListener('change', e => self._pastChanged(e));
  }

  _searchChanged(e){
    if(this.timer){
      clearTimeout(this.timer);
    }
    const self = this;
    this.timer = setTimeout(() => this.search(), 250);
  }

  _pastChanged(e){
    console.log('tick');
    this.search();
  }

  search(){
    this.timer = null;
    const text = this._value().toLowerCase();
    console.log('doing a search: ' + text);
    const includePast = document.querySelector('input#past').checked;
    const today = localNow().toISOString().split('T')[0];
    const rides = this.rides.filter(ride => { 
      return includePast || (ride.date >= today);
    });
    const matchedRides = this._tokenFilter(rides);
    console.log(`matched ${matchedRides.length}`)
    this.displayCb(matchedRides);
  }

  // Naturally this grows enough to be its own stupid thing, factor out eventually
  _getSearchTokens(){
    const text = this._value().toLowerCase();
    const words = text.split(/\s+/);
    const result = [];
    let prefix = '';
    let token = '';
    function handleWord(word){
      console.log(`consider ${word}`)
      if(word.startsWith('"') && word.endsWith('"')){
        word = word.replace(/^"/, '').replace(/"$/, '')
        if(prefix){
          result.push({ [prefix]: word})
          prefix = '';
          return;
        }
        return result.push(word);
      }
      if(word.startsWith('"')){
        token = word.replace(/^"/, '')
        return;
      }
      if(word.endsWith('"')){
        if(token){
          word = word.replace(/"$/, '');
          if(prefix){
            result.push({[prefix]: `${token} ${word}`})
          }
          else {
            result.push(`${token} ${word}`);            
          }
          prefix = '';
          token = '';
          return;
        }
      }
      if(token){
        token = `${token} ${word}`;
        return;
      }
      if(word.match(/^\w+:/)){
        const index = word.indexOf(':');
        prefix = word.substring(0, index);
        console.log(`word still ${word}`);
        const rest = word.substring(index+1); 
        console.log(`pre ${prefix} rest ${rest}`);
        return handleWord(rest);
      }

      prefix = '';
      token = '';
      result.push(word);
    };
    words.forEach(handleWord);
    return result;
  }

  _tokenFilter(rides){
    const tokens = this._getSearchTokens();
    console.log(`tokens: ${JSON.stringify(tokens)}`)
    return rides.filter(ride => { 
      return tokens.every( token => { 
        // TODO: This sucks because it matches object keys, whatever, nobody cares.
        return JSON.stringify(ride).toLowerCase().includes(token);
      });
    });
  }

  _input(){
    return document.querySelector('input#search');
  }

  _value(){
    return this._input().value.trim();
  }

}
