/* eslint-disable no-undef */
import React from 'react'
import { create, act } from 'react-test-renderer'
import App from './App'
it('App renders without crashing', () => {
  let rendered
  act(() => {
    rendered = create(<App />)
  })
  expect(rendered.toJSON()).toBeTruthy()
})

it('App test against snapshot', () => {
  let tree
  act(() => {
    tree = create(<App />)
  })
  expect(tree.toJSON()).toMatchSnapshot()
})

