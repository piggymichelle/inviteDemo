import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Content from '../mainContent'
import Modal from '../Modal'
import { shallow } from 'enzyme';
import { wrap } from 'module';


describe('my app test cases', ()=>{
  //app test

  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div)
  });
  
  it('should render content component correctly', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Content).exists()).toEqual(true)
  });

  it('snapshot test',()=>{
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
  //modal test
  it('mainContent state should initial correct',()=>{
    const wrapper = shallow(<Content />)
    const state = {
        isOpenModal:false
      }
    expect(wrapper.state()).toEqual(state)
  })

  it('mainContent click function should be invoke correctly',()=>{
    const wrapper = shallow(<Content />)
    const spy = jest.spyOn(wrapper.instance(), 'openModal')
    wrapper.instance().forceUpdate()
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })

  it('mainContent click function should be invoke correctly',()=>{
    const wrapper = shallow(<Content />)
    const currState = wrapper.state().isOpenModal
    wrapper.find('button').simulate('click')
    expect(wrapper.state().isOpenModal).toEqual(!currState)
  })

  it('modal state should initial correct',()=>{
    const wrapper = shallow(<Modal />)
    const state = {
        fullName:'', 
        email: '', 
        confEmail: null, 
        isSending:false, 
        success:false, 
        invalid:false,
        data:''
      }
    expect(wrapper.state()).toEqual(state)
  })

  it('modal rendering correctly',()=>{
    const props = {show:true}
    const wrapper = shallow(<Modal {...props}/>)
      expect(wrapper.find('.backdrop').exists()).toEqual(true)
  })

  it('form rendering correctly',()=>{
    const props = {show:true}
    const wrapper = shallow(<Modal {...props}/>)
      expect(wrapper.find('form').exists()).toEqual(true)
  })

  it('submit function should be called',()=>{
    const props = {show:true}
    const wrapper = shallow(<Modal {...props}/>)
      const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
      wrapper.instance().forceUpdate()
      wrapper.find('button').simulate('click',{ preventDefault() {} })
      expect(spy).toHaveBeenCalled()
  })
})

