import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Storage, Auth } from 'aws-amplify';
import Typography from '@material-ui/core/Typography';
import awsmobile from '../../aws-exports';
import { useFormContext } from 'react-hook-form';
import { updateMenuItemImage } from '../easyMenu/MenuItemsPanel/actions';

function LinearProgressWithLabel(props) {



    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
}
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

const S3ImageUpload = ({ menuItemId, index, dispatch }) => {
  const [localState, setLocalState] = useState({
    uploadedPercentage: 0,
    uploaded: false
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const { register, setValue } = useFormContext();
  // grab uploadedImageUrl on componentMount
  useEffect(() => {
    Auth.currentUserInfo().then(userInfo => {
      const uploadedImageUrl = `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/protected/${userInfo.id}/`;
      setUploadedImageUrl(state => uploadedImageUrl);
    });
  }, []);

  useEffect(() => {
    if (localState.uploadedPercentage === 100) {
      setTimeout(() => {
        setLocalState(state => ({
          uploaded: true,
          uploadedPercentage: 0
        }));
        dispatch(updateMenuItemImage(menuItemId, uploadedImageUrl));
      }, 500);
    }
  }, [dispatch, localState, menuItemId, uploadedImageUrl]);

  const onChange = (e, uploadedImageUrlOnChange) => {
    const file = e.target.files[0];
    const fileName = file.name;
    console.log('target', e.target);
    console.log('files', e.target.files);

    Storage.put(fileName, file, {
        level: 'protected',
        contentType: 'image/*',
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          let percent = Math.floor( progress.loaded * 100 / progress.total );
          console.log(`${progress.loaded}kb of ${progress.total}kb | ${percent}%`);
          if (percent < 100) {
            setLocalState(state => ({ 
              ...localState,
              uploadedPercentage: percent
            }));
          }
        },
    })
    .then (result => {
        // let imageUrl = Storage.get(result)
        const uploadedImageUrl = encodeURI(uploadedImageUrlOnChange+result['key']);
        setValue(`menuPage.items[${index}].image`, uploadedImageUrl, { shouldDirty: true });
        setUploadedImageUrl(state => uploadedImageUrl);
        setLocalState(state => ({ 
          ...localState,
          uploadedPercentage: 100
        }));
        console.log('uploadedImageUrl', uploadedImageUrl);
    })
    .catch(err => console.log(err));
  }

  return (
    <div style={{textAlign: 'center'}}>
      {!localState.uploaded && <input style={{height: '100px', width: '100%'}}
          type="file" accept='image/*'
          onChange={(evt) => onChange(evt, uploadedImageUrl)}
      />}
      {console.log('render url', uploadedImageUrl)}
      { localState.uploaded && <img height="100" width="100" style={{objectFit: 'contain'}} alt={uploadedImageUrl} src={uploadedImageUrl} />}
      { localState.uploadedPercentage > 0 && <LinearProgressWithLabel value={localState.uploadedPercentage} /> }
      <input ref={register} hidden name={`menuPage.items[${index}].image`} />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(
  null,
  mapDispatchToProps,
)
export default compose(withConnect)(S3ImageUpload);