import { OPEN_MODAL, CLOSE_MODAL, UNMOUNTING_MODAL } from './actionTypes';

export function openModal(modalType, modalProps = {}) {
  return (dispatch, getState) => {
    if (getState().modals.some(x => x.modalType === modalType))
      return dispatch(closeModal());

    dispatch({
      type: OPEN_MODAL,
      modalType,
      modalProps
    });
  };
}

export function closeModal() {
  return dispatch => {
    dispatch({
      type: UNMOUNTING_MODAL
    });
    setTimeout(
      () =>
        dispatch({
          type: CLOSE_MODAL
        }),
      220
    );
  };
}

export function closeAllModals() {
  return (dispatch, getState) => {
    dispatch({
      type: UNMOUNTING_MODAL
    });
    setTimeout(() => {
      while (getState().modals.length > 0) {
        dispatch({
          type: CLOSE_MODAL
        });
      }
    }, 220);
  };
}
