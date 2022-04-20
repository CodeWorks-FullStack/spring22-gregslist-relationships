import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BidSchema = new Schema(
  {
    rate: { type: Number, required: true, min: 1 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    carId: { type: Schema.Types.ObjectId, required: true, ref: 'Car' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
// NOTE this only allows one unique bid object per car and creatorId
BidSchema.index({ creatorId: 1, carId: 1 }, { unique: true })

BidSchema.virtual('bidder', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

BidSchema.virtual('car', {
  localField: 'carId',
  foreignField: '_id',
  ref: 'Car',
  justOne: true
})
