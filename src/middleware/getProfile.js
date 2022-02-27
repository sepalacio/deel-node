const { throwCustomError } = require('../utils/errorTools');
const middlewareErrors = require('./errors');

const ProfileNotFoundError = middlewareErrors('ProfileNotFound');
const DEFAULT_PROFILE_ID = 0;

const getProfileModel = (req) => req.app.get('models').Profile;

const findProfile = (id, ProfileModel) => (
  ProfileModel.findOne({ where: { id: id || DEFAULT_PROFILE_ID } })
);

const checkIfProfileExists = (result) => (
  !result ? throwCustomError(ProfileNotFoundError) : result
);

/**
  * @param {object} req
  * @param {object} req.profile_id
  */
const getProfile = async (req, res, next) => {
  try {
    const ProfileModel = getProfileModel(req);
    const result = await findProfile(req.get('profile_id'), ProfileModel);
    const profile = checkIfProfileExists(result);
    req.profile = profile;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
