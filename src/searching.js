
export class Searching {
  
  constructor(rides, displayCb){
    this.timer = null;
    this.rides = rides;
    this.displayCb = displayCb;
    const self = this;
    this._input().addEventListener('input', e => self._searchChanged(e));
    this._input().focus();
  }

  _searchChanged(e){
    if(this.timer){
      clearTimeout(this.timer);
    }
    const self = this;
    this.timer = setTimeout(() => this._search(), 250);
  }

  _search(){
    this.timer = null;
    const text = this._value().toLowerCase();
    console.log('it changed for realz: ' + text);
    const matchedRides = this.rides.filter(ride => { 
      return JSON.stringify(ride).toLowerCase().includes(text);
    });
    console.log(`matched ${matchedRides.length}`)
    this.displayCb(matchedRides);
  }

  _input(){
    return document.querySelector('input#search');
  }

  _value(){
    return this._input().value.trim();
  }

}
