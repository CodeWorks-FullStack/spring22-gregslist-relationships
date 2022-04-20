import { dbContext } from '../db/DbContext'

class BidsService {
  async getAccountBids(accountId) {
    const accountBids = await dbContext.Bids.find({ creatorId: accountId }).populate('car')
    return accountBids
  }

  async getBidsByCar(carId) {
    // NOTE findOne finds by a specific property - findById only finds by the _id
    const carBids = await dbContext.Bids.findOne({ carId: carId }).populate('bidder', 'name picture')
    return carBids
  }

  async createOrEditBid(newBid) {
    const foundBid = await dbContext.Bids.findOne({ carId: newBid.carId, creatorId: newBid.creatorId })
    if (foundBid) {
      foundBid.rate = newBid.rate || foundBid.rate
      await foundBid.save()
      return foundBid
    }
    const createdBid = await dbContext.Bids.create(newBid)
    return createdBid
  }
}

export const bidsService = new BidsService()
