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
import { makeSelectPrefixUploadedUrl } from '../easyMenu/MenuItemsPanel/selectors';
import { createStructuredSelector } from 'reselect';

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

const S3ImageUpload = ({ menuItemId, index, dispatch, prefixUploadedUrl, downloadedImage: image }) => {
  console.log('image', image);
  const [localState, setLocalState] = useState({
    uploadedPercentage: 0,
    uploaded: false
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState(prefixUploadedUrl);
  const { register, setValue } = useFormContext();
  // grab uploadedImageUrl on componentMount


  // useEffect(() => {
  //   if (localState.uploadedPercentage === 100) {
  //     setTimeout(() => {
  //       setLocalState(state => ({
  //         uploaded: true,
  //         uploadedPercentage: 0
  //       }));

  //     }, 500);
  //   }
  // }, [localState]);

  const onChange = (e, uploadedImageUrlOnChange) => {

    const file = e.target.files[0];
    const fileName = file.name;

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
        const uploadedImageUrl = encodeURI(uploadedImageUrlOnChange+result['key']);
        console.log('uploadedImageUrl', uploadedImageUrl);
        setValue(`menuPage.items[${index}].image`, uploadedImageUrl, { shouldDirty: true });
        setTimeout(() => {
          setLocalState(state => ({
            uploaded: true,
            uploadedPercentage: 0
          }));
        }, 500);
        dispatch(updateMenuItemImage(menuItemId, uploadedImageUrl));
        setUploadedImageUrl(state => uploadedImageUrl);
        setLocalState(state => ({ 
          ...localState,
          uploadedPercentage: 100
        }));
    })
    .catch(err => console.log(err));
  }

  return (
    <div style={{textAlign: 'center'}}>
      {!image && <input style={{height: '100px', width: '100%'}}
          type={!localState.uploaded ? "file" : "hidden"} accept='image/*'
          onChange={(evt) => onChange(evt, uploadedImageUrl)}
      />}
      {!image && localState.uploaded && <img height="100" width="80%" style={{objectFit: 'contain'}} alt={uploadedImageUrl} src={uploadedImageUrl} />}
      {!image && localState.uploadedPercentage > 0 && <LinearProgressWithLabel value={localState.uploadedPercentage} /> }
      {/* used to check dirtiness */}
      {<input ref={register} hidden name={`menuPage.items[${index}].image`} />}
      {image && <img height="100" width="80%" style={{objectFit: 'contain'}} alt={image} src={image} />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  prefixUploadedUrl: makeSelectPrefixUploadedUrl(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default compose(withConnect)(S3ImageUpload);