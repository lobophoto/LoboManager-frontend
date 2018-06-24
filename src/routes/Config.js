import React from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva'
import _ from 'lodash';
import { getUser } from '../utils/user';
import FolderManager from './FolderManager';
const Search = Input.Search;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


class Config extends React.Component{
  constructor(p){
    super(p);
    const user = getUser();
    this.state = {
      render: user ? true : false
    }
  }

  componentDidMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'config/get'
    });
  }

  render(){
    const config = _.get(this, 'props.config.config');

    if(!this.state.render){
      return <div>没有权限</div>
    }

    if(Object.keys(config).length === 0){
      return <p>"加载中"</p>;
    }

    const {
      getFieldDecorator,
    } = this.props.form;
    
    return (
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Form layout="horizontal">
          <h2>联系方式</h2>
          <FormItem label="电话" hasFeedback {...formItemLayout}>
            {
              getFieldDecorator(
                'phone', {
                  initialValue: _.get(config, 'contact.phone'),
                  rules: [
                    {
                      required: true,
                    }
                  ]
                }
              )(
                <Input />
              )
            }
          </FormItem>
          <FormItem label="邮箱" hasFeedback {...formItemLayout}>
            {
              getFieldDecorator(
                'email', {
                  initialValue: _.get(config, 'contact.email'),
                  rules: [
                    {
                      required: true,
                    }
                  ]
                }
              )(
                <Input />
              )
            }
          </FormItem>
          <FormItem label="微信公众号" hasFeedback {...formItemLayout}>
            {
              getFieldDecorator(
                'wechat', {
                  initialValue: _.get(config, 'contact.wechat'),
                  rules: [
                    {
                      required: true,
                    }
                  ]
                }
              )(
                <Input />
              )
            }
          </FormItem>
        </Form>

        <div>
          <h4>操作：</h4>
          <Search
            placeholder="input search text"
            onSearch={(value) => {
              const { dispatch } = this.props;
              dispatch({
                type: 'config/addFolder',
                payload: {
                  folder: value
                }
              })
            }}
            enterButton="新增相册"
          />
        </div>

        <div>
          {
            Object.keys(config.folders).map(key => {
              return <FolderManager name={key} folder={config.folders[key]} key={JSON.stringify(config.folders[key]) + key} />
            })
          }
        </div>
        <Button type="primary">
            更新
        </Button>
      </div>
    )
  }
}

export default connect(state => state)(Form.create()(Config));