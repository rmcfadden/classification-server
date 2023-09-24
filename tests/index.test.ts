import {index} from "../scr/";


test('index', () => {
    const req = {  };
    const res = { text: '',
            send: function(input) { this.text = input } 
        };
    index(req);
});