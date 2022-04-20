import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bidsService } from '../services/BidsService'

export class BidsController extends BaseController {
  constructor() {
    super('api/bids')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBid)
      .put('/:id', this.editBid)
  }

  async createBid(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createdBid = await bidsService.createOrEditBid(req.body)
      // NOTE this gives back the WHOLE account object, which is bad. BUT this is how you could populate here
      // createdBid.bidder = req.userInfo
      res.send(createdBid)
    } catch (error) {
      next(error)
    }
  }

  async editBid(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const bid = await bidsService.createOrEditBid(req.body)
      res.send(bid)
    } catch (error) {
      next(error)
    }
  }
}
