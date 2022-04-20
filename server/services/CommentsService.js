import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async editComment(editedComment) {
    const original = await this.getCommentById(editedComment.id)
    original.body = editedComment.body || original.body
    await original.save()
    return original
  }

  async getCommentById(commentId) {
    const foundComment = await dbContext.Comments.findById(commentId)
    if (!foundComment) {
      throw new BadRequest('Unable to find that comment')
    }
    return foundComment
  }

  async deleteComment(commentId, userId) {
    // ALWAYS CHECK THAT THE PERSON LOGGED IN IS THE PERSON THAT CREATED THE THING YOU ARE TRYING TO DELETE
    const commentToDelete = await this.getCommentById(commentId)
    if (commentToDelete.creatorId.toString() !== userId) {
      throw new BadRequest('You are unauthorized to delete! Plz go')
    }
    await commentToDelete.remove()
    return commentToDelete
  }

  async getCommentsByCar(carId) {
    // NOTE this is checking every document in our comments collection, and finding each one where the carId value matches the one we send in from the carsController
    const comments = await dbContext.Comments.find({ carId: carId }).populate('creator', 'name picture')
    return comments
  }

  async createComment(newComment) {
    return await dbContext.Comments.create(newComment)
  }
}

export const commentsService = new CommentsService()
