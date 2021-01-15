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
import { useTranslate } from 'react-admin';
import { nanoid } from 'nanoid';
import imageCompression from 'browser-image-compression';

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

const S3ImageUpload = ({ menuItemId, prefixUploadedUrl, downloadedImage: image, openDescriptionPopUp }) => {
  const [localState, setLocalState] = useState({
    uploadedPercentage: 0,
    uploaded: false
  });
  const { updateMenuItem } = useMenuItemsWorkingArea();
  const inputOpenRef = React.createRef();
  const translate = useTranslate();
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
  const extractType = (fname) => {return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);}
  const onChange = async (e, uploadedImageUrlOnChange) => {
    const file = e.target.files[0];
    let fileName = nanoid(10);
    const fileExtension = extractType(file.name);
    if (fileExtension) {
      fileName = `${fileName}.${fileExtension}`;
    }

    const options = { 
      maxSizeMB: 10,          // (default: Number.POSITIVE_INFINITY)
      maxWidthOrHeight: 500,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
      // onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100) 
      useWebWorker: true,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
    
      // following options are for advanced users
      // maxIteration: number,       // optional, max number of iteration to compress the image (default: 10)
      // exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
      // fileType: string,           // optional, fileType override
      initialQuality: 0.9      // optional, initial quality value between 0 and 1 (default: 1)
    }

    try {
      const compressedFile = await imageCompression(file, options);
      Storage.put(fileName, compressedFile, {
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
      }).then (result => {
        const uploadedImageUrl = encodeURI(uploadedImageUrlOnChange+'/'+result['key']);
        setTimeout(() => {
          setLocalState(state => ({
            uploaded: true,
            uploadedPercentage: 0
          }));
        }, 500);
        updateMenuItem(menuItemId, 'image', uploadedImageUrl);
        setLocalState(state => ({ 
          ...localState,
          uploadedPercentage: 100
        }));
      }).catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
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
          src={image ? image : ''}
          height='100%'
          width="100%"
          style={{objectFit: 'contain', background: 'white'}} 
          alt='' 
        />
        <div className={styles.middle}>
            <div className={styles.text} onClick={()=>{inputOpenRef.current.value = ''; inputOpenRef.current.click();}}>
              {!image && <span>{translate(`pos.menu.addImage`)}</span>}
              {image && <span>{translate(`pos.menu.changeImage`)}</span>}
            </div>
            <div className={styles.text} onClick={()=>{openDescriptionPopUp();}}>
              {<span>{translate(`pos.menu.modifyDescriptionAndMore`)}</span>}
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