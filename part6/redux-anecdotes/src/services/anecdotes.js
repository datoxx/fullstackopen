import axios from 'axios'

const baseUrl = 'http://localhost:3006/anecdotes'

const asObject = (anecdote) => {
    return {
      content: anecdote,
      votes: 0
    }
  }
 

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const createNew = async (content) => {
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

const voted = async (anecdote) => {
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const request = await axios.put(`${baseUrl}/${anecdote.id}`, newObject)
    return request.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, voted }