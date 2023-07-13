
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
    const today = new Date().toISOString().split('T')[0];

    const rides = this.rides.filter(ride => { 
      return includePast || (ride.date >= today);
    });
    const matchedRides = this._tokenFilter(rides);
    console.log(`matched ${matchedRides.length}`)
    this.displayCb(matchedRides);
  }

  _searchTokens(){
    const text = this._value().toLowerCase();
    const words = text.split(' ');
    const result = [];
    let token = '';
    words.forEach(word => {
      result.push(word);
    });
    return result;
  }

  _tokenFilter(rides){
    const tokens = this._searchTokens();
    console.log(`tokens: ${tokens}`)
    return rides.filter(ride => { 
      return tokens.every( token => { 
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
