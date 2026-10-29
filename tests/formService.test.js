import { test } from 'node:test';
import assert from 'node:assert/strict';

const lead = { name: 'Test', phone: '9999999999' };
const setup = async (id) => {
  globalThis.document = { cookie: '' };
  globalThis.window = { location: { protocol: 'https:' } };
  return (await import(`../src/services/formService.js?test=${id}`)).submitFormData;
};

test('rapid submissions from any form send only one request per destination', async () => {
  const submit = await setup('concurrent');
  const calls = [];
  let release;
  globalThis.fetch = async (url) => {
    calls.push(url);
    if (calls.length === 1) await new Promise((resolve) => { release = resolve; });
    return { ok: true };
  };
  const first = submit(lead);
  assert.equal(await submit(lead), false);
  assert.equal(await submit({ ...lead, name: 'Another form' }), false);
  release();
  assert.equal(await first, true);
  assert.equal(await submit(lead), false);
  assert.equal(calls.length, 2);
});

test('existing successful visit blocks sending', async () => {
  const submit = await setup('cookie');
  document.cookie = 'subham_ashray_lead_submitted=true';
  globalThis.fetch = () => { throw new Error('Must not send'); };
  assert.equal(await submit(lead), false);
});

test('HTTP failure allows retry without repeating an accepted webhook', async () => {
  const submit = await setup('retry');
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(url);
    return { ok: calls.length !== 1 };
  };
  await assert.rejects(submit(lead));
  assert.equal(document.cookie, '');
  assert.equal(await submit(lead), true);
  assert.equal(calls.length, 3);
  assert.equal(calls.filter((url) => url.includes('pabbly')).length, 1);
});
