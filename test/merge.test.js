const fs = require('fs');
const path = require('path');
const merge = require('../src/merge');


const file = (name) => path.resolve(__dirname, '../inputs/', name);

const accounts_instructions = fs.readFileSync(file('accounts_instructions.json'), { encoding: 'utf8' });
const accounts = fs.readFileSync(file('accounts.json'), { encoding: 'utf8' });
const accounts_duplicated = fs.readFileSync(file('accounts_duplicated.json'), { encoding: 'utf8' });

test('instuctions example input matches example output', ()=> {
  const merged = merge(JSON.parse(accounts_instructions));
  const expected = [
    {
      applications: ["x", "y"],
      emails: ["a", "b", "c", "d"],
      name: "Person 1"
    }
  ];
  expect(merged).toEqual(expected);
});

test('provided accounts input merged correctly', ()=> {
  const merged = merge(JSON.parse(accounts));
  const expected = [
    {
      applications: [1, 2, 3],
      emails: ["a@gmail.com", "b@gmail.com", "a@yahoo.com"],
      name: "A"
    },
    {
      applications: [1],
      emails: ["c@gmail.com", "d@gmail.com"],
      name: "C"
    }
  ];
  expect(merged).toEqual(expected);
});

test('provided accounts with duplicated values should produce same output as original accounts', ()=> {
  const merged = merge(JSON.parse(accounts_duplicated));
  const expected = [
    {
      applications: [1, 2, 3],
      emails: ["a@gmail.com", "b@gmail.com", "a@yahoo.com"],
      name: "A"
    },
    {
      applications: [1],
      emails: ["c@gmail.com", "d@gmail.com"],
      name: "C"
    }
  ];
  expect(merged).toEqual(expected);
});
