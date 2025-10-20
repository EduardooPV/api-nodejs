import { IncomingMessage, ServerResponse } from 'http';
import { ReplyResponder } from 'core/http/utils/reply';
import { GetResumeByIdUseCase } from 'modules/shopping/application/get-resume-list-by-id/get-resume-list-by-id-use-case';

class GetResumeByIdController {
  constructor(private getResumeByIdUseCase: GetResumeByIdUseCase) {}

  async handle(
    request: IncomingMessage & { userId?: string; params?: { id?: string } },
    response: ServerResponse,
  ): Promise<void> {
    const userId = request.userId;
    const listId = request.params?.id;

    const result = await this.getResumeByIdUseCase.execute({
      userId,
      listId,
    });

    new ReplyResponder(response).ok(result);
  }
}

export { GetResumeByIdController };
