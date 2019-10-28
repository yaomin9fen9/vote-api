const Service = require('egg').Service;

class VoteService extends Service {
    async getVoteCandidateInfoByVoteId(id) {
        const vote = await this.ctx.model.Vote.findOne({
            include: {
                model: this.ctx.model.VoteCandidate,
                as: 'voteCandidates',
                include: {
                    model: this.ctx.model.Candidate,
                    as: 'candidate'
                }
            },
            where: { id }
        })
        return vote
    }
}

module.exports = VoteService;
