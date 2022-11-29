import { v2 } from 'cloudinary';
import { Constants } from '../../../constants/constants';
export const CloudinaryProvider = {
  provide: Constants.CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY_CLOUD,
      api_secret: process.env.API_SECRET_CLOUD,
    });
  },
};
