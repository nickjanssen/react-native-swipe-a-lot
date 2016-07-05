import test from 'ava'
import expect from 'expect'

import reducer from './reducer'
import deepFreeze from 'deep-freeze'

test('set active page', () => {
  const stateBefore = {}
  const stateAfter = {
    page: 2
  }

  deepFreeze(stateBefore)

  expect(
    reducer(stateBefore, {
      type: 'SET_ACTIVE_PAGE',
      page: 2
    })
  ).toEqual(stateAfter)
})

test('set view dims', () => {
  const stateBefore = {}
  const stateAfter = { width: 200, height: 300 }

  deepFreeze(stateBefore)

  expect(
    reducer(stateBefore, {
      type: 'SET_DIMS',
      width: 200,
      height: 300
    })
  ).toEqual(stateAfter)
})
