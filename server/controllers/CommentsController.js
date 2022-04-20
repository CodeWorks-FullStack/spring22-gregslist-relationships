import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
      .put('/:id', this.editComment)
  }

  async editComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const editedComment = await commentsService.editComment(req.body)
      res.send(editedComment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const deletedComment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
      res.send(deletedComment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createdComment = await commentsService.createComment(req.body)
      res.send(createdComment)
    } catch (error) {
      next(error)
    }
  }
}
