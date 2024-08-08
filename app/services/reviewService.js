const reviewRepository = require("../repositories/reviewRepository");
const uploadReview = require("../utils/uploadReview");

module.exports = {
  // membuat data ulasan
  async create(data, file) {
    try {
      const order_item_id = data.order_item_id;
      const rating = data.rating;
      const review = data.review;
      if (file == null || file == undefined) {
        return await reviewRepository.create({
          order_item_id,
          rating,
          review,
        });
      } else {
        const picture = await uploadReview.addPicture(file);
        return await reviewRepository.create({
          order_item_id,
          rating,
          review,
          picture,
        });
      }
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data ulasan
  async findAll() {
    return await reviewRepository.findAll();
  },
  // mencari data ulasan berdasarkan id
  async findById(id) {
    try {
      const reviewData = await reviewRepository.findById(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Ulasan tidak ditemukan",
        };
      } else {
        return reviewData;
      }
    } catch (error) {
      throw error;
    }
  },
  // mencari data ulasan berdasarkan user id
  async findByUser(user) {
    try {
      return await reviewRepository.findByUser(user);
    } catch (error) {
      throw error;
    }
  },
  // mengubah data ulasan
  async update(data, review, file) {
    try {
      const id = review.id;
      const picture = review.picture;
      const reviewData = await reviewRepository.findById(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Ulasan tidak ditemukan",
        };
      } else {
        if (file === null || file === undefined) {
          await reviewRepository.update(id, data);
        } else {
          if (picture === null) {
            const photo = await uploadReview.addPicture(file);
            await reviewRepository.update(id, data, photo);
          } else {
            const photo = await uploadReview.updatePicture(file, review);
            await reviewRepository.update(id, data, photo);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // menghapus data ulasan
  async delete(id) {
    try {
      const reviewData = await reviewRepository.findById(id);
      if (!reviewData) {
        throw {
          name: "reviewNotFound",
          message: "Ulasan tidak ditemukan",
        };
      } else {
        await uploadReview.deletePicture(reviewData);
        return reviewRepository.delete(id);
      }
    } catch (error) {
      throw error;
    }
  },
};
