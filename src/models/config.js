import request from 'superagent';
import { message } from 'antd';




export default {

  namespace: 'config',

  state: {
    config: {}
  },

  effects: {
    *get(state, { put }){
      const data = yield request('/api/config').then(d => d.body);
      yield put({
        type: 'save',
        payload: {
          config: data
        }
      })
    },
    *addFolder({ payload: { folder }}, { put }){
      try{
        yield request.post('/api/folder').query({
          folder: folder
        });
      }catch(e){
        return message.error('操作失败');
      }

      message.success('操作成功');
      yield put({
        type: 'get'
      });
    },
    *updateContact(){

    },
    *publish(){

    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
