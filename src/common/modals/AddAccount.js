import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Input, Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../components/Modal';
import { load } from '../reducers/loading/actions';
import features from '../reducers/loading/features';
import { login, loginElyBy, loginOAuth, loginLocal } from '../reducers/actions';
import { closeModal } from '../reducers/modals/actions';
import {
  ACCOUNT_MOJANG,
  ACCOUNT_ELYBY,
  ACCOUNT_MICROSOFT,
  ACCOUNT_LOCAL
} from '../utils/constants';

const AddAccount = ({ username }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(username || '');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(ACCOUNT_MOJANG);
  const [selectedSerivce, setSelectedService] = useState('Mojang Account');
  const [loginFailed, setLoginFailed] = useState();

  const addAccount = () => {
    dispatch(
      load(features.mcAuthentication, dispatch(login(email, password, false)))
    )
      .then(() => dispatch(closeModal()))
      .catch(error => {
        console.error(error);
        setLoginFailed(error);
      });
  };

  const addElyByAccount = () => {
    dispatch(
      load(
        features.mcAuthentication,
        dispatch(loginElyBy(email, password, false))
      )
    )
      .then(() => dispatch(closeModal()))
      .catch(error => {
        console.error(error);
        setLoginFailed(error);
      });
  };

  const addMicrosoftAccount = () => {
    dispatch(load(features.mcAuthentication, dispatch(loginOAuth(false))))
      .then(() => dispatch(closeModal()))
      .catch(error => {
        console.error(error);
        setLoginFailed(error);
      });
  };
  const addLocalAccount = () => {
    dispatch(
      load(features.mcAuthentication, dispatch(loginLocal(email, false)))
    )
      .then(() => dispatch(closeModal()))
      .catch(error => {
        console.error(error);
        setLoginFailed(error);
      });
  };

  const renderAddMojangAccount = () => (
    <Container>
      <FormContainer>
        <h1>Mojang Login</h1>
        {loginFailed && (
          <>
            <LoginFailMessage>{loginFailed?.message}</LoginFailMessage>
          </>
        )}
        <StyledInput
          disabled={!!username}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormContainer>
      <FormContainer>
        <StyledButton onClick={addAccount}>Add Account</StyledButton>
      </FormContainer>
    </Container>
  );

  const renderAddElyByAccount = () => (
    <Container>
      <FormContainer>
        <h1>Ely.By Login</h1>
        {loginFailed && (
          <>
            <LoginFailMessage>{loginFailed?.message}</LoginFailMessage>
          </>
        )}
        <StyledInput
          disabled={!!username}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormContainer>
      <FormContainer>
        <StyledButton onClick={addElyByAccount}>Add Account</StyledButton>
      </FormContainer>
    </Container>
  );

  const renderAddMicrosoftAccount = () => (
    <Container>
      <FormContainer>
        <h1
          css={`
            height: 80px;
          `}
        >
          Microsoft Login
        </h1>
        <FormContainer>
          <h2>External Login</h2>
          {loginFailed ? (
            <>
              <LoginFailMessage>{loginFailed?.message}</LoginFailMessage>
              <StyledButton
                css={`
                  margin-top: 12px;
                `}
                onClick={addMicrosoftAccount}
              >
                Retry
              </StyledButton>
            </>
          ) : (
            <FontAwesomeIcon spin size="3x" icon={faSpinner} />
          )}
        </FormContainer>
      </FormContainer>
    </Container>
  );

  const renderAddLocalAccount = () => (
    <Container>
      <FormContainer>
        <h1>Local Login</h1>
        {loginFailed && (
          <>
            <LoginFailMessage>{loginFailed?.message}</LoginFailMessage>
          </>
        )}
        <StyledInput
          disabled={!!username}
          placeholder="Username"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormContainer>
      <FormContainer>
        <StyledButton onClick={addLocalAccount}>Add Account</StyledButton>
      </FormContainer>
    </Container>
  );

  const menu = (
    <Menu
      mode="horizontal"
      selectedKeys={[accountType]}
      overflowedIndicator={null}
    >
      <StyledAccountMenuItem
        key={ACCOUNT_MOJANG}
        onClick={() => {
          setAccountType(ACCOUNT_MOJANG);
          setLoginFailed(null);
          setSelectedService('Mojang Login');
        }}
      >
        Mojang Login
      </StyledAccountMenuItem>
      <StyledAccountMenuItem
        key={ACCOUNT_ELYBY}
        onClick={() => {
          setAccountType(ACCOUNT_ELYBY);
          setLoginFailed(null);
          setSelectedService('Ely.By Login');
        }}
      >
        Ely.By Login
      </StyledAccountMenuItem>
      <StyledAccountMenuItem
        key={ACCOUNT_MICROSOFT}
        onClick={() => {
          setAccountType(ACCOUNT_MICROSOFT);
          addMicrosoftAccount();
          setLoginFailed(null);
          setSelectedService('Microsoft Login');
        }}
      >
        Microsoft Login
      </StyledAccountMenuItem>
      <StyledAccountMenuItem
        key={ACCOUNT_LOCAL}
        onClick={() => {
          setAccountType(ACCOUNT_LOCAL);
          setLoginFailed(null);
          setSelectedService('Offline Login');
        }}
      >
        Offline Login
      </StyledAccountMenuItem>
    </Menu>
  );
  return (
    <Modal
      css={`
        height: 450px;
        width: 420px;
      `}
      title=" "
    >
      <Dropdown
        overlay={menu}
        css={`
          width: 100%;
          height: 40px;
        `}
        trigger="click"
      >
        <Button>
          {selectedSerivce} <DownOutlined />
        </Button>
      </Dropdown>
      <Container>
        {accountType === ACCOUNT_MOJANG ? renderAddMojangAccount() : null}
        {accountType === ACCOUNT_ELYBY ? renderAddElyByAccount() : null}
        {accountType === ACCOUNT_MICROSOFT ? renderAddMicrosoftAccount() : null}
        {accountType === ACCOUNT_LOCAL ? renderAddLocalAccount() : null}
      </Container>
    </Modal>
  );
};

export default AddAccount;

const StyledButton = styled(Button)`
  width: 40%;
`;

const StyledInput = styled(Input)`
  margin-bottom: 20px;
`;

const LoginFailMessage = styled.div`
  color: ${props => props.theme.palette.colors.red};
`;

const StyledAccountMenuItem = styled(Menu.Item)`
  width: auto;
  height: auto;
  font-size: 18px;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: center;
`;
