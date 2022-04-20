import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BidSchema } from '../models/Bid'
import { CarSchema } from '../models/Car.js'
import { CommentSchema } from '../models/Comment'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Comments = mongoose.model('Comment', CommentSchema)
  Bids = mongoose.model('Bid', BidSchema)
}

export const dbContext = new DbContext()
