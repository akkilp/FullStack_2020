import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Title and author is being rendered', () => {
  const blog = {
    title: 'Mikko Kuustosen kattohuoneistot (ja kellarit)',
    author: 'Kari Kaurinen',
    url: 'www.kattohuoneisto.com',
    likes: 6
  }

  const component = render(
    <Blog blog={blog} />
  )

  const titleContainer = component.container.querySelector('h3')

  expect(titleContainer).toHaveTextContent(blog.title)
  expect(titleContainer).toHaveTextContent(blog.author)
})

test('Url and likes are being showed after click', () => {
  const blog = {
    title: 'Mikko Kuustosen kattohuoneistot (ja kellarit)',
    author: 'Kari Kaurinen',
    url: 'www.kattohuoneisto.com',
    likes: 6,
    user: { username: 'Markku' }
  }

  const component = render(
    <Blog blog={blog}  user={ { username: 'Markku' } } />
  )
  const titleContainer = component.container.querySelector('h3')
  const viewButton = titleContainer.querySelector('button')
  fireEvent.click(viewButton)

  const urlItem = component.container.querySelector('ul').querySelector('li:nth-child(1)')
  const likesItem = component.container.querySelector('ul').querySelector('li:nth-child(2)')
  expect(urlItem).toHaveTextContent(blog.url)
  expect(likesItem).toHaveTextContent(blog.likes)
})

test('Like button is being clicked 2 times', () => {
  const blog = {
    title: 'Mikko Kuustosen kattohuoneistot (ja kellarit)',
    author: 'Kari Kaurinen',
    url: 'www.kattohuoneisto.com',
    likes: 6,
    user: { username: 'Markku' }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog}  user={ { username: 'Markku' } } handleLike={mockHandler}  />
  )

  const titleContainer = component.container.querySelector('h3')
  const viewButton = titleContainer.querySelector('button')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
