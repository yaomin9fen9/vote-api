'use strict';

const BaseController = require('../base');

class VoteController extends BaseController {
    async index() {
        const { ctx } = this;
        let { pageIndex, pageSize } = ctx.request.query;
        pageIndex = Number(pageIndex) || 1;
        pageSize = Number(pageSize) || 5;

        let data = await ctx.model.Vote.findAndCountAll({
            include: {
                model: ctx.model.VoteCandidate,
                as: 'voteCandidates',
                include: {
                    model: ctx.model.Candidate,
                    as: 'candidate',
                },
            },
            distinct: true,
            limit: pageSize,
            offset: (pageIndex - 1) * pageSize
        })

        this.success(data);
    }

    async create() {
        const { ctx, app } = this;
        const { candidateIds } = ctx.request.body;

        let cIds = ctx.helper.unique(ctx.helper.toIntArr(candidateIds));
        if (cIds.length !== candidateIds.length) {
            this.error(300, '重复候选人！');
            return;
        }

        if (cIds.length < 2 || cIds.length > 5) {
            this.error(300, '候选人个数不能少于两个多于五个！');
            return;
        }

        const { opIn } = app.Sequelize.Op;
        let candidates = await ctx.model.Candidate.findAll({
            where: {
                id: {
                    [opIn]: cIds
                }
            }
        });
        if (candidates.length !== cIds.length) {
            this.error(300, '候选人id错误');
            return;
        }

        let transaction;
        try {
            transaction = await ctx.model.transaction();
            const vote = await ctx.model.Vote.create({ status: 0, transaction });
            const vcArr = [];
            for (let cid of cIds) {
                vcArr.push({
                    vote_id: vote.id,
                    candidate_id: cid,
                    count: 0
                });
            }
            await ctx.model.VoteCandidate.bulkCreate(vcArr, { transaction })
            await transaction.commit();
        } catch (e) {
            await transaction.rollback();
            ctx.throw(e)
        }

        this.success();
    }

    async update() {
        const { ctx } = this;
        const id = ctx.params.id;
        let { status } = ctx.request.body;
        status = Number(status)

        const vote = await ctx.model.Vote.findOne({ id });
        if (!vote) {
            this.notFind();
        } else if (vote.status < status) {
            vote.status = status
            await vote.save();
            this.success();
        } else {
            this.error(300, '状态错误！')
        }
    }

    async destroy() {
        const { ctx } = this;
        const id = ctx.params.id;

        const vote = await ctx.model.Vote.findOne({ id });
        if (!vote) {
            this.notFind();
        } else if (vote.status !== 0) {
            await ctx.model.Vote.destroy({ where: { id } });
            this.success();
        } else {
            this.error(300, '只能删除未开始的投票！');
        }
    }
}

module.exports = VoteController;
