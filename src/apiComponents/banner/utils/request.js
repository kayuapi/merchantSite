import { API, Auth } from 'aws-amplify';
import awsmobile from '../../../aws-exports';


export async function grabUploadingPath() {
  const userInfo = await Auth.currentUserInfo();
  const uploadedUrlPath = `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/protected/${userInfo.id}/`;
  return uploadedUrlPath;
}

export async function grabFromDb(item) {
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin/object';
  try {
    const myInit = {
      headers: {
        // 'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      response: false
    };

    const currentUserInfo = await Auth.currentUserInfo();
    const path = `${basePath}/${currentUserInfo.username}/${item}`;
    const retrievedItem = await API.get(apiName, path, myInit);
    return retrievedItem;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

export async function saveBannerToDb(banner, bannerDisplayType) {
  const apiName = 'amplifyChmboxOrderingApi';
  const path = '/uiplugin';
  const myInit = {
    headers: {
      'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
    },
    body: {
      SK: 'Banner',
      banner,
      bannerDisplayType
    },    
    response: false
  };  
  return await API.post(apiName, path,  myInit);
}
