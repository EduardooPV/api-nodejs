import { IncomingMessage, ServerResponse } from 'http';
import { IUpdateUserRequestDTO } from 'modules/users/application/update-user/update-user-dto';
import { UpdateUserUseCase } from 'modules/users/application/update-user/update-user-use-case';
import { BodyParser } from 'core/http/utils/parse-body';
import { reply } from 'core/http/utils/reply';
import { UpdateUserViewModel } from 'modules/users/application/update-user/update-user-view-model';

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string },
    response: ServerResponse,
  ): Promise<void> {
    const rawBody = await BodyParser.parse(request);
    const id = request.userId;

    const body = rawBody as IUpdateUserRequestDTO;

    const user = await this.updateUserUseCase.execute({ id, ...body });
    const userHTTP = UpdateUserViewModel.toHTTP(user);

    reply(response).ok(userHTTP);
  }
}

export { UpdateUserController };
