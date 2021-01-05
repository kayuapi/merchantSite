import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from './bannerStyle.module.css';
import { withTranslate } from 'react-admin';

const useStyles = theme => ({
  root: {
    width: '100%',
    }
})

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
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

class S3ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        uploadedPercentage: 0,
        uploadedImagePath: this.props.uploadedImagePath,
      }    
      this.onChange = this.onChange.bind(this);
      this.inputOpenRef = React.createRef();
    }
    componentDidMount() {
        this.mounted = true;
        if(this.state.uploadedImageUrl) {

        } else {

        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    onChange(e) {
        let that = this;
        // to ensure that pressing cancel after input dialog doesn't error out
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          const fileName = file.name;
  
          Storage.put(fileName, file, {
              level: 'protected',
              contentType: 'image/*',
              progressCallback(progress) {
                  let percent = Math.floor( progress.loaded * 100 / progress.total );
                  if (percent < 100) {
                      that.setState({ uploadedPercentage: percent })
                  }
              },
          })
          .then (result => {
              const uploadedImageUrl = encodeURI(this.state.uploadedImagePath+result['key']);
              this.setState({ 
                uploadedPercentage: 100, 
                uploadedImageUrl: uploadedImageUrl
              }, () => {
                setTimeout(() => {
                  this.setState({ 
                    uploadedPercentage: 0
                  })
                }, 500);
              });
              this.props.dispatch({
                type: 'imageLoaded', 
                payload: {
                  banner: uploadedImageUrl
                }
              });      
          });  
        }
    }
  
    render() {
      const { uploadedPercentage } = this.state;
      const { translate } = this.props;
      return (
        <>
          <div className={styles.container}>
            <img
              className={styles.image}
              src={this.props.banner ? this.props.banner : ''}
              height='150px'
              style={{objectFit: this.props.bannerDisplayType, background: 'gainsboro'}} 
              alt='' 
            />
            <div className={styles.middle} onClick={()=>{this.inputOpenRef.current.click()}}>
              <div className={styles.text}>
                {!this.props._banner && <span>{translate('pos.banner.addBanner')}</span>}
                {this.props._banner && <span>{translate('pos.banner.changeBanner')}</span>}
              </div>
            </div>
            <input ref={this.inputOpenRef} type="file" accept='image/*' onChange={(evt) => this.onChange(evt)} style={{display: 'none'}} />
          </div>
          { uploadedPercentage > 0 && <LinearProgressWithLabel value={uploadedPercentage} /> }
        </>
      )
    }
  }
export default withStyles(useStyles)(withTranslate(S3ImageUpload));