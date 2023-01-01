import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    let userId = getUserId(event)
    const { todoId, name, dueDate, createdAt, done } = await createTodo(userId, newTodo)
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: { todoId, name, dueDate, createdAt, done }
      })
    };
  }
)

handler.use(
  cors({
    credentials: true
  })
)
