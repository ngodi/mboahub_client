/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable  */
import React, { useState } from 'react';

import './MyProfile.scss';
import {
  FaUser,
  FaRegUser,
  FaBuilding,
  FaShieldAlt,
  FaKey,
} from 'react-icons/fa';
import {
  AiFillInstagram,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineLock,
  AiOutlineUnlock,
} from 'react-icons/ai';
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { useSingleImageUpload } from '../../../../hooks/images/useUploadImage';

import FormInput from '../../../forms/FormInput';

import TextAreaInput from '../../../forms/TextAreaInput';

function MyProfile() {
  const [password, setPassword] = useState({
    new_password: '',
    current_password: '',
    password_confirmation: '',
  });

  const hiddenFileInput = React.useRef(null);
  const hiddenCoverFileInput = React.useRef(null);

  // const {
  //   handlePasswordChange,
  //   socialsLoading,
  //   personalInfoLoading,
  //   passwordLoading,
  //   handleChange,
  //   handleSocialsUpdate,
  //   handlePersonalInfoUpdate,
  //   errors,
  //   loading,
  //   data,
  // } = useUserDetails();

  const {
    imageUrl,
    imageLoading,
    imageCoverUrl,
    imageCoverLoading,
    handleImageUpload,
    handleCoverImageUpload,
  } = useSingleImageUpload();

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleCoverClick = (event) => {
    hiddenCoverFileInput.current.click();
  };

  // if (imageUrl) {
  //   data.image_url = imageUrl;
  // }

  // if (imageCoverUrl) {
  //   data.image_cover_url = imageCoverUrl;
  // }

  const backgroundImage =
    'https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg';
  const avatar = '/photos/avatar.png';
  // if (loading) {
  //   return (
  //     <Oval
  //       height={80}
  //       width={80}
  //       color="#3270FC"
  //       wrapperStyle={{}}
  //       wrapperClass=""
  //       visible
  //       ariaLabel="oval-loading"
  //       secondaryColor="#F5F7FB"
  //       strokeWidth={2}
  //       strokeWidthSecondary={2}
  //     />
  //   );
  // }

  // const handlePassword = (e) => {
  //   e.preventDefault();
  //   const { current_password, new_password, password_confirmation } = password;
  //   handlePasswordChange(current_password, new_password, password_confirmation);
  //   setPassword({ new_password: '', current_password: '', password_confirmation: '' });
  // };

  return (
    <div className='my-profile'>
      <strong className='text-dark-blue mb-4'>EDIT PROFILE</strong>
      <hr />
      <div className='d-flex-between-start my-profile-container'>
        <div className='my-profile-left-container'>
          <div className='my-profile-left'>
            <strong className='d-flex align-items-center text-blue'>
              <FaUser size='15px' />
              &nbsp;&nbsp;
              <span className='text-gray text-small'>Change Avatar</span>
            </strong>
            <div
              className='avatar-container'
              style={{
                backgroundImage: `url(${imageCoverUrl || backgroundImage})`,
              }}
            >
              <div className='bg-light-dark' />
              <div className='agent-avatar'>
                <img
                  alt='user avatar'
                  src={`${imageUrl || avatar}`}
                  width='80px'
                  height='80px'
                />
                &nbsp;&nbsp;
                <span
                  role='button'
                  className='text-white text-small'
                  onClick={handleClick}
                >
                  {imageLoading ? 'uploading ...' : 'Upload New Photo'}
                </span>
                <input
                  type='file'
                  ref={hiddenFileInput}
                  onChange={handleImageUpload}
                />
              </div>
              <div className='agent-cover-image'>
                <span
                  role='button'
                  className='text-white text-small bg-blue rounded-top'
                  onClick={handleCoverClick}
                >
                  {imageCoverLoading ? 'uploading ...' : 'Change Cover'}
                </span>

                <input
                  type='file'
                  ref={hiddenCoverFileInput}
                  onChange={handleCoverImageUpload}
                />
              </div>
            </div>
          </div>
          <div className='personal-info'>
            <div className='perfornal-info-heading border-bottom'>
              <strong className='text-dark-blue text-small p-4'>
                Personal Info
              </strong>
            </div>
            <div className='perfornal-info-form px-4 pb-4'>
              <form>
                <FormInput
                  handleChange='#'
                  data=''
                  name='first_name'
                  type='text'
                  label='First Name'
                  icon={<FaRegUser size={15} />}
                />
                <FormInput
                  handleChange='#'
                  data=''
                  name=''
                  type='text'
                  label='Last Name'
                  icon={<FaRegUser size={15} />}
                />
                <FormInput
                  handleChange=''
                  data=''
                  disabled
                  name='email'
                  type='text'
                  label='Email Address'
                  icon={<AiOutlineMail size={15} />}
                />
                <FormInput
                  handleChange=''
                  data=''
                  name='street'
                  type='text'
                  label='Address'
                  icon={<AiOutlineMail size={15} />}
                />
                <FormInput
                  handleChange=''
                  data=''
                  name='City'
                  type='text'
                  label='City'
                  icon={<AiOutlineMail size={15} />}
                />
                <FormInput
                  handleChange=''
                  data=''
                  name='country'
                  type='text'
                  label='Country'
                  icon={<AiOutlineMail size={15} />}
                />
                <FormInput
                  handleChange=''
                  data=''
                  name='phone'
                  type='text'
                  label='Phone'
                  icon={<AiOutlinePhone size={15} />}
                />
                <FormInput
                  handleChange=''
                  data=''
                  name='agency'
                  type='text'
                  label='Agency'
                  icon={<FaBuilding size={15} />}
                />
                <TextAreaInput
                  name='about'
                  label='About Me'
                  data=''
                  handleChange=''
                />
                <button
                  type='submit'
                  className='text-white bg-primary py-2 px-4 mt-4 rounded'
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className='my-profile-right'>
          <div className='rounded mb-4'>
            <div className='personal-info'>
              <div className='persornal-info-heading border-bottom'>
                <strong className='text-gray text-small'>
                  <FaKey size={14} />
                  &nbsp;&nbsp; Change Password
                </strong>
              </div>
              <div className='perfornal-info-form px-4 pb-4'>
                <form>
                  <FormInput
                    handleChange={(e) =>
                      setPassword({
                        ...password,
                        current_password: e.target.value,
                      })
                    }
                    data={password.current_password}
                    name='current_password'
                    type='password'
                    label='Current Password'
                    icon={<AiOutlineUnlock size={15} />}
                  />
                  <FormInput
                    handleChange={(e) =>
                      setPassword({ ...password, new_password: e.target.value })
                    }
                    data={password.new_password}
                    name='new_password'
                    type='password'
                    label='New Password'
                    icon={<AiOutlineLock size={15} />}
                  />
                  <FormInput
                    handleChange={(e) =>
                      setPassword({
                        ...password,
                        password_confirmation: e.target.value,
                      })
                    }
                    data={password.password_confirmation}
                    name='password_confirmation'
                    type='password'
                    label='Confirm Password'
                    icon={<FaShieldAlt size={15} />}
                  />
                  <button
                    type='submit'
                    className='text-white bg-primary py-2 px-4 mt-3 rounded'
                  >
                    Save changes
                  </button>
                  {/* {errors && <p className="text-danger">{errors}</p>} */}
                </form>
              </div>
            </div>
          </div>
          <div className='rounded mt-4'>
            <div className='personal-info'>
              <div className='perfornal-info-heading border-bottom'>
                <strong className='text-dark-blue text-small'>
                  Your Socials
                </strong>
              </div>
              <div className='perfornal-info-form px-4 pb-4'>
                <form>
                  <FormInput
                    handleChange='#'
                    data=''
                    name='facebook_url'
                    type='text'
                    label='Facebook'
                    icon={<BsFacebook size={15} />}
                  />
                  <FormInput
                    handleChange='#'
                    data=''
                    name='twitter_url'
                    type='text'
                    label='Twitter'
                    icon={<BsTwitter size={15} />}
                  />
                  <FormInput
                    handleChange='#'
                    data=''
                    name='instagram_url'
                    type='text'
                    label='Instagram'
                    icon={<AiFillInstagram size={15} />}
                  />
                  <button
                    type='submit'
                    className='text-white bg-primary py-2 px-4 mt-3 rounded'
                  >
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
