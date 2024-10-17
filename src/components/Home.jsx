import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewFormModal from './ReviewFormModal';
import ReviewFormDrawer from './ReviewFormDrawer';

// Data
const fields = [
  {
    label: 'Enter Text',
    type: 'text',
    value: '',
    fieldName: 'textValue',
  },
  {
    label: 'Select Date',
    type: 'date',
    value: null,
    fieldName: 'dateValue',
  },
  {
    label: 'Enter Amount',
    type: 'text',
    value: '',
    fieldName: 'currencyValue',
  },
  {
    label: 'Additional Field',
    type: 'text',
    value: '',
    fieldName: 'additionalField',
  },
];

const notesHistory = [
  {
    date: 'Apr 27',
    avatar: 'path_to_avatar_1.png',
    user: 'CUser 1',
    task: 'Prepare questionnaire',
    time: '11:43 am',
  },
  {
    date: 'Apr 27',
    avatar: 'path_to_avatar_2.png',
    user: 'CUser 2',
    task: 'Heuristic evaluation',
    time: '11:43 am',
  },
  {
    date: 'Apr 27',
    avatar: 'path_to_avatar_3.png',
    user: 'CUser 3',
    task: 'Create Wireframes',
    time: '9:20 am',
  },
  {
    date: 'Apr 24',
    avatar: 'path_to_avatar_4.png',
    user: 'AUser 4',
    task: 'Design a database',
    time: '5:31 pm',
  },
  {
    date: 'Apr 24',
    avatar: 'path_to_avatar_5.png',
    user: 'AUser 4',
    task: 'Home page design',
    time: '12:03 pm',
  },
];
// Main ReviewForm Component
const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Control the drawer from App

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = () => {
    console.log('Form Submitted');
    handleCloseDrawer(); // Optionally close the drawer on submit
  };

  const handleReset = () => {
    console.log('Form Reset');
  };

  const handleCancel = () => {
    console.log('Form Canceled');
    handleCloseDrawer(); // Optionally close the drawer on cancel
  };

  const [modalOpen, setModalOpen] = useState(false); // Control the modal from App

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = () => {
    console.log('Form Submitted');
    handleCloseModal(); // Optionally close the modal on submit
  };

  const handleModalCancel = () => {
    console.log('Form Canceled');
    handleCloseModal(); // Optionally close the modal on cancel
  };

  return (
    <div>
      <button onClick={handleOpenDrawer}>Open Review Form Drawer</button>
      <ReviewFormDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        jsonFields={fields}
        notesHistory={notesHistory}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onCancel={handleCancel}
      />

      <button onClick={handleOpenModal}>Open Review Form Modal</button>

      <ReviewFormModal
        open={modalOpen}
        onClose={handleCloseModal}
        jsonFields={fields}
        notesHistory={notesHistory}
        onSubmit={handleModalSubmit}
        onReset={handleReset}
        onCancel={handleModalCancel}
      />

    </div>

  );
};

export default Home;
