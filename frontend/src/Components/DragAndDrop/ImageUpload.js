import React from 'react';

import axios from 'axios';

class ImageUploadWithDrop extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      avatar: ''
    };
  }

  componentDidMount () {
    const { avatar } = this.props;
    this.setState({ avatar });
  }

  uploadFile ({ target: { files } }) {
    console.log(files[0]);
    const data = new FormData();
    data.append('file', files[0]);
    axios.post('http://localhost:4000/upload/image', data).then(res => {
      console.log(res);
      this.setState({ avatar: res.data.url });
    });
  }

  render () {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              <img
                className="avatar border-gray"
                src={this.state.avatar}
                alt="..."
              />
              <input type="file" className="form-control profile-pic-uploader" onChange={this.uploadFile} />

              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  };
};
export default ImageUploadWithDrop;
