import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, message } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Login.less';
import { setUser } from '../utils/user';

// 引入logo
import LOGO from '../assets/logo.png';

const FormItem = Form.Item;

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors) => {
      if (errors) {
        return;
      }
      const value = getFieldsValue();
      let pathname = '/config';
      let role = 'admin';
      const ids = ['admin', 'user1', 'user2', 'user3'];
      if (value.username === 'admin') {
        if (value.password !== 'admin666') {
          return message.error('用户名或密码错误');
        }
      }else{
        return message.error('用户名或密码错误');
      }

      // ===============
      // 模拟用户登录步骤，用户系统上线后会去掉
      setUser({
        username: value.username,
        role,
        id: ids.indexOf(value.username),
      });
      // ===============

      window.localStorage.login = true;
      dispatch(routerRedux.push({
        pathname,
      }));
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={LOGO} />
        <span>简单管理系统</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '用户名不能为空',
              },
            ],
          })(<Input maxLength="20" onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码不能为空',
              },
            ],
          })(<Input maxLength="20" type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            登录
          </Button>
        </Row>
      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ loading }) => ({ loading }))(Form.create()(Login));
