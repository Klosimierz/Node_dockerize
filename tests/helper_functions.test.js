const count_substr = require('../helper functions/count_substr');
const pair_words = require('../helper functions/pair_words');

describe('Counting substrings helper function testing', () => {
    it('Should return 0 as there are no matches', ()=>{
        const result = count_substr('Lubię placki','grzyb');
        expect(result).toBe(0);
    });
    it('Should return 1 as there is one match', ()=>{
        const result = count_substr('Lubię placki','placki');
        expect(result).toBe(1);
    });
});

describe('Pairing words helper function testing', () => {
    it('Should return an object containing k/v pairs: "testword":3,"haha_got_you":1', ()=>{
        const result = pair_words(['testword','testword','testword','haha_got_you']);
        expect(result).toStrictEqual({
            "testword":3,
            "haha_got_you":1
        })
    });
    it('Should return an object containing k/v pairs: "niech":1,"stary":1,"kaktus":1,"przegnije":1,"na":1,"czubku":1', ()=>{
        const result = pair_words(['niech','stary','kaktus','przegnije','na','czubku']);
        expect(result).toStrictEqual({
            "niech":1,
            "stary":1,
            "kaktus":1,
            "przegnije":1,
            "na":1,
            "czubku":1
        })
    })
})