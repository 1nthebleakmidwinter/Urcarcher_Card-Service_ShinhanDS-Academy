import React from 'react';
import 'assets/Map.css'; 
import shopImgIcon from 'assets/icon-shopImg.png';

const Modal = ({  /* MyMapApp.jsx에 사용하는 모달 컴포넌트 */
  search,
  openMarkerId,
  setOpenMarkerId,
  isModalOpen,
  moveLatLng,
  pagination,
  currentPage,
  setCurrentPage,
  closeModal, // closeModal 함수도 props로 받아서 사용
}) => {
  if (!isModalOpen || !openMarkerId) return null;

  const selectedPlace = search.find((place) => place.id === openMarkerId);

  return (
    <div className="mymap-modal-overlay">
      <div className="mymap-modal-contents">
        <p><img src={shopImgIcon} alt="상점이미지" style={{width:'100px', height:'100px'}} /></p>
        <h2 style={{wordBreak:'keep-all', color:'#F77777'}}>{selectedPlace?.place_name}</h2>
        <p>{selectedPlace?.address_name}</p>
        <p className='call-phone-num'>
          <a href={`tel:${selectedPlace?.phone}`}>{selectedPlace?.phone}</a>
        </p>
        <a href={selectedPlace?.place_url} target="_blank" rel="noopener noreferrer"
          className='look-detail-btn'
        >
          자세히 보기
        </a>
        <button className='mymap-modal-x-btn' onClick={closeModal}>X</button>
        
        {/* 페이지네이션 */}
        {/* {pagination && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              다음
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Modal;