const data = {};
const defaultName = Symbol.for('default');

export default class Databus {
    constructor(name) {
        if(typeof name === 'undefined') {
            if(data[defaultName]) {
                return data[defaultName]
            } else {
                data[defaultName] = this;
            }
        } else {
            name = name.toString();
            if(data[name]) {
                return data[name]
            } else {
                data[name] = this;
            }
        }
        
    }

    get(name) {
        return new Databus(name);
    }
}
