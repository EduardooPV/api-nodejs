import { IncomingMessage, ServerResponse } from 'http';
import { IUpdateUserRequestDTO } from '../../../../application/useCases/users/updateUser/UpdateUserDTO';
import { UpdateUserUseCase } from '../../../../application/useCases/users/updateUser/UpdateUserUseCase';
import { parseBody } from '../../utils/parseBody';
import { reply } from '../../utils/reply';

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(
    request: IncomingMessage & { params?: { id: string } },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await parseBody(request);
    const id = request.params?.id;

    const body = rawBody as IUpdateUserRequestDTO;

    await this.updateUserUseCase.execute({ id }, body);

    reply(response).noContent();
  }
}

export { UpdateUserController };
