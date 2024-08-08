const userRepository = require("../repositories/userRepository");
const {
  checkPassword,
  createToken,
  encryptPassword,
} = require("../utils/authUtils");
const uploadUsers = require("../utils/uploadUsers");

module.exports = {
  // registrasi user
  async register(data) {
    try {
      const name = data.name;
      const phone_number = data.phone_number;
      const role = "client";
      const password = await encryptPassword(data.password);
      return await userRepository.create({
        name,
        phone_number,
        role,
        password,
      });
    } catch (error) {
      throw error;
    }
  },
  // login user
  async login(data) {
    try {
      const phone_number = data.phone_number;
      const password = data.password;
      const user = await userRepository.findByPhoneNumber(phone_number);
      if (!user) {
        throw {
          name: "wrongPhoneNumber",
          message: "Nomor telepon atau kata sandi salah",
        };
      }
      const isPasswordCorrect = await checkPassword(user.password, password);
      if (!isPasswordCorrect) {
        throw {
          name: "wrongPhoneNumber",
          message: "Nomor telepon atau kata sandi salah",
        };
      }
      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        token,
      };
    } catch (error) {
      throw error;
    }
  },
  // mencari data user berdasarkan id
  async findById(id) {
    return await userRepository.findById(id);
  },
  // mencari semua data user
  async findAll() {
    try {
      return await userRepository.findAll();
    } catch (error) {
      throw error;
    }
  },
  // mengubah data user
  async update(user, data, file) {
    try {
      const id = user.id;
      const picture = user.picture;
      const userData = await userRepository.findById(id);
      if (!userData) {
        throw {
          name: "userNotFound",
          message: "Pengguna tidak ditemukan",
        };
      }
      if (file === undefined) {
        await userRepository.update(id, data);
      } else {
        if (picture === null) {
          const photo = await uploadUsers.addPicture(file);
          await userRepository.update(id, data, photo);
        } else {
          const photo = await uploadUsers.updatePicture(file, user);
          await userRepository.update(id, data, photo);
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // menghapus data user
  async delete(id, user) {
    try {
      const userData = await userRepository.findById(id);
      if (!userData) {
        throw {
          name: "userNotFound",
          message: "Pengguna tidak ditemukan",
        };
      }
      if (user.role === "admin") {
        return (
          await uploadUsers.deletePicture(userData), userRepository.delete(id)
        );
      } else {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  // mengubah kata sandi user
  async changePassword(id, data) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw {
          name: "userNotFound",
          message: "Pengguna tidak ditemukan",
        };
      }
      if (data.old_password === data.new_password) {
        throw {
          name: "badRequest",
          message:
            "Kata sandi baru tidak boleh sama dengan kata sandi lama anda",
        };
      }
      if (data.new_password === data.confirm_password) {
        const passwordCompare = await checkPassword(
          user.password,
          data.old_password
        );
        if (!passwordCompare) {
          throw {
            name: "badRequest",
            message: "Kata sandi lama salah",
          };
        }
        const encryptedPassword = await encryptPassword(data.new_password);
        return userRepository.changePassword(id, encryptedPassword);
      } else {
        throw {
          name: "badRequest",
          message: "Kata sandi baru dan kata sandi konfirmasi tidak sama",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};
