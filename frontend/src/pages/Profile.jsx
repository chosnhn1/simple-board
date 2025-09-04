import React, { useEffect, useState } from 'react';
import instance from '../utils/axiosConfig';
import { useParams } from 'react-router';

const AccountManagementMenu = () => {
  return (<div>
    <li>
      <ul>회원정보 수정</ul>
      <ul>비밀번호 변경</ul>
      <ul>회원 탈퇴</ul>
    </li>
  </div>)
}

function Profile() {
  const [user, setUser] = useState({});
  const [isAuthorized, setAuthorized] = useState(false);
  const userId = useParams.pk;
  
  const fetchUser = () => {
    instance.get(`accounts/${userId}/`, {

    })
    .then((res) => {
      setUser();

      // compare user:
      // if () {
      //   setAuthorized(true);
      // }
    })
    .catch((err) => {
      console.log(err);
    })
  
  };

  // get User from server when page loaded:
  useEffect(() => {
    fetchUser();
  }, [])


  return (
    <div>
      <div>회원정보</div>
      {isAuthorized && <AccountManagementMenu />}
    </div>
  );
}

export default Profile;