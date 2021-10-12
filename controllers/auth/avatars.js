const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User } = require('../../models');

const uploadDir = path.join(__dirname, '../../', 'public');

const avatars = async (req, res) => {
  const { path: tempStorage, originalname } = req.file;

  const { _id } = req.user;
  try {
    const [extention] = originalname.split('.').reverse();
    const newFileName = `user_${_id}_avatar.${extention}`;
    const originalImage = await Jimp.read(tempStorage);
    const resizedImage = await originalImage.cover(
      250,
      250,
      Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
    );
    await resizedImage.writeAsync(`${uploadDir}/avatars/${newFileName}`);

    const photo = path.join('/avatars', newFileName);
    console.log(photo);
    await User.findByIdAndUpdate(_id, { avatar: photo }, { new: true });
    res.status(201).json({
      avatarURL: photo,
    });
  } catch (error) {
    await fs.unlink(tempStorage);
    throw error;
  }
};

module.exports = avatars;
