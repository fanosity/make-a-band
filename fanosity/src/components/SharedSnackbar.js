import React from 'react';
import { SharedSnackbarConsumer } from '../context/SharedSnackbar';
import AwardPopup from './AwardPopup';
import { SharedSnackbarConsumer } from '../context/SharedSnackbar';

const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, openSnackbar }) => (
      <AwardPopup
        message={openSnackbar}
      >
      testtttt
      </AwardPopup>
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;