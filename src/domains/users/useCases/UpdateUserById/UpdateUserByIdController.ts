import { IncomingMessage, ServerResponse } from 'http';
import { parseBody } from '../../../../shared/utils/parseBody';
import { handleHttpError } from '../../../../shared/http/handleHttpError';
import { IUpdateUserByIdRequestDTO } from './UpdateUserByIdDTO';
import { UpdateUserByIdUseCase } from './UpdateUserByIdUseCase';

class UpdateUserByIdController {
  constructor(private updateUserByIdUseCase: UpdateUserByIdUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await parseBody(request);
    const id = request.params?.id;

    const body = rawBody as IUpdateUserByIdRequestDTO;

    try {
      await this.updateUserByIdUseCase.execute({ id }, body);

      response
        .writeHead(200, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ message: 'User updated successfully' }));
    } catch (error) {
      handleHttpError(error, response);
    }
  }
}

export { UpdateUserByIdController };
