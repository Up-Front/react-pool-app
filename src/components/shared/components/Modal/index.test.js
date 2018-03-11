import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import Modal from './';
import { ModalFooter } from './styles';

describe('Modal component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<Modal closeModal={jest.fn()} s />);
    expect(wrapper).toMatchSnapshot();
  });

  test('close button clicked', () => {
    const wrapper = mount(<Modal closeModal={jest.fn()} />);
    wrapper.instance().handleRemoveModal = jest.fn();
    wrapper.instance().forceUpdate();
    wrapper.find('button.removeButton').simulate('click');
    expect(wrapper.instance().handleRemoveModal).toHaveBeenCalledTimes(1);
  });

  test('that modal is opened / closed', () => {
    const wrapper = mount(<Modal closeModal={jest.fn()} />);
    expect(wrapper).toHaveStyleRule('display', 'none');

    wrapper.setProps({ open: 'open' });
    expect(wrapper).toHaveStyleRule('display', 'flex');
  });

  test('render footer in the ModalFooter', () => {
    const wrapper = mount(<Modal closeModal={jest.fn()} />);
    expect(wrapper.find('div.footer').children()).toHaveLength(0);

    wrapper.setProps({ footer: <div>test</div> });
    expect(wrapper.find(ModalFooter).children()).toHaveLength(1);
  });
});
