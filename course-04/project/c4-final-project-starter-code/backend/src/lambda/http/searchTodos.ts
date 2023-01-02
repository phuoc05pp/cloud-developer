import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { searchTodo } from '../../helpers/todos'
import { getUserId } from '../utils';
import { SearchTodoRequest } from '../../requests/SearchTodoRequest'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const requestSearchNote: SearchTodoRequest = JSON.parse(event.body)
    const notes = await searchTodo(userId, requestSearchNote.keyword)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: notes
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)