import assert from 'node:assert';
import test from 'node:test';
import createScheduler from './index.js';

test('createScheduler returns a scheduler object', () => {
  const scheduler = createScheduler();
  assert.strictEqual(typeof scheduler, 'object');
  assert.strictEqual(typeof scheduler.push, 'function');
});

test('createScheduler returns the same instance (singleton)', () => {
  const scheduler1 = createScheduler();
  const scheduler2 = createScheduler();
  assert.strictEqual(scheduler1, scheduler2);
});

test('callbacks are executed asynchronously', async () => {
  const scheduler = createScheduler();
  const { promise, resolve } = Promise.withResolvers();
  let callCount = 0;

  scheduler.push(() => {
    callCount++;
    resolve();
  });

  assert.strictEqual(callCount, 0);
  await promise;
  assert.strictEqual(callCount, 1);
});

test('multiple callbacks are executed in order', async () => {
  const scheduler = createScheduler();
  const { promise, resolve } = Promise.withResolvers();
  const results = [];

  scheduler.push(() => {
    results.push(1);
  });
  scheduler.push(() => {
    results.push(2);
  });
  scheduler.push(() => {
    results.push(3);
    resolve();
  });

  await promise;
  assert.deepStrictEqual(results, [1, 2, 3]);
});

test('idleDeadline object is passed to callback', async () => {
  const scheduler = createScheduler();
  const { promise, resolve } = Promise.withResolvers();
  let deadline = null;

  scheduler.push(idleDeadline => {
    deadline = idleDeadline;
    resolve();
  });

  await promise;
  assert.strictEqual(typeof deadline, 'object');
  assert.strictEqual(typeof deadline.timeRemaining, 'function');
});

test('idleDeadline.timeRemaining returns a number', async () => {
  const scheduler = createScheduler();
  const { promise, resolve } = Promise.withResolvers();
  let timeRemaining = null;

  scheduler.push(idleDeadline => {
    timeRemaining = idleDeadline.timeRemaining();
    resolve();
  });

  await promise;
  assert.strictEqual(typeof timeRemaining, 'number');
  assert.ok(timeRemaining >= 0);
});

test('scheduler processes multiple queued callbacks', async () => {
  const scheduler = createScheduler();
  const { promise, resolve } = Promise.withResolvers();
  const executions = [];

  for (let i = 0; i < 10; i++) {
    scheduler.push(() => {
      executions.push(i);
      if (i === 9) resolve();
    });
  }

  await promise;
  assert.strictEqual(executions.length, 10);
});
