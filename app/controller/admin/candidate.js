'use strict';

const BaseController = require('../base');

class CandidateController extends BaseController {
    async index() {
        const { ctx, app } = this;
        let { pageIndex, pageSize, name } = ctx.request.query;
        pageIndex = Number(pageIndex);
        pageSize = Number(pageSize);

        const { like } = app.Sequelize.Op;
        let data = await ctx.model.Candidate.findAndCountAll({
            where: {
                name: {
                    [like]: `%${name}%`
                },
                status: 1
            },
            limit: pageSize,
            offset: (pageIndex - 1) * pageSize
        });

        this.success(data);
    }

    async create() {
        const { ctx } = this;
        const { name } = ctx.request.body;

        const candidate = await ctx.model.Candidate.create({ name });

        this.success({ candidate });
    }

    async edit() {
        const { ctx } = this;
        const id = ctx.params.id;

        const candidate = await ctx.model.Candidate.findOne({ id });
        if (!candidate) {
            this.notFind();
            return;
        }

        this.success(candidate);
    }

    async update() {
        const { ctx } = this;
        const id = ctx.params.id;
        const { name } = ctx.request.body;

        const candidate = await ctx.model.Candidate.findOne({ id });
        if (!candidate) {
            this.notFind();
            return;
        }
        candidate.name = name;
        await candidate.save();

        this.success(candidate);
    }

    async destroy() {
        const { ctx } = this;
        const id = ctx.params.id;

        await ctx.model.Candidate.update({ status: -1 }, { where: { id } });

        this.success();
    }
}

module.exports = CandidateController;
