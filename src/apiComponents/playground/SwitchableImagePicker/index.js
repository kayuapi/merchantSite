import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import Typography from '@material-ui/core/Typography';
import { makeSelectPrefixUploadedUrl } from '../../easyMenu/MenuItemsPanel/selectors';
import { createStructuredSelector } from 'reselect';
import { useMenuItemsWorkingArea  } from '../../easyMenu/Context/MenuItemsWorkingArea';
import styles from './switchableImagePickerStyle.module.css';

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

const S3ImageUpload = ({ menuItemId, prefixUploadedUrl, downloadedImage: image }) => {
  const [localState, setLocalState] = useState({
    uploadedPercentage: 0,
    uploaded: false
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState(prefixUploadedUrl);
  const { updateMenuItem } = useMenuItemsWorkingArea();
  const inputOpenRef = React.createRef();
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
          let percent = Math.floor( progress.loaded * 100 / progress.total );
          if (percent < 100) {
            setLocalState(state => ({ 
              ...localState,
              uploadedPercentage: percent
            }));
          }
        },
    })
    .then (result => {
        const uploadedImageUrl = encodeURI(uploadedImageUrlOnChange+'/'+result['key']);
        setTimeout(() => {
          setLocalState(state => ({
            uploaded: true,
            uploadedPercentage: 0
          }));
        }, 500);
        updateMenuItem(menuItemId, 'image', uploadedImageUrl);
        setUploadedImageUrl(state => uploadedImageUrl);
        setLocalState(state => ({ 
          ...localState,
          uploadedPercentage: 100
        }));
    })
    .catch(err => console.log(err));
  }

  return (
    // <div style={{textAlign: 'center', height: '100%', minHeight: '1px'}}>
    //   {!image && 
    //     <input 
    //       style={{height: '100px', width: '100%'}} 
    //       ref={inputOpenRef}
    //       type={!localState.uploaded ? "file" : "hidden"} 
    //       accept='image/*'
    //       onChange={(evt) => onChange(evt, uploadedImageUrl)}
    //   />}
    //   {!image && localState.uploaded && 
    //     <img 
    //       height="100%" 
    //       width="100%" 
    //       style={{objectFit: 'contain'}} 
    //       alt={uploadedImageUrl} 
    //       src={uploadedImageUrl} 
    //     />}
    //   {!image && localState.uploadedPercentage > 0 && 
    //     <LinearProgressWithLabel value={localState.uploadedPercentage} 
    //     /> }
    //   {/* used to check dirtiness */}
    //   {<input ref={register} hidden name={`menuPage.items[${index}].image`} />}
    //   {image && 
    //     <img 
    //       height="100%" 
    //       width="100%" 
    //       style={{objectFit: 'contain'}} 
    //       alt={image} 
    //       src={image} 
    //     />}
    // </div>
    <>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={image ? image : uploadedImageUrl || ''}
          height='100%'
          width="100%"
          style={{objectFit: 'contain', background: 'white'}} 
          alt='' 
        />
        <div className={styles.middle} onClick={()=>{inputOpenRef.current.click()}}>
          <div className={styles.text}>
            {!image && <span>Add image</span>}
            {image && <span>Change image</span>}
          </div>
        </div>
        <input ref={inputOpenRef} type="file" accept='image/*' onChange={(evt) => onChange(evt, prefixUploadedUrl)} style={{display: 'none'}} />
      </div>
      { localState.uploadedPercentage > 0 && <LinearProgressWithLabel value={localState.uploadedPercentage} /> }
    </>
  
  );
}

const mapStateToProps = createStructuredSelector({
  prefixUploadedUrl: makeSelectPrefixUploadedUrl(),
});

const withConnect = connect(
  mapStateToProps,
)
export default compose(withConnect)(S3ImageUpload);