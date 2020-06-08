import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Storage, Auth } from 'aws-amplify';
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
        Auth.currentUserInfo().then(userInfo => {
            const uriEncodedUserInfo = encodeURIComponent(userInfo.id);
            console.log('userInfo Id', userInfo.id);
            console.log('uri component', uriEncodedUserInfo);
            const uploadedImageUrl = `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/protected/${userInfo.id}/`;
            // this.setState({uploadedImageUrl: `https://amplify-chmboxordering-bucket191430-dev.s3-ap-southeast-1.amazonaws.com/protected/${userInfo.id}/`});
            this.setState({uploadedImageUrl: uploadedImageUrl});
        })
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
            // let imageUrl = Storage.get(result)
            const uploadedImageUrl = encodeURI(this.state.uploadedImageUrl+result['key']);
            this.props.writeValue(`menuPage.items[${this.props.index}].image`, uploadedImageUrl);
            this.setState({ uploadedPercentage: 100, uploadedImageUrl: uploadedImageUrl}, () => {
                setTimeout(() => {
                    this.setState({ uploaded: true, uploadedPercentage: 0})
                }, 500);
            });
            console.log('uploadedImageUrl', this.state.uploadedImageUrl);
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