import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import path from 'path';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal';
import { closeModal } from '../reducers/modals/actions';
import { instanceNameSuffix, duplicateInstance } from '../../app/desktop/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export default function DuplicateInstance({ instanceName }) {
  const dispatch = useDispatch();
  const [newInstanceName, setNewInstanceName] = useState(null);
  const instancesList = useSelector(state => state.instances.list);

  useEffect(() => {
    try {
      const newname = instanceNameSuffix(instanceName, instancesList);
      setNewInstanceName(newname);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Modal
      css={`
        height: 40%;
        width: 50%;
        max-width: 550px;
        max-height: 260px;
        overflow: hidden;
      `}
      title="Duplicate Instance"
    >
      <Container>
        <h3>Enter a new name or we will fill it for you :)</h3>
        <Input
          placeholder={instanceName}
          onChange={e => setNewInstanceName(e.target.value)}
          value={newInstanceName}
        />
        <Buttons>
          <Button
            onClick={() => {
              setTimeout(() => dispatch(closeModal()), 500);
            }}
          >
            Abort
          </Button>
          <Button
            onClick={() => {
              duplicateInstance(
                path.join(instancesList, instanceName),
                instancesList,
                newInstanceName || instanceName
              );
              setTimeout(() => dispatch(closeModal()), 500);
            }}
          >
            Confirm
          </Button>
        </Buttons>
      </Container>
    </Modal>
  );
}
