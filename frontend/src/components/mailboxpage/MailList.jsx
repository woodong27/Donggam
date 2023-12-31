import React, { useState } from 'react';
import MailItem from './MailItem';
import { postMailRead } from '../../api/mailApi';
import pinkMail from '../../assets/mail/1_pink.svg';
import orangeMail from '../../assets/mail/2_orange.svg';
import yellowMail from '../../assets/mail/3_yellow.svg';
import greenMail from '../../assets/mail/4_green.svg';
import skyblueMail from '../../assets/mail/5_skyblue.svg';
import mintMail from '../../assets/mail/6_mint.svg';
import violetMail from '../../assets/mail/7_violet.svg';
import blueMail from '../../assets/mail/8_blue.svg';
import beigeMail from '../../assets/mail/9_beige.svg';
import likedImg from '../../assets/like/liked.png';
import notReadImg from '../../assets/mail/notRead.png';

// mailList에서 mail을 하나씩 가져와서 사용
const MailList = ({mail, setUnreadMailCount, setLikeMailCount}) => {
  // const mailData = mail;
  const mailId = mail.messageId;

  const [isLiked, setIsLiked] = useState(mail.isLiked);
  const [isRead, setIsRead] = useState(mail.isRead);

  const mailIcons = [
    pinkMail, orangeMail, yellowMail, greenMail,
    skyblueMail, mintMail, violetMail, blueMail, beigeMail
  ];

  const randomIndex = Math.floor(Math.random() * mailIcons.length);
  const randomMailIcon = mailIcons[randomIndex];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsRead(true);
  };

  const handleMailClick = async () => {
    if (!isRead) {
      await postMailRead(mailId);
      setUnreadMailCount(currentCount => currentCount - 1);
    }
    openModal();
  };

  const updateLikedState = (newLikedState) => {
    setIsLiked(newLikedState);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='relative'>
        <img
          onClick={handleMailClick}
          src={isRead ? randomMailIcon : notReadImg}
          alt="Mail Icon"
          className='w-24 h-24'
        />
        {isLiked && (
          <img
            src={likedImg}
            alt="Liked Icon"
            className='absolute top-0 left-0'
            style={{ marginTop: '-10px' }}
          />
        )}
      </div>
      <MailItem isOpen={isModalOpen} onClose={closeModal} mail={mail} updateLikedState={updateLikedState} setLikeMailCount={setLikeMailCount} />
    </div>
  );
};

export default MailList;
