import React, { useEffect, useState } from 'react';
import MailList from './MailList';
import { getMailList, getStatusList } from '../../api/mailApi';
import { useRecoilValue } from 'recoil';
import { StatusMessageAtom, StatusMessageIdAtom } from '../../recoil/user/userAtom';
import StatusList from './StatusList';

const MailBox = () => {
  const nowStatus = useRecoilValue(StatusMessageAtom)
  const nowStatusId = useRecoilValue(StatusMessageIdAtom)
  const [status, setStatus] = useState(nowStatus);
  const [statusList, setStatusList] = useState([]);
  const [mailList, setMailList] = useState([]);

  const [selectedStatusId, setSelectedStatusId] = useState(nowStatusId)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getStatusList()

      .then((res) => {
        setStatusList(res.statusList)
        return getMailList(selectedStatusId)
      })
      .then((res) => {
        setMailList(res.data.messageList);
      })
      .catch((err) => {
        console.log('status리스트 가져오기 실패ㄱ-', err)
      })
  }, [selectedStatusId])


  // 선택된 상메 바꿔주는 함수
  const handleStatusChange = ({ selectedStatus, selectedStatusId }) => {
    setStatus(selectedStatus);
    setSelectedStatusId(selectedStatusId)
  };

  return (
    <div className='px-5'>
      <div className="my-8 h-16">
        <button className="w-full h-full bg-stone-50 rounded-2xl justify-center items-center gap-2.5 inline-flex" onClick={openModal}>{status}</button>

        <StatusList isOpen={isModalOpen} onClose={closeModal} statusList={statusList} changeStatus={handleStatusChange} />
      </div>

      <div className='grid grid-cols-3 gap-5'>
        {mailList.map((mail, index) => (
          <MailList key={index} mail={mail} />
        ))}

      </div>
    </div>
  );
};

export default MailBox;