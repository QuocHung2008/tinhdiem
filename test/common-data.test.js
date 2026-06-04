import test from 'node:test';
import assert from 'node:assert/strict';
import { DOI_TUONG, KHU_VUC, SCHOOLS } from '../src/constants/common.js';

test('SCHOOLS co id va slug duy nhat cho cac calculator noi bo', () => {
  const ids = SCHOOLS.map((school) => school.id);
  assert.equal(new Set(ids).size, ids.length);

  const internalSchools = SCHOOLS.filter((school) => school.id !== 'uit');
  const slugs = internalSchools.map((school) => school.slug);
  assert.equal(new Set(slugs).size, slugs.length);

  assert.ok(slugs.includes('hcmus'));
  assert.ok(slugs.includes('hcmut'));
  assert.ok(slugs.includes('hcmussh'));
  assert.ok(slugs.includes('uel'));
  assert.ok(slugs.includes('iu'));
  assert.ok(slugs.includes('uhs'));
});

test('KHU_VUC va DOI_TUONG giu dung cac moc uu tien co ban', () => {
  assert.deepEqual(
    KHU_VUC.map((item) => item.id),
    ['KV3', 'KV2', 'KV2-NT', 'KV1']
  );
  assert.deepEqual(
    KHU_VUC.map((item) => item.points),
    [0, 0.25, 0.5, 0.75]
  );

  assert.deepEqual(
    DOI_TUONG.map((item) => item.id),
    ['NONE', 'UT2', 'UT1']
  );
  assert.deepEqual(
    DOI_TUONG.map((item) => item.points),
    [0, 1, 2]
  );
});
