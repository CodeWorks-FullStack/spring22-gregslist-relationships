import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

// What we will call this object once populated
CommentSchema.virtual('creator', {
  // check this local document's creatorId field
  localField: 'creatorId',
  // Check the Account document's id field
  foreignField: '_id',
  // Foreign document we are looking through
  ref: 'Account',
  justOne: true
})
