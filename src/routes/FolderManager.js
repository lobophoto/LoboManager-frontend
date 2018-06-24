import React from 'react'
import { Upload, Modal, message, Button } from 'antd';
import { connect } from 'dva';
import request from 'superagent';

const confirm = Modal.confirm;

class FolderManager extends React.Component{
  constructor(p){
    super(p);
    const { folder } = this.props;
    const fileList = folder.map((img, index) => {
      return {
        uid: index,
        name: '图片' + index,
        status: 'done',
        url: '/api/public/' + img,
        thumbUrl: '/api/public/' + img,
      }
    });
    
    this.state = {
      folder: folder,
      fileList: fileList
    }
  }

  resSetFileList(){
    const { folder } = this.state;
    const fileList = folder.map((img, index) => {
      return {
        uid: index,
        name: '图片' + index,
        status: 'done',
        url: '/api/public/' + img,
        thumbUrl: '/api/public/' + img,
      }
    });
    this.setState({
      fileList: fileList
    });
  }

  render(){
    const {
      name
    } = this.props;

    return (
      <div>
        <h3>{ name }
          <a 
            style={{ color: 'red'}}
            onClick={() => {
              confirm({
                title: '确认删除?',
                content: '删除不可恢复',
                onOk: () => {
                  const { dispatch } = this.props;
                  return request.delete('/api/folder').query({
                    folder: name
                  }).then(() => {
                    dispatch({
                      type: 'config/get',
                    });
                    message.success('删除成功');
                  })
                }
              })
            }}
          > 
            删除 
          </a>
        </h3>
        <Button type="primary" onClick={() => {
          request.post("/api/image?folder="+name).send({
            images: JSON.stringify(this.state.folder)
          }).then(e => {
            message.success('更新成功');
            const { dispatch } = this.props;
            dispatch({
              type: 'config/get'
            });
          })
        }}>更新</Button>
        <br />
        <br />
        <Upload 
          fileList={this.state.fileList}
          listType="picture"
          action={"/api/image?folder="+name}
          data={{
            images: JSON.stringify(this.state.folder)
          }}
          onRemove={(image)=>{
            const { uid } = image;
            const img = this.state.folder[uid];
            this.state.folder = this.state.folder.filter((url) => {
              return url !== img;
            });
            this.resSetFileList();
          }}
          onChange={
            ({file, fileList}) => {
              if(file.status === 'done'){
                const { dispatch } = this.props;
                dispatch({
                  type: 'config/get'
                });
                return ;
              }

              this.setState({
                fileList
              });
            }
          }
        >
            <Button> + 上传 </Button>
        </Upload>
      </div>
    )
  }
}

export default connect(state => state)(FolderManager);