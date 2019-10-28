'use strict';

const BaseController = require('./base');

class VoteController extends BaseController {
    async create() {
        const { ctx } = this;
        const { voteId, userVoteArray } = ctx.request.body;

        const user = ctx.state.user;
        if (user.is_active === 0) {
            this.error(300, '邮箱未激活！');
            return;
        }

        const [vote, record] = await Promise.all([
            ctx.model.Vote.findOne({
                include: {
                    model: ctx.model.VoteCandidate,
                    as: 'voteCandidates'
                },
                where: { id: voteId }
            }),
            ctx.model.UserVote.findOne({ user_id, vote_id: voteId })
        ]);

        let msg = checkVoteStatus(record, vote, userVoteArray);
        if (msg) {
            this.error(300, msg);
            return;
        }

        await updateVote(ctx, vote, user, userVoteArray);

        const voteResult = await ctx.service.vote.getVoteCandidateInfoByVoteId(voteId)

        this.success(voteResult)
    }
}

module.exports = VoteController;

function checkVoteStatus(record, vote, userVoteArray) {
    if (record) {
        return '已投过票！';
    }

    const validTicket = Math.ceil(vote.voteCandidates.length / 2);
    let userTicket = 0;
    for (let obj of userVoteArray) {
        userTicket += obj.count;
    }
    if (userTicket > validTicket) {
        return `投票数不能超过${validTicket}票！`;
    }

    return '';
}

async function updateVote(ctx, user, userVoteArray) {
    let userVoteData = [];

    let transaction;
    try {
        transaction = await ctx.model.transaction();

        for (let obj of userVoteArray) {
            if (obj.count > 0) {
                await ctx.model.VoteCandidate.increment('count', { by: obj.count, where: { vote_id: vote.id, candidate_id: obj.candidateId }, transaction });
                userVoteData.push({
                    user_id: user.id,
                    vote_id: vote.id,
                    candidate_id: obj.candidateId,
                    count: obj.count
                });
            }
        }

        await ctx.model.UserVote.bulkCreate(userVoteData, { transaction });

        await transaction.commit();
    } catch (e) {
        await transaction.rollback();
        ctx.throw(e)
    }
}
