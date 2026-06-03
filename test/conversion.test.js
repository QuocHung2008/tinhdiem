import test from 'node:test';
import assert from 'node:assert/strict';
import { convertHcmutEnglish, convertIntlCert } from '../src/constants/hcmut.js';
import { convertCCQT } from '../src/constants/uel.js';
import { convertIuEnglishScore } from '../src/constants/iu.js';
import { roundUhs } from '../src/constants/uhs.js';

test('convertHcmutEnglish quy doi dung cac moc chinh', () => {
  assert.equal(convertHcmutEnglish('IELTS', 8.0), 10);
  assert.equal(convertHcmutEnglish('TOEFL', 94), 9);
  assert.equal(convertHcmutEnglish('TOEIC', 0, 905, 390), 10);
  assert.equal(convertHcmutEnglish('PTE', 40), 0);
});

test('convertIntlCert xu ly dung SAT va A-Level', () => {
  assert.equal(convertIntlCert('SAT', 1600), 100);
  assert.equal(convertIntlCert('SAT', 1200), 65);
  assert.equal(convertIntlCert('ALEVEL', 'A*'), 95);
  assert.equal(convertIntlCert('ACT', 24), 0);
});

test('convertCCQT cua UEL tra ve diem quy doi hop le', () => {
  assert.equal(convertCCQT('SAT', '1600'), 100);
  assert.equal(convertCCQT('SAT', '1199'), 0);
  assert.equal(convertCCQT('A_LEVEL', 'A'), 85);
});

test('convertIuEnglishScore xu ly dung cac loai chung chi', () => {
  assert.equal(convertIuEnglishScore('IELTS', '7.0'), 10);
  assert.equal(convertIuEnglishScore('TOEIC', '850', '310'), 10);
  assert.equal(convertIuEnglishScore('CAMBRIDGE', '150'), 0);
});

test('roundUhs lam tron mot chu so thap phan', () => {
  assert.equal(roundUhs(89.94), 89.9);
  assert.equal(roundUhs(89.95), 90);
});
