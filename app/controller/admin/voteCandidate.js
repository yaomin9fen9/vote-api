'use strict';

const BaseController = require('../base');

class VoteCandidateController extends BaseController {
    async create() {
        const { ctx } = this;
        const { voteId, candidateId } = ctx.request.body;

        const [vote, canCount, candidate] = await Promise.all([
            ctx.model.Vote.findOne({ id: voteId }),
            ctx.model.VoteCandidate.count({ where: { vote_id: voteId } }),
            ctx.model.Candidate.findOne({ id: candidateId })
        ]);

        if (!vote || !candidate) {
            this.notFind();
            return;
        }
        if (vote.status !== 0) {
            this.error(300, '投票进行中或已结束！')
            return;
        }
        if (canCount > 5) {
            this.error(300, '候选人数不能超过5个！')
            return;
        }

        await ctx.model.VoteCandidate.create({ vote_id: voteId, candidate_id: candidateId, count: 0 });

        this.success();
    }

    async destroy() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { voteId } = ctx.request.body;

        const [vote, canCount] = await Promise.all([
            ctx.model.Vote.findOne({ id: voteId }),
            ctx.model.VoteCandidate.count({ where: { vote_id: voteId } })
        ]);

        if (!vote) {
            this.notFind();
            return;
        }
        if (vote.status !== 0) {
            this.error(300, '投票进行中或已结束！')
            return;
        }
        if (canCount === 2) {
            this.error(300, '候选人数不能小于2个！')
            return;
        }

        await ctx.model.VoteCandidate.destroy({ id })

        this.success();
    }
}

module.exports = VoteCandidateController;
