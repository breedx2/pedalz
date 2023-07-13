
export class Searching {
  
  constructor(){
    this.timer = null;
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
    const text = this._value();
    console.log('it changed for realz: ' + text);  
  }

  _input(){
    return document.querySelector('input#search');
  }

  _value(){
    return this._input().value.trim();
  }

}
