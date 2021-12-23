const count_substr = require('../helper functions/count_substr');

describe('Counting substrings helper function testing', () => {
    it('Should return 0 as there are no matches', ()=>{
        const result = count_substr('Lubię placki','grzyb');
        expect(result).toBe(0);
    });
    it('Should return 1 as there is one match', ()=>{
        const result = count_substr('Lubię placki','placki');
        expect(result).toBe(1);
    })
})