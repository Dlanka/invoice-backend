class BaseService {
  createOrUpdate(model, filter = {}, data, userId) {
    const options = {
      new: true,
      upsert: true,
      runValidators: true,
      currentUser: userId,
    };

    return model.findOneAndUpdate(
      filter,
      {
        $set: data,
        $setOnInsert: { createdBy: userId },
      },
      options
    );
  }

  findAll(model, filter, page, limit) {
    let q = model.find(filter);

    if (page !== undefined && limit !== undefined) {
      q = q.skip((page - 1) * limit).limit(limit);
    }

    return q;
  }
}

module.exports = new BaseService();
