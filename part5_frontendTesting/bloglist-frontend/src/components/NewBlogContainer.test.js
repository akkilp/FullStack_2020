import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogContainer from './NewBlogContainer'


test('Form sends proper information', () => {
  const mockHandler = jest.fn()

  const component = render(
    <NewBlogContainer handleNewPost={mockHandler}/>
  )
  component.debug()
  const Form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url= component.container.querySelector('#url')

  component.debug()

  fireEvent.change(title, {
    target: { value: 'Tämä on title' }
  })
  fireEvent.change(author, {
    target: { value: 'Tämä on author' }
  })
  fireEvent.change(url, {
    target: { value: 'Tämä on url' }
  })
  fireEvent.submit(Form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]['title']).toBe('Tämä on title')
  expect(mockHandler.mock.calls[0][0]['author']).toBe('Tämä on author')
  expect(mockHandler.mock.calls[0][0]['url']).toBe('Tämä on url')

})



