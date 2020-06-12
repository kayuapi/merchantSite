import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Storage, Auth, API } from 'aws-amplify';
import Typography from '@material-ui/core/Typography';
import awsmobile from '../../aws-exports';

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


async function uploadImageMetaToDb(imagePath, imageDisplayType) {
    const apiName = 'amplifyChmboxOrderingApi';
    const basePath = '/uiplugin';
    try {
      const myInit = {
        headers: {
          'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
        },
        body: {
          SK: 'Banner',
          image: imagePath,
          imageDisplayType: imageDisplayType
        },
        response: false
      };
      const path = `${basePath}`;
      const pageSubmissionResponse = await API.post(apiName, path, myInit);
      console.log('pageSubmissionResponse', pageSubmissionResponse);
      return pageSubmissionResponse;
    }
    catch(err) {
      console.log('api response error', err.response);
    }
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
            uploadedImageUrl: '',
            uploaded: false,
            imageDisplayType: this.props.imageDisplayType
        }    
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.mounted = true;

        Auth.currentUserInfo().then(userInfo => {
            const uriEncodedUserInfo = encodeURIComponent(userInfo.id);
            console.log('userInfo Id', userInfo.id);
            console.log('uri component', uriEncodedUserInfo);
            const uploadedImageUrl = `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/protected/${userInfo.id}/`;
            // this.setState({uploadedImageUrl: `https://amplify-chmboxordering-bucket191430-dev.s3-ap-southeast-1.amazonaws.com/protected/${userInfo.id}/`});
            if (this.mounted) {
                this.setState({uploadedImageUrl: uploadedImageUrl});
            }
        })    
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    onChange(e) {
        let that = this;
        console.log('INSIDE STORAGEINPUT: PROPS', this.props);
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
                    that.setState({ uploadedPercentage: percent })
                }
            },
        })
        .then (result => {
            const uploadedImageUrl = encodeURI(this.state.uploadedImageUrl+result['key']);
            this.setState({ uploadedPercentage: 100, uploadedImageUrl: uploadedImageUrl}, () => {
                setTimeout(() => {
                    this.setState({ uploaded: true, uploadedPercentage: 0})
                }, 500);
            });
            return uploadImageMetaToDb(uploadedImageUrl, this.state.imageDisplayType);
        }).then(result => {

        })
        .catch(err => console.log(err));
    }
  
    render() {
        const { uploaded, uploadedPercentage } = this.state;
        return (
            <div style={{textAlign: 'center', color: 'blue', backgroundColor: '#90caf9', height: '150px'}}>
                {!uploaded && <input style={{height: '150px', width: '100%'}}
                    type="file" accept='image/*'
                    onChange={(evt) => this.onChange(evt)}
                />}
                { uploaded && <img height="150px" width="100%" style={{objectFit: this.props.imageDisplayType}} alt={this.state.uploadedImageUrl} src={this.state.uploadedImageUrl} />}
                { uploadedPercentage > 0 && <LinearProgressWithLabel value={this.state.uploadedPercentage} /> }
            </div>
        )
    }
  }
export default S3ImageUpload;